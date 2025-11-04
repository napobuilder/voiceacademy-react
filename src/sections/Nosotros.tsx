// FILE: src/sections/Nosotros.tsx
import { useState } from 'react';
import { SectionHeader } from '@/components/SectionHeader';
import { InstructorCard } from '@/components/InstructorCard';
import { InstructorGalleryCard } from '@/components/InstructorGalleryCard';
import { InstructorModal } from '@/components/InstructorModal';
import { getLeaders, getGalleryInstructors, type Instructor } from '@/data/instructors';
import type { Course } from '@/data/courses';

const leaders = getLeaders();
const galleryInstructors = getGalleryInstructors();

interface NosotrosProps {
  courses: Course[];
}

export function Nosotros({ courses }: NosotrosProps) {
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [instructorCourses, setInstructorCourses] = useState<Course[]>([]);

  const openModal = (instructor: Instructor) => {
    const coursesTaught = courses.filter(course => 
      course.instructorSlugs?.includes(instructor.slug)
    );
    setSelectedInstructor(instructor);
    setInstructorCourses(coursesTaught);
  };

  const closeModal = () => {
    setSelectedInstructor(null);
    setInstructorCourses([]);
  };

  return (
    <section id="nosotros" className="relative z-10 bg-fondo-seccion py-24 mt-[-100px] pt-[200px] [clip-path:polygon(0_0,100%_100px,100%_100%,0%_100%)]">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Un Equipo Dedicado a tu Voz"
          subtitle="No sólo somos instructores, somos artistas y profesionales activos. Estamos aquí para guiarte con experiencia real, carreras consolidadas y ejemplos de vida capaces de inspirar y transformar."
        />
        <div className="flex flex-wrap justify-center gap-8 mb-24">
          {leaders.map((instructor, index) => (
            <InstructorCard key={index} {...instructor} />
          ))}
        </div>

        <h3 className="text-3xl font-bold text-center text-accent-blue mb-12">Y nuestro increíble equipo de instructores</h3>

        <div className="flex gap-8 overflow-x-auto pb-8 -mx-4 px-4 scrollbar-thin scrollbar-thumb-accent-orange/50 scrollbar-track-transparent">
          {galleryInstructors.map((instructor, index) => (
            <InstructorGalleryCard 
              key={index} 
              {...instructor} 
              onClick={() => openModal(instructor)}
            />
          ))}
        </div>
      </div>

      <InstructorModal 
        instructor={selectedInstructor} 
        courses={instructorCourses} 
        onClose={closeModal} 
      />
    </section>
  );
}