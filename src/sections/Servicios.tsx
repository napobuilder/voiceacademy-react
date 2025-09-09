// FILE: src/sections/Servicios.tsx
import { SectionHeader } from 'src/components/SectionHeader';
import { FeatureItem } from 'src/components/FeatureItem';
import { MusicalNoteIcon, AcademicCapIcon, MicrophoneIcon } from '@heroicons/react/24/outline';
import Button from 'src/components/Button';
import { ScrollAnimation } from 'src/components/ScrollAnimation';

export function Servicios() {
  return (
    <section id="servicios" className="relative bg-accent-orange text-white py-24 mt-[-100px] pt-[200px] [clip-path:polygon(0_100px,100%_0,100%_100%,0%_100%)]">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Servicios para Profesionales"
          subtitle="Lleva tu carrera al siguiente nivel con nuestras herramientas y asesoramiento personalizado."
          isWhite
        />
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-16 items-center">
          <ScrollAnimation>
            <div className="space-y-12">
              <FeatureItem
                icon={<MusicalNoteIcon className="w-8 h-8" />}
                title="Grabación de Demos"
                description="El demo es una pieza estratégica de mercadeo, es lo que le demuestra a la industria de la voz que existes. Aquí producimos tu carta de presentación sonora. Producción de textos originales, grabación, dirección, edición y mezcla de alta calidad para destacar."
                isWhite
              >
                <Button href="#cta-final" variant="secondary" className="mt-4">
                  Cotizar Demo
                </Button>
              </FeatureItem>
              <FeatureItem
                icon={<AcademicCapIcon className="w-8 h-8" />}
                title="Clases Personalizadas"
                description="Sesiones privadas con nuestro director para trabajar objetivos y necesidades específicas, comunicación, vocería, locución comercial, narración documental, oratoria, acento neutro, dicción, así como preparar un casting o pulir tu técnica."
                isWhite
              >
                <Button href="#cta-final" variant="secondary" className="mt-4">
                  Agendar Sesión
                </Button>
              </FeatureItem>
              <FeatureItem
                icon={<MicrophoneIcon className="w-8 h-8" />}
                title="Estudio de Grabación"
                description="Nuestra cabina está equipada y disponible para tus proyectos de grabación personal, castings, audiciones, narraciones, comerciales o audiolibros."
                isWhite
              >
                <Button href="#cta-final" variant="secondary" className="mt-4">
                  Reservar Estudio
                </Button>
              </FeatureItem>
            </div>
          </ScrollAnimation>
          <ScrollAnimation className="order-first md:order-last transition-delay-200">
            <img 
              src="https://kornercollective.com/wp-content/uploads/2023/11/que-es-estudio-grabacion.jpg" 
              alt="Estudio de grabación profesional con consola de mezcla y micrófono."
              className="rounded-custom shadow-intensa w-full aspect-[4/5] object-cover"
            />
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
