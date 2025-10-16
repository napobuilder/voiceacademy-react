import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { PrimaryButton } from '@/components/Button';

export const PaymentCancelledPage: FC = () => {
  return (
    <div className="container mx-auto px-5 py-24 text-center">
      <h1 className="text-4xl font-bold text-accent-orange">Pago Cancelado</h1>
      <p className="mt-4 text-lg text-texto-secundario">
        El proceso de pago fue cancelado o interrumpido.
      </p>
      <p className="mt-2 text-texto-principal">
        No se ha realizado ningún cargo. Puedes volver a tu carrito e intentarlo de nuevo.
      </p>
      <Link to="/checkout" className="mt-8 inline-block">
        <PrimaryButton>Volver al Checkout</PrimaryButton>
      </Link>
    </div>
  );
};