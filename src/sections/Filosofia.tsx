import type { FC } from 'react';
import { FeatureItem } from 'src/components/FeatureItem';
import {
  SpeakerWaveIcon,
  RocketLaunchIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import { ScrollAnimation } from 'src/components/ScrollAnimation';

const features = [
  {
    icon: <SpeakerWaveIcon className="w-9 h-9 text-accent-blue" />,
    title: "Dicción que Impacta",
    description: "En comunicación no basta con tener una dicción decente, marcas la diferencia y logras una atención impactante en las audiencias cuando tu pronunciación es perfecta y más, cuando lo haces con naturalidad y fluidez."
  },
  {
    icon: <RocketLaunchIcon className="w-9 h-9 text-accent-blue" />,
    title: "Tu Voz como Negocio",
    description: "Aprende a monetizar tu talento. Te guiamos para que conviertas tu voz en tu huella sonora. Te apoyamos en la construcción de tu marca personal como artista de la voz, para que te conduzcas en la industria como un verdadero empresario de tu carrera."
  },
  {
    icon: <ChatBubbleLeftRightIcon className="w-9 h-9 text-accent-blue" />,
    title: "Comunicación Asertiva",
    description: "Descubre que la disciplina y la constancia para dominar todas las cualidades de tu voz, es la misma que usarás para manejar otros aspectos de tu vida personal y profesional. Aprende asertividad y eficacia en la comunicación desde el uso correcto de las cualidades de tu voz y entendiendo los principios de la comunicación."
  }
];

export const Filosofia: FC = () => {
  return (
    <section 
      id="filosofia" 
      className="bg-fondo-seccion pt-40 -mt-24 [clip-path:polygon(0_0,100%_100px,100%_100%,0%_100%)]"
    >
      <div className="container mx-auto px-5">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-texto-principal">No se trata sólo de locución</h2>
            <p className="text-2xl font-bold text-texto-principal mt-1">Son herramientas para la vida</p>
          </div>
          <p className="text-lg text-texto-secundario">
            Nuestro enfoque es multifactorial, te damos herramientas para mejorar tu voz, but also hacemos énfasis en el lenguaje no verbal, en las habilidades de expresión oral y en la comunicación eficaz como proceso para que seas un mejor profesional, independientemente del área laboral en la que te desempeñes.
          </p>
        </div>
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
          <ScrollAnimation>
            <img 
              src="https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Profesional de la voz trabajando en un estudio de grabación moderno." 
              className="w-full rounded-custom shadow-intensa aspect-[4/5] object-cover"
            />
          </ScrollAnimation>
          <ScrollAnimation className="transition-delay-200">
            <div className="space-y-10 p-8">
              {features.map((feature, index) => (
                <FeatureItem
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </ScrollAnimation>
        </div>
        
      </div>
    </section>
  );
};