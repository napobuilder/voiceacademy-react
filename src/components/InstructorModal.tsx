// FILE: src/components/InstructorModal.tsx
import type { Instructor } from '@/data/instructors';

interface InstructorModalProps {
  instructor: Instructor | null;
  onClose: () => void;
}

export function InstructorModal({ instructor, onClose }: InstructorModalProps) {
  if (!instructor) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-[1100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-auto text-center p-8 relative animate-slide-up"
        onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal lo cierre
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Cerrar modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <img 
          className="w-48 h-48 rounded-full object-cover border-4 border-accent-orange mx-auto -mt-24 mb-4"
          src={instructor.imgSrc}
          alt={`Foto de ${instructor.name}`}
          style={instructor.imgStyle}
        />
        <h3 className="text-2xl font-bold text-accent-blue mb-2">{instructor.name}</h3>
        <p className="text-texto-secundario text-left">{instructor.bio}</p>
      </div>
    </div>
  );
}
