// FILE: src/components/NavLink.tsx
import type { FC } from 'react';

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

export const NavLink: FC<NavLinkProps> = ({ href, children }) => (
  <li>
    <a href={href} className="text-white font-medium relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-accent-orange after:transition-all after:duration-300 hover:after:w-full">
      {children}
    </a>
  </li>
);