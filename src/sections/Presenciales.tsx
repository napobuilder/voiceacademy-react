
import type { FC } from 'react';
import { SectionHeader } from 'src/components/SectionHeader';
import { InfoCard } from 'src/components/InfoCard';
import { courses } from 'src/data/courses';
import { ScrollAnimation } from 'src/components/ScrollAnimation';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

// 1. Lógica para filtrar y ordenar los cursos más recientes
const today = new Date();
today.setHours(0, 0, 0, 0); // Normalizar a la medianoche para una comparación precisa

const upcomingPresencialesCourses = courses
  .filter(course => 
    course.type === 'Presencial' && 
    course.startDate && 
    course.startDate >= today
  )
  .sort((a, b) => a.startDate!.getTime() - b.startDate!.getTime());

// Helper para formatear la fecha
const formatDate = (date: Date): string => {
  const formatter = new Intl.DateTimeFormat('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
  });
  // Capitalizar la primera letra y quitar el punto del día de la semana
  return formatter.format(date).replace(/\.$/, '').replace(/^./, (char) => char.toUpperCase());
};


export const Presenciales: FC = () => {
  const imageUrl = 'https://img.arrelsfundacio.org/wp-content/uploads/2022/09/6D1A2891-768x384.jpg';

  return (
    <section
      id="presenciales"
      className="relative bg-cover bg-center bg-fixed py-24 -mt-[100px] pt-[200px] [clip-path:polygon(0_100px,100%_0,100%_100%,0%_100%)]"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-secondary-bg opacity-[.85] z-[-1]"></div>
      <div className="container mx-auto px-5 relative z-10">
        <SectionHeader
          isWhite
          title="Próximos Cursos Presenciales"
          subtitle="Vive la experiencia Voice Academy en persona. Grupos reducidos, feedback inmediato, cursos 100% prácticos y la energía de aprender junto a otros artistas de la voz."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {upcomingPresencialesCourses.map((course, index) => {
            // 2. Inyectar dinámicamente la fecha formateada en los detalles de la tarjeta
            const courseDetails = [
              {
                icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />,
                label: 'Inicia',
                value: course.startDate ? formatDate(course.startDate) : 'Próximamente',
              },
              ...(course.details || []),
            ];

            return (
              <ScrollAnimation key={course.slug} className={`transition-delay-[${index * 100}ms]`}>
                <InfoCard
                  variant="dark"
                  icon={course.icon}
                  title={course.title}
                  description={course.shortDescription}
                  details={courseDetails} // <-- Pasando los detalles con la fecha formateada
                  buttonText="Ver Detalles"
                  to={`/cursos/${course.slug}`}
                />
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
}
