// FILE: src/sections/Nosotros.tsx
import { SectionHeader } from 'src/components/SectionHeader';
import { InstructorCard } from 'src/components/InstructorCard';

// Datos de los instructores
const instructors = [
  {
    imgSrc: '/assets/abelardo-oseche.jpg',
    name: 'Abelardo Oseches',
    title: 'CEO fundador. Director Académico',
    quote: 'Vi a demasiados artistas estancarse por falta de un método. Mi misión es darte las herramientas no sólo para dominar su voz, sino para construir una carrera.',
    imgStyle: { objectPosition: '50% 40%' }
  },
  {
    imgSrc: '/assets/maira-rojas.jpg',
    name: 'Maira Alejandra Rojas',
    title: 'CCO. Directora Operativa',
    quote: 'Mi pasión es la organización, la producción y los procesos. Nuestra misión es hacer de Voice, un ejemplo de gestión, de atención y de formación, para crear experiencias inolvidables desde el primer contacto.',
    imgStyle: { objectPosition: '50% 20%' }
  },
  {
    imgSrc: '/assets/zayanit-lamas.jpg',
    name: 'Zayanit Lamas',
    title: 'Coordinadora',
    quote: 'Como diseñadora trato de mostrar la mejor cara de Voice, que lo que proyectemos como imagen se relacione con lo que somos como comunidad. Mi tarea al ser también la cara visible de la atención, es hacer que todos nuestros alumnos y clientes se sientan en casa.',
    imgStyle: { objectPosition: '50% 40%' }
  }
];

export function Nosotros() {
  return (
    <section id="nosotros" className="relative bg-fondo-seccion py-24 mt-[-100px] pt-[200px] [clip-path:polygon(0_0,100%_100px,100%_100%,0%_100%)]">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Un Equipo Dedicado a tu Voz"
          subtitle="No sólo somos instructores, somos artistas y profesionales activos. Estamos aquí para guiarte con experiencia real, carreras consolidadas y ejemplos de vida capaces de inspirar y transformar."
        />
        <div className="grid md:grid-cols-3 gap-8">
          {instructors.map((instructor, index) => (
            <InstructorCard key={index} {...instructor} />
          ))}
        </div>
      </div>
    </section>
  );
}
