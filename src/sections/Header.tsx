import { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import { Logo } from 'src/components/Logo';
import { NavLink } from 'src/components/NavLink';
import Button from 'src/components/Button';
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

  // State and Ref for Desktop Dropdown
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // State and Ref for Mobile Dropdown
  const [isMobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target as Node)) {
        setMobileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownLinkClick = () => {
    setDropdownOpen(false);
    setMobileDropdownOpen(false);
    setIsMenuOpen(false); // Also close mobile menu on navigation
  };

  const DropdownPanel = () => (
    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
      <a href="/#presenciales" onClick={handleDropdownLinkClick} className="block px-4 py-2 text-texto-principal hover:bg-gray-100 text-left">Presenciales</a>
      <a href="/#online" onClick={handleDropdownLinkClick} className="block px-4 py-2 text-texto-principal hover:bg-gray-100 text-left">Online</a>
    </div>
  );

  return (
    <header className="relative z-[1000] w-full py-5">
      <nav className="w-[95%] max-w-[1100px] mx-auto flex justify-between items-center bg-accent-blue/95 backdrop-blur-lg px-4 lg:px-8 py-2.5 rounded-custom shadow-intensa relative">
        <Logo />

        {/* Collapsible Menu (for links only) */}
        <div className={`absolute top-full left-0 w-full bg-accent-blue flex-col items-stretch p-5 rounded-custom shadow-intensa lg:static lg:flex lg:flex-row lg:items-center lg:w-auto lg:bg-transparent lg:p-0 lg:shadow-none ${isMenuOpen ? 'flex' : 'hidden'}`}>
          <ul className="flex flex-col gap-5 lg:flex-row lg:gap-6">
            <NavLink href="/#metodo">Método</NavLink>
            <NavLink href="/#filosofia">Filosofía</NavLink>
            <NavLink href="/#corporativos">Corporativos</NavLink>
            <NavLink href="/#servicios">Servicios</NavLink>
            <NavLink href="/#nosotros">Nosotros</NavLink>
          </ul>
          
          {/* --- Desktop Dropdown Button --- */}
          <div ref={dropdownRef} className="relative mt-5 lg:mt-0 lg:ml-6 hidden lg:block">
            <Button 
              variant="nav"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-center gap-2 w-full"
            >
              Programación
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Button>
            {isDropdownOpen && <DropdownPanel />}
          </div>
        </div>

        {/* Right-side controls (Dropdown, Cart, and Hamburger) */}
        <div className="flex items-center gap-4">
          {/* --- Mobile Dropdown Button --- */}
          <div ref={mobileDropdownRef} className="relative lg:hidden">
            <Button 
              variant="nav"
              onClick={() => setMobileDropdownOpen(!isMobileDropdownOpen)}
              className="flex items-center justify-center gap-2"
            >
              Programación
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${isMobileDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Button>
            {isMobileDropdownOpen && <DropdownPanel />}
          </div>

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