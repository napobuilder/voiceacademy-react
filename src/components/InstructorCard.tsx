// FILE: src/components/InstructorCard.tsx
import type { ImgHTMLAttributes } from 'react';

interface InstructorCardProps {
  imageUrl: string;
  name: string;
  title: string;
  quote?: string;
  imgStyle?: ImgHTMLAttributes<HTMLImageElement>['style'];
}

export function InstructorCard({ imageUrl, name, title, quote, imgStyle }: InstructorCardProps) {
  return (
    <div className="text-center animate-on-scroll">
      <img 
        className="w-[250px] h-[250px] rounded-full object-cover border-[5px] border-white mx-auto mb-5 transition-transform transition-shadow duration-300 ease-in-out hover:scale-105 hover:shadow-[0_20px_50px_rgba(0,35,102,0.25)]"
        src={imageUrl} 
        alt={`Foto de ${name}`}
        style={{ ...imgStyle, boxShadow: '0 15px 40px rgba(0, 35, 102, 0.2)' }}
      />
      <h4 className="text-[1.4rem] font-bold text-accent-blue">{name}</h4>
      <span className="text-accent-orange font-semibold block mb-2.5">{title}</span>
      {quote && <p className="text-[0.95rem] text-texto-secundario">"{quote}"</p>}
    </div>
  );
}
