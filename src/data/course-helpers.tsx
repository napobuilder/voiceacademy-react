// FILE: src/data/course-helpers.ts
import type { ReactNode } from 'react';
import {
  MicrophoneIcon,
  PresentationChartLineIcon,
  MegaphoneIcon,
  SpeakerWaveIcon,
  ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/24/outline';
import type { Database } from './supabase.types';
import type { Course } from './courses'; // Import the single source of truth

// La interfaz de curso que usan los componentes de React
// DELETED the duplicate interface

// Tipo para un curso como viene de la DB de Supabase
type DbCourse = Database['public']['Tables']['courses']['Row'];

// Mapa de nombres de íconos a COMPONENTES de React (no elementos)
// Esto es más seguro y evita errores de renderizado fuera de React.
const iconMap: { [key: string]: React.ElementType } = {
  MicrophoneIcon,
  PresentationChartLineIcon,
  MegaphoneIcon,
  SpeakerWaveIcon,
  ChatBubbleBottomCenterTextIcon,
};

// Función para transformar los datos de la DB al formato que esperan los componentes
export const transformDbCourseToCourse = (dbCourse: DbCourse): Course => {
  const IconComponent = dbCourse.icon_name ? iconMap[dbCourse.icon_name] : null;

  return {
    slug: dbCourse.slug,
    title: dbCourse.title,
    displayTitle: dbCourse.display_title || undefined,
    shortDescription: dbCourse.short_description || '',
    longDescription: dbCourse.long_description || '',
    price: dbCourse.price,
    currency: 'EUR', // CORRECTED to EUR
    // El elemento se crea aquí, dentro de la lógica de renderizado, no en el nivel superior.
    icon: IconComponent ? <IconComponent className="w-9 h-9" /> : null,
    startDate: dbCourse.start_date ? new Date(dbCourse.start_date) : undefined,
    featured: dbCourse.featured || false,
    details: (dbCourse.details as any[]) || [],
    syllabus: (dbCourse.syllabus as any[]) || [],
    instructorSlugs: dbCourse.instructor_slugs || [],
    type: dbCourse.type === 'presencial' ? 'Presencial' : 'Online',
  };
};
