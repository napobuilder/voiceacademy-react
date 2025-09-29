// FILE: src/sections/Corporativos.tsx
import { SectionHeader } from 'src/components/SectionHeader';
import { FeatureItem } from 'src/components/FeatureItem';
import { MicrophoneIcon, PhoneIcon, PresentationChartLineIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';
import Button from 'src/components/Button';
import { ScrollAnimation } from 'src/components/ScrollAnimation';

export function Corporativos() {
  return (
    <section id="corporativos" className="relative bg-accent-blue text-white py-24 mt-[-100px] pt-[200px] [clip-path:polygon(0_100px,100%_0,100%_100%,0%_100%)]">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Entrenamientos Corporativos In-Company"
          subtitle="La capacitación transforma a las empresas. Comunicar no es solo hablar... es impactar, persuadir, motivar y destacar tus ideas. Ofrecemos programas estructurados en módulos adaptables a las necesidades de cada cliente."
          isWhite
        />
        <div className="grid md:grid-cols-2 gap-16 items-center mt-12">
          <ScrollAnimation>
            <img 
              src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Equipo de trabajo colaborando en una oficina moderna."
              className="rounded-lg shadow-lg w-full"
            />
          </ScrollAnimation>
          <ScrollAnimation className="transition-delay-200">
            <div className="space-y-8">
              <FeatureItem
                icon={<MicrophoneIcon className="w-8 h-8" />}
                title="Comunicación Eficiente y Productiva"
                description="Todo se trata de estructura. Saber cómo, cuándo, dónde y para quién comunicamos es clave para lograr eficiencia y fluidez. Incluye oratoria, liderazgo, storytelling, y más."
                isWhite
              />
              <FeatureItem
                icon={<PhoneIcon className="w-8 h-8" />}
                title="Ventas y Atención al Cliente"
                description="Estrategias para vender sin vender, fidelización del cliente, y el modelo de gestión Disney para atención al cliente. Las ventas son conversaciones que mejoran vidas."
                isWhite
              />
              <FeatureItem
                icon={<PresentationChartLineIcon className="w-8 h-8" />}
                title="Presentaciones Geniales y Liderazgo"
                description="Organiza y esquematiza tus ideas en formatos atractivos. Conviértete en el líder inspirador, asertivo y ejemplar que toda organización necesita."
                isWhite
              />
              <FeatureItem
                icon={<SpeakerWaveIcon className="w-8 h-8" />}
                title="Vocería Comunicacional"
                description="Desarrollo de imagen y mensajes, preparación para entrevistas en medios y manejo de la improvisación como recurso clave para voceros."
                isWhite
              />
            </div>
          </ScrollAnimation>
        </div>
        <ScrollAnimation className="text-center mt-16">
            <p className="text-lg max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                Nuestros módulos son independientes y adaptables según cada necesidad. Pueden estructurarse en formato de 3 ó 6 horas de trabajo intensivo bajo la modalidad de workshop, o en un taller completo de 4 sesiones de 90 minutos cada una.
            </p>
            <Button href="#cta-final" variant="secondary" className="mt-8">
                Solicitar Propuesta Personalizada
            </Button>
        </ScrollAnimation>
      </div>
    </section>
  );
}