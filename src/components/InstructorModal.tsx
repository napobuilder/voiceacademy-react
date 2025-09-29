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
      className="fixed inset-0 bg-black/80 z-[1100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-[1101]"
        aria-label="Cerrar modal"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
      
      <div 
        className="relative animate-slide-up w-auto h-auto max-w-[80vw] max-h-[80vh]"
        onClick={(e) => e.stopPropagation()} // Evita que el clic dentro de la imagen la cierre
      >
        <img 
          className="w-full h-full object-contain rounded-lg shadow-2xl"
          src={instructor.imgSrc}
          alt={`Foto de ${instructor.name}`}
        />
      </div>
    </div>
  );
}
