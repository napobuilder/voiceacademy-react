// FILE: src/sections/Online.tsx
import { SectionHeader } from 'src/components/SectionHeader';
import { InfoCard } from 'src/components/InfoCard';
import { courses } from 'src/data/courses';
import { ScrollAnimation } from 'src/components/ScrollAnimation';

// Lógica para mostrar solo los cursos online DESTACADOS
const featuredOnlineCourses = courses.filter(course => course.type === 'Online' && course.featured);

export function Online() {
  const imageUrl = 'https://img.arrelsfundacio.org/wp-content/uploads/2022/09/6D1A2891-768x384.jpg';

  return (
    <section 
      id="online" 
      className="relative bg-cover bg-center bg-fixed py-24 -mt-[100px] pt-[200px] [clip-path:polygon(0_0,100%_100px,100%_100%,0%_100%)]"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-accent-orange opacity-[.85] z-[-1]"></div>
      <div className="container mx-auto px-5 relative z-10">
        <SectionHeader
          isWhite
          title="Talleres Online Destacados"
          subtitle="Fórmate desde cualquier parte del mundo con la misma calidad y cercanía. Clases en directo, interacción constante, dirección personalizada y acceso a las grabaciones."
        />

        <div className="-mx-5 px-5 md:mx-0 md:px-0">
          <div className="flex overflow-x-auto space-x-6 md:space-x-0 scroll-snap-x mandatory py-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 mt-12">
            {featuredOnlineCourses.map((course, index) => (
              <ScrollAnimation 
                key={course.slug} 
                className={`w-4/5 flex-shrink-0 scroll-snap-start md:w-full transition-delay-[${index * 100}ms]`}
              >
                <InfoCard
                  variant="dark"
                  icon={course.icon}
                  title={course.title}
                  description={course.shortDescription}
                  details={course.details}
                  buttonText="Ver Detalles"
                  to={`/cursos/${course.slug}`}
                />
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}