// FILE: supabase/functions/cashea-create-order/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1. Extract data from the incoming request from our frontend
    const { totalAmountEUR, description, reference } = await req.json();
    if (!totalAmountEUR || !description || !reference) {
      throw new Error('Missing required fields: totalAmountEUR, description, or reference.');
    }

    // 2. Get necessary secrets from Supabase environment variables
    const casheaApiKey = Deno.env.get('CASHEA_API_KEY');
    if (!casheaApiKey) {
      throw new Error('CASHEA_API_KEY is not set in environment variables.');
    }
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase environment variables are not set.');
    }

    // 3. Invoke the get-exchange-rate function to get the latest EUR to VES rate
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    const { data: rateData, error: rateError } = await supabaseClient.functions.invoke('get-exchange-rate');
    if (rateError) throw rateError;
    const exchangeRate = rateData.rate;
    if (!exchangeRate) {
      throw new Error('Could not retrieve EUR to VES exchange rate.');
    }

    // 4. Calculate the final amount in VES (Venezuelan Bolívar)
    const totalAmountVES = (totalAmountEUR * exchangeRate).toFixed(2);

    // 5. Construct the payload for the Cashea API
    const siteUrl = Deno.env.get('SITE_URL') || 'http://localhost:5173'; // Fallback for local dev
    const casheaPayload = {
      amount: totalAmountVES,
      currency: 'VES',
      reference: reference,
      description: description,
      return_url: `${siteUrl}/payment/success?ref=${reference}`,
      cancel_url: `${siteUrl}/payment/cancelled`,
      metadata: {},
    };

    // 6. Make the secure, server-to-server call to Cashea's API
    const casheaResponse = await fetch('https://api.cashea.app/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${casheaApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(casheaPayload),
    });

    if (!casheaResponse.ok) {
      const errorBody = await casheaResponse.json();
      throw new Error(`Cashea API error: ${casheaResponse.statusText} - ${JSON.stringify(errorBody)}`);
    }

    const casheaData = await casheaResponse.json();
    
    // 7. Return the redirect_url to the frontend
    return new Response(JSON.stringify({ redirect_url: casheaData.redirect_url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    // Generic error handler
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
