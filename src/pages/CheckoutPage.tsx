// FILE: src/pages/CheckoutPage.tsx
import { useState, useEffect, type FC, type FormEvent } from 'react';
import { useCartStore } from '@/stores/cartStore';
import { PrimaryButton } from '@/components/Button';
import { supabase } from '@/lib/supabaseClient';
import { CasheaButton } from '@/components/CasheaButton';
import { PaymentMethodSelector, type PaymentMethod } from '@/components/PaymentMethodSelector';
import { SkeletonLoader } from '@/components/SkeletonLoader';

// Updated Bank type to match Totalpago API response
type Bank = {
  idbancoTransf: string;
  nuCuentaBancoTransf: string;
  nmbancoTransf: string;
  rifTitularCuentaTransf: string;
  nmTitularCuentaTransf: string;
};

export const CheckoutPage: FC = () => {
  const { items, clearCart } = useCartStore();
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal; // Assuming no taxes or fees for now

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Venezuela');
  const [address, setAddress] = useState('');
  const [instagram, setInstagram] = useState('');

  // Payment State
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [banescoIds, setBanescoIds] = useState<{ transfer: string | null; mobile: string | null }>({ transfer: null, mobile: null });
  const [selectedBank, setSelectedBank] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [operationType, setOperationType] = useState('01'); // '01' for Transfer, '02' for Mobile Payment
  const [verifyingPagoId, setVerifyingPagoId] = useState<string | null>(null);

  // UI State
  const [loading, setLoading] = useState(true); // Start with loading true for initial data fetch
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [casheaError, setCasheaError] = useState<string | null>(null);

  useEffect(() => {
    const initialLoad = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.functions.invoke('get-exchange-rate');
        if (error) throw error;
        setExchangeRate(data.rate);
      } catch (error: any) {
        console.error('Error fetching exchange rate:', error);
        setError('No se pudo obtener la tasa de cambio. Por favor, recargue la página.');
      }
      setLoading(false);
    };
    initialLoad();
  }, []);

  useEffect(() => {
    if (selectedPaymentMethod === 'totalpago') {
      const fetchBanks = async () => {
        setLoading(true);
        setError(null);
        try {
          const { data, error } = await supabase.functions.invoke('totalpago-get-banks');
          if (error) throw error;
          const bankList: Bank[] = data || [];

          const transferId = bankList.find(b => b.nmbancoTransf.includes('Transferencia') && b.nmbancoTransf.includes('BANESCO'))?.idbancoTransf || null;
          const mobileId = bankList.find(b => b.nmbancoTransf.includes('Pago Móvil') && b.nmbancoTransf.includes('BANESCO'))?.idbancoTransf || null;
          setBanescoIds({ transfer: transferId, mobile: mobileId });

        } catch (error: any) {
          console.error('Error fetching banks:', error);
          setError('No se pudo cargar la lista de bancos. Intente seleccionar el método de pago de nuevo.');
        } finally {
          setLoading(false);
        }
      };
      fetchBanks();
    }
  }, [selectedPaymentMethod]);

  useEffect(() => {
    if (!verifyingPagoId) return;

    const intervalId = setInterval(async () => {
      try {
        const { data, error } = await supabase.functions.invoke('totalpago-verify-payment', { 
          body: { idPago: verifyingPagoId } 
        });

        if (error) throw new Error(error.message);

        if (data.estatus === 'APROBADO') {
          setSuccess(true);
          setLoading(false);
          setError(null);
          setVerifyingPagoId(null);
          clearCart();
          clearInterval(intervalId);
        } else if (data.estatus === 'RECHAZADO') {
          setError(`Pago rechazado: ${data.causaRechazo || 'Razón desconocida'}`);
          setLoading(false);
          setVerifyingPagoId(null);
          clearInterval(intervalId);
        }
      } catch (err: any) {
        console.error('Error verifying payment:', err);
        setError('Ocurrió un error al verificar el pago. Por favor, contacte a soporte.');
        setLoading(false);
        setVerifyingPagoId(null);
        clearInterval(intervalId);
      }
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(intervalId);

  }, [verifyingPagoId, clearCart]);

  const handleTotalpagoSubmit = async () => {
    if (!exchangeRate || !selectedBank) {
      setError('Por favor, seleccione un tipo de pago (Transferencia o Pago Móvil) y complete los datos.');
      return;
    }

    setLoading(true);
    setError(null);

    const idPago = `VA-${Date.now()}`;
    const totalInBs = (total * exchangeRate).toFixed(2).replace('.', ',');
    const formattedDate = new Date(paymentDate).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

    const ciMatch = idNumber.match(/^([VEJ])(\d+)$/i);
    if (!ciMatch) {
      setError('El formato de la Cédula o ID es incorrecto. Debe empezar con V, E, o J seguido de los números.');
      setLoading(false);
      return;
    }
    const [, nationality, ciNumber] = ciMatch;

    const paymentPayload = {
      idPago,
      mtPago: totalInBs,
      descPago: `Compra de cursos Voice Academy - ${idPago}`,
      nuReferenciaTransf: referenceNumber,
      idbancoTransf: selectedBank,
      fechaTransferencia: formattedDate,
      nacCiTitularCuentaTransferencia: nationality.toUpperCase(),
      numeroCiTitularCuentaTransferencia: ciNumber,
      nmTitularCuentaTransferencia: fullName,
      telfTitularCuentaTransferencia: phone,
      correoTitularCuentaTransferencia: email,
    };

    try {
      const { data, error: functionError } = await supabase.functions.invoke('totalpago-register-payment', { body: paymentPayload });

      if (functionError) throw functionError;

      if (data.Mensaje === 'PAGO_INGRESADO') {
        setVerifyingPagoId(idPago);
        setError('Pago registrado. Estamos verificando la transacción. Por favor, no cierre esta ventana. Esto puede tardar unos minutos.');
      } else {
        throw new Error(data.Mensaje || 'Error al registrar el pago.');
      }

    } catch (err: any) {
      console.error('Error registering payment:', err);
      setError(err.message || 'Ocurrió un error al registrar el pago.');
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      setError('Por favor, seleccione un método de pago.');
      return;
    }

    if (selectedPaymentMethod === 'totalpago') {
      handleTotalpagoSubmit();
    }
    // Cashea is now handled by its own component, so no action is needed here.
  };

  if (success) {
    return (
      <div className="bg-fondo py-16 md:py-24">
        <div className="container mx-auto px-5 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">¡Pago Aprobado!</h1>
          <p className="text-xl text-texto-secundario mb-8">Gracias por tu compra. Hemos recibido tu pago correctamente.</p>
          <p className="text-texto-principal">Recibirás un correo electrónico con los detalles de tu inscripción en breve.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-fondo py-16 md:py-24">
      <div className="container mx-auto px-5">
        <h1 className="text-4xl md:text-5xl font-bold text-accent-blue mb-12 text-center">Finalizar Compra</h1>
        
        {items.length === 0 && !loading ? (
          <div className="text-center">
            <p className="text-xl text-texto-secundario">Tu carrito está vacío.</p>
            <p className="mt-4">No tienes productos que pagar.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            {/* Columna Principal: Formulario y Pago */}
            <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-suave">
              <form onSubmit={handleFormSubmit}>
                <section>
                  <h2 className="text-2xl font-bold text-accent-blue mb-6">Datos del Cliente</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Nombre Completo" required className="w-full p-3 border border-gray-300 rounded-md" />
                    <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo Electrónico" type="email" required className="w-full p-3 border border-gray-300 rounded-md" />
                    <input value={idNumber} onChange={e => setIdNumber(e.target.value)} placeholder="Cédula o ID" required className="w-full p-3 border border-gray-300 rounded-md" />
                    <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Número de Teléfono" type="tel" required className="w-full p-3 border border-gray-300 rounded-md" />
                    <input value={country} onChange={e => setCountry(e.target.value)} placeholder="País" required className="w-full p-3 border border-gray-300 rounded-md" />
                    <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Dirección Corta" required className="w-full p-3 border border-gray-300 rounded-md" />
                    <input value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="Cuenta de Instagram (Opcional)" className="w-full p-3 border border-gray-300 rounded-md" />
                  </div>
                </section>

                <section className="mt-12">
                  <h2 className="text-2xl font-bold text-accent-blue mb-6">Método de Pago</h2>
                  <PaymentMethodSelector
                    selectedMethod={selectedPaymentMethod}
                    onSelectMethod={setSelectedPaymentMethod}
                    disabled={!fullName || !email || !idNumber}
                  />
                </section>

                {selectedPaymentMethod === 'cashea' && (
                  <section className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-bold text-accent-blue mb-4">Pagar con Cashea</h3>
                    {idNumber && fullName && email ? (
                      <CasheaButton customer={{ fullName, email, identificationNumber: idNumber }} />
                    ) : (
                      <div>
                        <button
                          type="button"
                          className="w-full bg-black opacity-50 text-white font-bold py-3 px-4 rounded-lg cursor-not-allowed flex items-center justify-center transition-opacity"
                          onClick={() => {
                            setCasheaError('Por favor, completa tus datos de cliente (Nombre, Correo y Cédula/ID) para poder pagar con Cashea.');
                          }}
                        >
                          <span className="font-bold">Pagar con</span>
                          <img src="/assets/logo-cashea-oficial.webp" alt="Cashea" className="h-5 ml-2" />
                        </button>
                        {casheaError && <p className="text-red-600 text-sm mt-3 font-medium">{casheaError}</p>}
                      </div>
                    )}
                  </section>
                )}

                {/* Totalpago Form Fields */}
                {selectedPaymentMethod === 'totalpago' && (
                  <section className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-bold text-accent-blue mb-4">Detalles del Pago en Bolívares</h3>
                    {loading || !exchangeRate ? (
                      <div className="space-y-4">
                        <SkeletonLoader className="h-8 w-1/3" />
                        <div className="grid grid-cols-2 gap-4">
                          <SkeletonLoader className="h-12 w-full" />
                          <SkeletonLoader className="h-12 w-full" />
                        </div>
                        <SkeletonLoader className="h-10 w-full" />
                        <SkeletonLoader className="h-10 w-full" />
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-6">
                        {/* Smart Operation Type Selection */}
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Operación</label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                              type="button"
                              onClick={() => {
                                setOperationType('01');
                                setSelectedBank(banescoIds.transfer || '');
                              }}
                              className={`p-4 border rounded-lg text-center transition ${operationType === '01' ? 'bg-accent-blue text-white ring-2 ring-offset-2 ring-accent-blue' : 'bg-white hover:bg-gray-50'}`}>
                              <span className="font-bold">Transferencia</span>
                              <span className="block text-sm">A Banesco</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setOperationType('02');
                                setSelectedBank(banescoIds.mobile || '');
                              }}
                              className={`p-4 border rounded-lg text-center transition ${operationType === '02' ? 'bg-accent-blue text-white ring-2 ring-offset-2 ring-accent-blue' : 'bg-white hover:bg-gray-50'}`}>
                              <span className="font-bold">Pago Móvil</span>
                              <span className="block text-sm">A Banesco</span>
                            </button>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="reference" className="block text-sm font-medium text-gray-700 mb-1">Nro. de Referencia</label>
                          <input id="reference" value={referenceNumber} onChange={e => setReferenceNumber(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-md" />
                        </div>
                        <div>
                          <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700 mb-1">Fecha del Pago</label>
                          <input id="paymentDate" type="date" value={paymentDate} onChange={e => setPaymentDate(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-md" />
                        </div>
                        <div className="sm:col-span-2 bg-blue-100 text-accent-blue font-bold p-3 rounded-md text-center text-lg">
                          Monto a Pagar: Bs. {(total * exchangeRate).toFixed(2)}
                        </div>
                      </div>
                    )}
                  </section>
                )}

                {/* Error Message */}
                {error && <div className="mt-6 text-red-600 bg-red-100 p-4 rounded-md">{error}</div>}

                {/* The main submit button is now conditional */}
                {selectedPaymentMethod !== 'cashea' && (
                  <div className="mt-12">
                    <PrimaryButton type="submit" className="w-full text-lg" disabled={loading || verifyingPagoId !== null || !selectedPaymentMethod}>
                      {verifyingPagoId ? 'Verificando Pago...' : (loading ? 'Procesando...' : `Pagar €${total.toFixed(2)}`)}
                    </PrimaryButton>
                  </div>
                )}
              </form>
            </div>

            {/* Columna Lateral: Resumen de Compra */}
            <aside className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-suave sticky top-32">
                <h2 className="text-2xl font-bold text-accent-blue mb-6 border-b pb-4">Resumen de tu Pedido</h2>
                {loading ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <SkeletonLoader className="w-16 h-16 rounded-md" />
                      <div className="flex-1 space-y-2">
                        <SkeletonLoader className="h-5 w-3/4" />
                        <SkeletonLoader className="h-4 w-1/4" />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <SkeletonLoader className="w-16 h-16 rounded-md" />
                      <div className="flex-1 space-y-2">
                        <SkeletonLoader className="h-5 w-3/4" />
                        <SkeletonLoader className="h-4 w-1/4" />
                      </div>
                    </div>
                  </div>
                ) : (
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
                        <p className="font-bold text-texto-principal">€{item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-6 pt-6 border-t space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span>€{total.toFixed(2)}</span>
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