// FILE: src/pages/PaymentSuccessPage.tsx
import { FC, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PrimaryButton } from '@/components/Button';
import { supabase } from '@/lib/supabaseClient';

type Status = 'idle' | 'confirming' | 'success' | 'error';

export const PaymentSuccessPage: FC = () => {
  const [searchParams] = useSearchParams();
  const casheaIdNumber = searchParams.get('idNumber'); // Corrected param based on docs

  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (casheaIdNumber) {
      const confirmOrder = async () => {
        setStatus('confirming');
        setMessage('Estamos confirmando tu pago con Cashea, por favor no cierres esta ventana...');
        try {
          const { data, error } = await supabase.functions.invoke('cashea-confirm-order', {
            body: { idNumber: casheaIdNumber },
          });

          if (error) throw new Error(error.message);

          if (data.success) {
            setStatus('success');
            setMessage('¡Tu pago ha sido confirmado y tu inscripción está completa! Recibirás un correo con los detalles.');
          } else {
            throw new Error(data.error || 'Ocurrió un error desconocido al confirmar el pago.');
          }
        } catch (err: any) {
          setStatus('error');
          setMessage(err.message || 'No se pudo completar la confirmación del pago. Por favor, contacta a soporte.');
        }
      };

      confirmOrder();
    }
  }, [casheaIdNumber]);

  const renderContent = () => {
    switch (status) {
      case 'confirming':
        return (
          <>
            <h1 className="text-4xl font-bold text-accent-blue">Confirmando tu pago...</h1>
            <p className="mt-4 text-lg text-texto-secundario">{message}</p>
            {/* You can add a spinner here */}
          </>
        );
      case 'success':
        return (
          <>
            <h1 className="text-4xl font-bold text-green-600">¡Pago Confirmado!</h1>
            <p className="mt-4 text-lg text-texto-secundario">{message}</p>
          </>
        );
      case 'error':
        return (
          <>
            <h1 className="text-4xl font-bold text-red-600">Error en la Confirmación</h1>
            <p className="mt-4 text-lg text-texto-secundario">{message}</p>
          </>
        );
      case 'idle':
      default:
        return (
          <>
            <h1 className="text-4xl font-bold text-green-600">¡Gracias por tu compra!</h1>
            <p className="mt-4 text-lg text-texto-secundario">
              Si pagaste con Cashea, la confirmación debería empezar en breve.
            </p>
          </>
        );
    }
  };

  return (
    <div className="container mx-auto px-5 py-24 text-center">
      {renderContent()}
      <Link to="/" className="mt-8 inline-block">
        <PrimaryButton>Volver al Inicio</PrimaryButton>
      </Link>
    </div>
  );
};