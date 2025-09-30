// FILE: src/components/CartPanel.tsx
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from 'src/stores/cartStore';
import { PrimaryButton } from './Button';

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartPanel: FC<CartPanelProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart, clearCart } = useCartStore();
  const navigate = useNavigate();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onClose(); // Close the panel
    navigate('/checkout'); // Navigate to checkout page
  };

  return (
    <div className={`fixed inset-0 z-[1100] transition-all duration-500 ease-in-out ${isOpen ? 'visible' : 'invisible'}`}>
      {/* Overlay */}
      <div 
        className={`absolute inset-0 bg-black/50 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div className={`absolute top-0 right-0 h-full w-full sm:max-w-md bg-white shadow-2xl transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-accent-blue">Tu Carrito</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
          </div>

          {items.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
              <p className="text-lg text-texto-secundario">Tu carrito está vacío.</p>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {items.map(item => (
                <div key={item.slug} className="flex items-start gap-4">
                  <img 
                    src={item.instructors?.[0]?.imageUrl || '/assets/logo-solo.png'} 
                    alt={item.title} 
                    className="w-20 h-20 object-cover rounded-md" 
                  />
                  <div className="flex-grow">
                    <h3 className="font-bold text-texto-principal">{item.title}</h3>
                    <p className="text-accent-orange font-bold">${item.price}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.slug)} className="text-sm text-red-500 hover:underline">Eliminar</button>
                </div>
              ))}
            </div>
          )}

          {items.length > 0 && (
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center font-bold text-lg mb-4">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <PrimaryButton onClick={handleCheckout} className="w-full">Proceder al Pago</PrimaryButton>
              <button onClick={clearCart} className="w-full text-center mt-2 text-sm text-gray-500 hover:underline">Vaciar Carrito</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};