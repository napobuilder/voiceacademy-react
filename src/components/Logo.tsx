// FILE: src/components/Logo.tsx
import type { FC } from 'react';
import { Link } from 'react-router-dom';

export const Logo: FC = () => (
  <Link to="/" className="flex items-center text-white">
    <div 
      className="w-[55px] h-[55px] sm:mr-2 bg-white"
      style={{
        maskImage: "url('https://i.imgur.com/oX76SNb.png')",
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskImage: "url('https://i.imgur.com/oX76SNb.png')",
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
      }}
    ></div>
    <div className="hidden sm:flex items-center">
      <span className="text-2xl font-black">voice</span>
      <span className="text-2xl font-light ml-1">academy</span>
    </div>
  </Link>
);
