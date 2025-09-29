import type { FC } from 'react';
import { Link } from 'react-router-dom';
import Button from 'src/components/Button';

export const GoDemosBanner: FC = () => {
  return (
    <section 
      id="godemos-banner"
      className="bg-texto-principal text-white py-8"
    >
      <div className="container mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex-shrink-0">
          <img src="/Logo_Horizontal_W_PNG (1).png" alt="GoDemos Logo" className="h-12" />
        </div>
        <p className="text-xl md:text-2xl font-semibold text-center">
          La plataforma #1 para locutores, ahora en Venezuela
        </p>
        <div className="flex-shrink-0">
          <Link to="/godemos">
            <Button variant="secondary">
              Conoce los Planes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};