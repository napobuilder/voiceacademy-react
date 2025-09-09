import type { FC } from 'react';
import { PrimaryButton } from '../components/Button';
import { ScrollAnimation } from 'src/components/ScrollAnimation';

export const Hero: FC = () => {
  const bgPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23002366' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <section 
      id="hero"
      className="min-h-screen flex items-center text-center bg-fondo text-texto-principal overflow-hidden relative"
      style={{ backgroundImage: bgPattern }}
    >
      <div className="container mx-auto px-5 relative z-[2] pb-20">
        <ScrollAnimation>
          <div className="max-w-3xl mx-auto">
            <p className="text-base font-semibold tracking-[2px] uppercase text-texto-secundario mb-4">
              TU VOZ ES ÚNICA. TU CARRERA TAMBIÉN DEBERÍA SERLO.
            </p>
            <h1 className="text-6xl md:text-7xl font-light leading-tight mb-5 text-accent-blue">
              <span>Haz de </span>
              <span className="font-black">tu voz</span>
              <br />
              <span>una </span>
              <span className="font-black">marca</span>
            </h1>
            <p className="text-lg max-w-xl mx-auto mb-10 text-texto-secundario">
              No busques una voz perfecta. En Voice Academy, tenemos el método para transformar tu voz integrándola con tu capacidad de comunicar para que logres impactar cuando comuniques. Aquí construimos artistas.
            </p>
            <PrimaryButton href="#presenciales">Explorar Cursos</PrimaryButton>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};
