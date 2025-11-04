// FILE: src/data/courses.tsx
import type { ReactNode } from 'react';
import {
  CalendarDaysIcon,
  UsersIcon,
  MicrophoneIcon,
  ChatBubbleBottomCenterTextIcon,
  MegaphoneIcon,
  SpeakerWaveIcon,
  PresentationChartLineIcon,
  BookOpenIcon, 
} from '@heroicons/react/24/outline';

// La interfaz del instructor ahora se importa desde el archivo unificado
// import type { Instructor } from '@/data/instructors';

export interface Course {
  slug: string;
  title: string;
  displayTitle?: string; // Título corto para mostrar en tarjetas
  shortDescription: string;
  longDescription: string;
  price: number;
  currency: 'EUR';
  icon: ReactNode;
  startDate?: Date;
  featured?: boolean;
  details?: {
    icon: ReactNode;
    label: string;
    value: string;
  }[];
  syllabus: {
    title: string;
    description: string;
  }[];
  // CAMBIO: Ahora es un array de strings (slugs de instructores)
  instructorSlugs: string[]; 
  type: 'Presencial' | 'Online';
}

/**
 * Parsea una cadena de fecha en español (ej: "NOVIEMBRE: 4, 5 Y 6") a un objeto Date.
 * Toma el primer día mencionado. Asume el año 2025.
 * @param dateString La cadena de texto con la fecha.
 * @returns Un objeto Date.
 */
const parseCourseDate = (dateString: string): Date => {
  const monthMap: { [key: string]: number } = {
    'ENERO': 0, 'FEBRERO': 1, 'MARZO': 2, 'ABRIL': 3, 'MAYO': 4, 'JUNIO': 5,
    'JULIO': 6, 'AGOSTO': 7, 'SEPTIEMBRE': 8, 'OCTUBRE': 9, 'NOVIEMBRE': 10, 'DICIEMBRE': 11
  };

  const parts = dateString.toUpperCase().split(':');
  const monthName = parts[0].trim();
  const month = monthMap[monthName];
  
  // Extraer el primer número que aparezca (el primer día)
  const dayMatch = parts[1].match(/\d+/);
  const day = dayMatch ? parseInt(dayMatch[0], 10) : 1;

  // Asumimos el año 2025
  return new Date(2025, month, day);
};


export const courses: Course[] = [];
