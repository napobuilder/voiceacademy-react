// FILE: src/components/PaymentMethodSelector.tsx
import type { FC } from 'react';
import { FaUniversity } from 'react-icons/fa';
import { FaPaypal } from 'react-icons/fa6';

export type PaymentMethod = 'cashea' | 'totalpago' | 'paypal' | 'zelle' | null;

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onSelectMethod: (method: PaymentMethod) => void;
  disabled?: boolean;
}

const paymentOptions = [
  {
    id: 'cashea' as PaymentMethod,
    title: 'Paga en cuotas con Cashea',
    icon: '/assets/logo-cashea-oficial.webp', // Path to the image
  },
  {
    id: 'totalpago' as PaymentMethod,
    title: 'Transferencia o Pago Móvil (Bs.)',
    icon: FaUniversity,
    iconColor: 'text-blue-700',
  },
  {
    id: 'paypal' as PaymentMethod,
    title: 'Zelle o Paypal',
    icon: FaPaypal,
    iconColor: 'text-blue-500',
    disabled: true, // Marcador de posición
  },
];

export const PaymentMethodSelector: FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onSelectMethod,
  disabled = false,
}) => {
  return (
    <div className="space-y-4">
      {paymentOptions.map((option) => {
        const isSelected = selectedMethod === option.id;
        const isDisabled = disabled || option.disabled;

        return (
          <button
            key={option.id}
            type="button"
            disabled={isDisabled}
            onClick={() => onSelectMethod(option.id)}
            className={`w-full flex items-center p-4 border rounded-lg text-left transition-all duration-200
              ${isSelected ? 'border-accent-blue ring-2 ring-accent-blue shadow-lg' : 'border-gray-300 hover:border-accent-blue hover:shadow-md'}
              ${isDisabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white'}
            `}
          >
            {typeof option.icon === 'string' ? (
              <img src={option.icon} alt={`${option.title} logo`} className="h-8 w-auto mr-4" />
            ) : (
              <option.icon className={`text-3xl mr-4 ${option.iconColor}`} />
            )}
            <div className="flex-grow">
              <span className="font-bold text-base md:text-lg text-texto-principal">{option.title}</span>
              {option.disabled && (
                <span className="text-xs font-semibold text-orange-500 ml-2">(Próximamente)</span>
              )}
            </div>
            <div className={`w-5 h-5 rounded-full border-2 ${isSelected ? 'bg-accent-blue border-accent-blue' : 'border-gray-400'}`} />
          </button>
        );
      })}
    </div>
  );
};
