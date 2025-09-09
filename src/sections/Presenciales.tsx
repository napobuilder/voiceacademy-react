import type { FC } from 'react';
import { SectionHeader } from 'src/components/SectionHeader';
import { InfoCard } from 'src/components/InfoCard';
import { courses } from 'src/data/courses';
import { ScrollAnimation } from 'src/components/ScrollAnimation';

const presencialesCourses = courses.filter(course => course.type === 'Presencial');

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
          title="Cursos Presenciales"
          subtitle="Vive la experiencia Voice Academy en persona. Grupos reducidos, feedback inmediato, cursos 100% prácticos y la energía de aprender junto a otros artistas de la voz."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {presencialesCourses.map((course, index) => (
            <ScrollAnimation key={course.slug} className={`transition-delay-[${index * 100}ms]`}>
              <InfoCard
                variant="dark"
                icon={course.icon}
                title={course.title}
                description={course.shortDescription}
                details={course.details}
                buttonText="Ver Detalles"
                to={`/cursos/${course.slug}`}
                personImage={course.personImage}
              />
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}