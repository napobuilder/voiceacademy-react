// FILE: src/components/InstructorModal.tsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { XMarkIcon, BookOpenIcon } from '@heroicons/react/24/solid';
import type { Instructor } from '@/data/instructors';
import type { Course } from '@/data/courses'; // Keep this import for the Course type

interface InstructorModalProps {
  instructor: Instructor | null;
  courses: Course[]; // Now accepts filtered courses directly
  onClose: () => void;
}

export function InstructorModal({ instructor, courses, onClose }: InstructorModalProps) {
  useEffect(() => {
    if (instructor) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [instructor]);

  if (!instructor) return null;

  // instructorCourses is now passed as 'courses' prop
  const instructorCourses = courses; // Use the prop directly

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-[1100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Contenedor principal del Modal con Flexbox */}
      <div 
        className="relative bg-fondo-seccion w-full max-w-4xl h-full max-h-[90vh] rounded-lg shadow-2xl flex flex-col md:flex-row overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- Columna de la Imagen (Solo para Desktop) -- */}
        <div className="hidden md:block md:w-1/3 flex-shrink-0 bg-gray-800">
          <img 
            className="w-full h-full object-cover"
            src={instructor.imageUrl}
            alt={`Foto de ${instructor.name}`}
            style={instructor.imgStyle}
          />
        </div>

        {/* --- Columna de Contenido (con scroll y altura flexible) -- */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="p-4 md:p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-accent-orange/50 scrollbar-track-transparent">
            
            {/* --- Encabezado para Móvil --- */}
            <div className="md:hidden flex items-center gap-4 mb-6">
              <img 
                className="w-20 h-20 rounded-full object-cover border-2 border-accent-orange flex-shrink-0"
                src={instructor.imageUrl}
                alt={instructor.name}
                style={instructor.imgStyle}
              />
              <div>
                <h2 className="text-2xl font-bold text-white">{instructor.name}</h2>
                <p className="text-md text-accent-blue font-semibold">{instructor.title}</p>
              </div>
            </div>

            {/* --- Encabezado para Desktop --- */}
            <div className="hidden md:block">
              <h2 className="text-4xl font-bold text-white mb-2">{instructor.name}</h2>
              <p className="text-lg text-accent-blue font-semibold mb-4">{instructor.title}</p>
            </div>
            
            {instructor.quote && (
              <blockquote className="border-l-4 border-accent-orange pl-4 italic text-gray-300 mb-8 text-sm md:text-base">
                {instructor.quote}
              </blockquote>
            )}

            {/* --- Cursos Impartidos --- */}
            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Cursos que imparte</h3>
            {instructorCourses.length > 0 ? (
              <ul className="space-y-3">
                {instructorCourses.map(course => (
                  <li key={course.slug} className="flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
                    <div className="flex-1 min-w-0 mr-3">
                      <p className="font-bold text-white text-sm truncate">{course.title}</p>
                      <p className="text-xs text-gray-400">{course.type}</p>
                    </div>
                    <Link 
                      to={`/cursos/${course.slug}`}
                      onClick={onClose}
                      className="flex-shrink-0 flex items-center gap-2 bg-accent-orange text-white font-bold py-2 px-3 rounded-lg hover:bg-orange-500 transition-colors whitespace-nowrap text-xs"
                    >
                      <BookOpenIcon className="w-4 h-4" />
                      Ver Detalles
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm">Actualmente no hay cursos programados para este instructor.</p>
            )}
          </div>
        </div>
      </div>

      {/* --- Botón de Cerrar --- */}
      <button 
        onClick={onClose} 
        className="absolute top-2 right-2 md:top-4 md:right-4 text-white/70 hover:text-white transition-colors z-[1101]"
        aria-label="Cerrar modal"
      >
        <XMarkIcon className="w-8 h-8" />
      </button>
    </div>
  );
}