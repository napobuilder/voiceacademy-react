// FILE: src/components/Button.tsx
import type { FC, MouseEventHandler } from 'react';

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'nav'; // Add variant prop
  target?: string;
  rel?: string;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ href, children, className, onClick, type, variant, target, rel, disabled }) => {
  const baseClasses = "inline-block py-3 px-8 rounded-custom font-bold text-base transition-all duration-300 cursor-pointer text-center";
  
  const variantClasses = {
    primary: "bg-accent-orange text-white shadow-[0_4px_15px_rgba(224,138,27,0.3)] hover:bg-accent-orange-hover hover:-translate-y-1 hover:shadow-[0_7px_20px_rgba(224,138,27,0.4)]",
    secondary: "bg-white text-accent-orange hover:-translate-y-1 hover:shadow-[0_7px_20px_rgba(224,138,27,0.4)]",
    whatsapp: "bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-whatsapp text-[1.1rem] py-[18px] px-[40px]",
    nav: "bg-transparent text-white shadow-none hover:text-accent-orange py-2 px-3",
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  const combinedClasses = `${baseClasses} ${variant ? variantClasses[variant] : ''} ${className || ''} ${disabledClasses}`;

  if (href && !disabled) {
    return (
      <a href={href} className={combinedClasses} onClick={onClick as MouseEventHandler<HTMLAnchorElement>} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  if (href && disabled) {
    return (
      <span className={combinedClasses}>
        {children}
      </span>
    );
  }

  return (
    <button type={type || 'button'} className={combinedClasses} onClick={onClick as MouseEventHandler<HTMLButtonElement>} disabled={disabled}>
      {children}
    </button>
  );
};

export const PrimaryButton: FC<ButtonProps> = (props) => (
  <Button {...props} variant="primary" />
);

export default Button;
