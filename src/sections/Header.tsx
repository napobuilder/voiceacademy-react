import { useState } from 'react';
import type { FC } from 'react';
import { Logo } from 'src/components/Logo';
import { NavLink } from 'src/components/NavLink';
import { PrimaryButton } from 'src/components/Button';
import { useCartStore } from 'src/stores/cartStore';

interface HeaderProps {
  onCartClick: () => void;
}

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

export const Header: FC<HeaderProps> = ({ onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useCartStore(state => state.items);

  return (
    <header className="relative z-[1000] w-full py-5">
      <nav className="w-[95%] max-w-[1100px] mx-auto flex justify-between items-center bg-accent-blue/95 backdrop-blur-lg px-8 py-2.5 rounded-custom shadow-intensa relative">
        <Logo />

        {/* Collapsible Menu (for links and primary button) */}
        <div className={`absolute top-full left-0 w-full bg-accent-blue flex-col items-stretch p-5 rounded-custom shadow-intensa lg:static lg:flex lg:flex-row lg:items-center lg:w-auto lg:bg-transparent lg:p-0 lg:shadow-none ${isMenuOpen ? 'flex' : 'hidden'}`}>
          <ul className="flex flex-col gap-5 lg:flex-row lg:gap-6">
            <NavLink href="#metodo">Método</NavLink>
            <NavLink href="#filosofia">Filosofía</NavLink>
            <NavLink href="#corporativos">Corporativos</NavLink>
            <NavLink href="#servicios">Servicios</NavLink>
            <NavLink href="#nosotros">Nosotros</NavLink>
          </ul>
          <div className="flex items-center gap-4 mt-5 lg:mt-0 lg:ml-6">
            <PrimaryButton href="#presenciales">Explorar Cursos</PrimaryButton>
          </div>
        </div>

        {/* Right-side controls (Cart and Hamburger) */}
        <div className="flex items-center gap-4">
          <button onClick={onCartClick} className="relative text-white hover:text-accent-orange transition-colors">
            <CartIcon />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent-orange text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>

          <button 
            className="lg:hidden flex flex-col justify-around w-8 h-6 bg-transparent border-none cursor-pointer p-0 z-10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menú"
          >
            <span className={`w-8 h-0.5 bg-white rounded-lg transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[10px]' : ''}`}></span>
            <span className={`w-8 h-0.5 bg-white rounded-lg transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-8 h-0.5 bg-white rounded-lg transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[10px]' : ''}`}></span>
          </button>
        </div>
      </nav>
    </header>
  );
};