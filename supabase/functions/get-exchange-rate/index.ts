// File: supabase/functions/get-exchange-rate/index.ts

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('EXCHANGERATE_API_KEY');
    if (!apiKey) {
      throw new Error('ExchangeRate-API key is not set in environment variables.');
    }

    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/EUR`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch exchange rate: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.result === 'error') {
      throw new Error(`ExchangeRate-API error: ${data['error-type']}`);
    }

    const rate = data.conversion_rates.VES;
    if (!rate) {
      throw new Error('VES rate not found in API response.');
    }

    return new Response(JSON.stringify({ rate }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Tye': 'application/json' },
      status: 500,
    });
  }
});
