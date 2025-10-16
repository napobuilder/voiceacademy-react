// File: supabase/functions/totalpago-register-payment/index.ts

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const TOTALPAGO_API_URL = 'https://www.totalpago.net/WsPasarela/service.svc/WM_fcn_RegistrarPagoTransf';

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

    // Extract payment details from the incoming request body
    const paymentDetails = await req.json();

    // Construct the payload for Totalpago API
    // All fields are expected to be strings
    const totalpagoPayload = {
      idusr: userId,
      token: token,
      idPago: paymentDetails.idPago, // Unique payment ID from our system
      mtPago: paymentDetails.mtPago, // Payment amount, comma as decimal separator
      descPago: paymentDetails.descPago, // Payment description
      nuReferenciaTransf: paymentDetails.nuReferenciaTransf, // Bank reference number
      idbancoTransf: paymentDetails.idbancoTransf, // Bank code
      fechaTransferencia: paymentDetails.fechaTransferencia, // DD/MM/YYYY
      nacCiTitularCuentaTransferencia: paymentDetails.nacCiTitularCuentaTransferencia, // V, E, or J
      numeroCiTitularCuentaTransferencia: paymentDetails.numeroCiTitularCuentaTransferencia,
      nmTitularCuentaTransferencia: paymentDetails.nmTitularCuentaTransferencia,
      telfTitularCuentaTransferencia: paymentDetails.telfTitularCuentaTransferencia,
      correoTitularCuentaTransferencia: paymentDetails.correoTitularCuentaTransferencia,
    };

    const response = await fetch(TOTALPAGO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(totalpagoPayload),
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