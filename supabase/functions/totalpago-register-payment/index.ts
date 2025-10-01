// File: supabase/functions/totalpago-register-payment/index.ts

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const TOTALPAGO_API_URL = 'https://www.totalpago.net/WSPasarela/service.svc/WM_fcn_RegistrarPagoTransf';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const userId = Deno.env.get('TOTALPAGO_USER_ID');
    const token = Deno.env.get('TOTALPAGO_TOKEN');

    if (!userId || !token) {
      throw new Error('Missing Totalpago credentials');
    }

    const paymentDetails = await req.json();

    const response = await fetch(TOTALPAGO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idusr: userId,
        token: token,
        ...paymentDetails,
      }),
    });

    if (!response.ok) {
      throw new Error(`Totalpago API error: ${response.statusText}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
