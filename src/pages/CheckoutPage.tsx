// FILE: src/pages/CheckoutPage.tsx
import type { FC } from 'react';
import { useCartStore } from 'src/stores/cartStore';
import { PrimaryButton } from 'src/components/Button';

export const CheckoutPage: FC = () => {
  const { items } = useCartStore();
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal; // Assuming no taxes or fees for now

  return (
    <div className="bg-fondo py-16 md:py-24">
      <div className="container mx-auto px-5">
        <h1 className="text-4xl md:text-5xl font-bold text-accent-blue mb-12 text-center">Finalizar Compra</h1>
        
        {items.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-texto-secundario">Tu carrito está vacío.</p>
            <p className="mt-4">No tienes productos que pagar.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            {/* Columna Principal: Formulario y Pago */}
            <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-suave">
              <form>
                <section>
                  <h2 className="text-2xl font-bold text-accent-blue mb-6">Datos del Cliente</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-bold text-texto-principal mb-2">Nombre Completo</label>
                      <input type="text" id="fullName" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-blue focus:border-transparent transition" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-texto-principal mb-2">Correo Electrónico</label>
                      <input type="email" id="email" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-blue focus:border-transparent transition" />
                    </div>
                    <div>
                      <label htmlFor="idNumber" className="block text-sm font-bold text-texto-principal mb-2">Cédula o ID</label>
                      <input type="text" id="idNumber" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-blue focus:border-transparent transition" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-texto-principal mb-2">Número de Teléfono</label>
                      <input type="tel" id="phone" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-blue focus:border-transparent transition" />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-bold text-texto-principal mb-2">País</label>
                      <input type="text" id="country" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-blue focus:border-transparent transition" />
                    </div>
                    <div>
                      <label htmlFor="address" className="block text-sm font-bold text-texto-principal mb-2">Dirección Corta</label>
                      <input type="text" id="address" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-blue focus:border-transparent transition" />
                    </div>
                    <div>
                      <label htmlFor="instagram" className="block text-sm font-bold text-texto-principal mb-2">Cuenta de Instagram (Opcional)</label>
                      <input type="text" id="instagram" className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent-blue focus:border-transparent transition" />
                    </div>
                  </div>
                </section>

                <section className="mt-12">
                  <h2 className="text-2xl font-bold text-accent-blue mb-6">Método de Pago</h2>
                  <div className="space-y-4">
                    {/* TODO: Implement payment method selection logic */}
                    <button type="button" className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-md text-left hover:bg-gray-50 transition">
                      <span className="font-bold">Financia con Cashea</span>
                      <img src="/assets/logo-cashea-oficial.webp" alt="Cashea" className="h-6" />
                    </button>
                    <button type="button" className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-md text-left hover:bg-gray-50 transition">
                      <span className="font-bold">Pagos en Bs</span>
                      {/* Placeholder for Totalpago logo */}
                    </button>
                    <button type="button" className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-md text-left hover:bg-gray-50 transition">
                      <span className="font-bold">Pagos con Tarjetas internacionales</span>
                      {/* Placeholder for Bancamiga logo */}
                    </button>
                    <button type="button" className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-md text-left hover:bg-gray-50 transition">
                      <span className="font-bold">Otros métodos de pago</span>
                      {/* Placeholder for Zelle, Paypal, Binance logos */}
                    </button>
                  </div>
                </section>

                <div className="mt-12">
                  <PrimaryButton type="submit" className="w-full text-lg">Pagar ${total.toFixed(2)}</PrimaryButton>
                </div>
              </form>
            </div>

            {/* Columna Lateral: Resumen de Compra */}
            <aside className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-suave sticky top-32">
                <h2 className="text-2xl font-bold text-accent-blue mb-6 border-b pb-4">Resumen de tu Pedido</h2>
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.slug} className="flex justify-between items-start">
                      <div className="flex items-start gap-4">
                        <img src={item.instructors?.[0]?.imageUrl || '/assets/logo-solo.png'} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
                        <div>
                          <h3 className="font-bold text-texto-principal">{item.title}</h3>
                          <p className="text-sm text-texto-secundario">x {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-bold text-texto-principal">${item.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};