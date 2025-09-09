import type { FC } from 'react';
import { ScrollAnimation } from 'src/components/ScrollAnimation';

export const Metodo: FC = () => {
  const bgImage = `url('https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`;

  return (
    <section
      id="metodo"
      className="relative bg-cover bg-center bg-fixed text-white py-24 -mt-[100px] pt-[200px] [clip-path:polygon(0_0,100%_100px,100%_100%,0%_100%)]"
      style={{ backgroundImage: bgImage }}
    >
      <div className="absolute inset-0 bg-accent-blue opacity-75 z-10"></div>
      <div className="container mx-auto px-5 relative z-20">
        <ScrollAnimation>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Vamos más allá del talento: El poder de nuestro método</h2>
            <p className="text-lg opacity-90">
              La industria está llena de voces buenas y talentosas que nunca llegan a profesionalizarse y no alcanzan su máximo nivel nunca. ¿Por qué? Porque el talento y la experiencia por sí solos no son suficientes para destacar en una industria cada vez más competitiva y demandante. Nuestro método se basa en el desarrollo de técnicas y herramientas que potencian el talento, aquí desmitificamos aquello de "la voz de locutor", hacemos énfasis en el conocimiento profundo de tu aparato fonador, el desarrollo de tu confianza y te entregamos lo necesario para que puedas modelar, cambiar y mejorar tus talentos y capacidades. Aquí, le damos a tu voz la estructura que necesita para triunfar.
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};
