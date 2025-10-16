
// FILE: supabase/functions/cashea-confirm-order/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Base URL for Cashea's external API
const CASHEA_API_BASE_URL = 'https://external.cashea.app';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // 1. Extract the Cashea order ID (idNumber) from the request body
    const { idNumber } = await req.json();
    if (!idNumber) {
      throw new Error('Cashea order ID (idNumber) is required.');
    }

    // 2. Get the Private API Key from Supabase secrets
    // IMPORTANT: Ensure you have set 'CASHEA_PRIVATE_API_KEY' in your Supabase project secrets!
    const privateApiKey = Deno.env.get('CASHEA_PRIVATE_API_KEY');
    if (!privateApiKey) {
      throw new Error('CASHEA_PRIVATE_API_KEY is not set in environment variables.');
    }

    const authHeaders = {
      'Authorization': `ApiKey ${privateApiKey}`,
      'Content-Type': 'application/json',
    };

    // 3. Get order details from Cashea to find the down payment amount
    const getOrderUrl = `${CASHEA_API_BASE_URL}/orders/${idNumber}`;
    const getOrderResponse = await fetch(getOrderUrl, { headers: authHeaders });

    if (!getOrderResponse.ok) {
      const errorBody = await getOrderResponse.json();
      throw new Error(`Failed to get order details from Cashea: ${JSON.stringify(errorBody)}`);
    }

    const orderDetails = await getOrderResponse.json();
    const downPayment = orderDetails?.orderDetails?.downPayment;

    if (!downPayment) {
      throw new Error('Could not determine down payment amount from Cashea order details.');
    }

    // 4. Confirm the down payment with Cashea
    const confirmPaymentUrl = `${CASHEA_API_BASE_URL}/orders/${idNumber}/down-payment`;
    const confirmResponse = await fetch(confirmPaymentUrl, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ amount: parseFloat(downPayment) }),
    });

    if (!confirmResponse.ok) {
      // If confirmation fails, try to cancel the order to be safe
      await fetch(`${CASHEA_API_BASE_URL}/orders/${idNumber}`, { method: 'DELETE', headers: authHeaders });
      const errorBody = await confirmResponse.json();
      throw new Error(`Failed to confirm down payment with Cashea: ${JSON.stringify(errorBody)}`);
    }

    const confirmationData = await confirmResponse.json();

    // 5. Return a success response to our frontend
    return new Response(JSON.stringify({ success: true, confirmation: confirmationData }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('Error in cashea-confirm-order function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
