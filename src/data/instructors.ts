// FILE: src/data/instructors.ts
import type { CSSProperties } from 'react';

export interface Instructor {
  slug: string;
  name: string;
  title: string;
  imageUrl: string;
  roles: ('leader' | 'instructor')[];
  quote?: string;
  imgStyle?: CSSProperties;
}

export const instructors: Instructor[] = [
  {
    slug: 'abelardo-oseches',
    name: 'Abelardo Oseches',
    title: 'CEO y Director Académico',
    imageUrl: '/assets/abelardo-oseche.jpg',
    roles: ['leader', 'instructor'],
    quote: 'Vi a demasiados artistas estancarse por falta de un método. Mi misión es darte las herramientas no sólo para dominar su voz, sino para construir una carrera.',
    imgStyle: { objectPosition: '50% 40%' },
  },
  {
    slug: 'zayanit-lamas',
    name: 'Zayanit Lamas',
    title: 'Coordinadora de Diseño y Atención',
    imageUrl: '/assets/zayanit-lamas.jpg',
    roles: ['leader'],
    quote: 'Mi tarea es hacer que todos nuestros alumnos y clientes se sientan en casa, mostrando la mejor cara de Voice en cada detalle.',
    imgStyle: { objectPosition: '50% 40%' },
  },
  {
    slug: 'ali-rondon',
    name: 'Alí Rondón',
    title: 'Instructor de Canto',
    imageUrl: '/assets/fotos-voiceacademy/Alí Rondón.jpg',
    roles: ['instructor'],
  },
  {
    slug: 'charlot-prince',
    name: 'Charlot Prince',
    title: 'Instructora de Doblaje',
    imageUrl: '/assets/fotos-voiceacademy/Charlot Prince.jpg',
    roles: ['instructor'],
  },
  {
    slug: 'felix-ptolo',
    name: 'Félix Ptolo',
    title: 'Instructor de Oratoria',
    imageUrl: '/assets/fotos-voiceacademy/Félix Ptolo.jpg',
    roles: ['instructor'],
  },
  {
    slug: 'henrique-palacios',
    name: 'Henrique Palacios',
    title: 'Instructor de Doblaje',
    imageUrl: '/assets/fotos-voiceacademy/Henrique Palacios.jpg',
    roles: ['instructor'],
  },
  {
    slug: 'hernan-rodriguez',
    name: 'Hernan Rodriguez',
    title: 'Instructor de Narración',
    imageUrl: '/assets/fotos-voiceacademy/Hernan Rodriguez2.png',
    roles: ['instructor'],
  },
  {
    slug: 'jesus-conde',
    name: 'Jesús Conde',
    title: 'Instructor de Locución',
    imageUrl: '/assets/fotos-voiceacademy/Jesús Conde.jpg',
    roles: ['instructor'],
  },
  {
    slug: 'jose-antonio-castillo',
    name: 'José Antonio Castillo',
    title: 'Instructor de Locución',
    imageUrl: '/assets/fotos-voiceacademy/José Antonio Castillo.jpg',
    roles: ['instructor'],
  },
  {
    slug: 'jose-gomez-chompre',
    name: 'José Gomez Chompré',
    title: 'Instructor de Doblaje',
    imageUrl: '/assets/fotos-voiceacademy/José Gomez Chompré.jpg',
    roles: ['instructor'],
  },
  {
    slug: 'mariangelica-aumaitre',
    name: 'Mariangélica Aumaitre',
    title: 'Instructora de Locución',
    imageUrl: '/assets/fotos-voiceacademy/Mariangelica-Aumaitre-perfil.jpg',
    roles: ['instructor'],
  },
  {
    slug: 'maritza-rojas',
    name: 'Maritza Rojas',
    title: 'Instructora de Doblaje',
    imageUrl: '/assets/fotos-voiceacademy/Maritza Rojas.jpg',
    roles: ['instructor'],
  },
  {
    slug: 'mila-capote',
    name: 'Mila Capote',
    title: 'Instructora',
    imageUrl: '/assets/fotos-voiceacademy/Mila Capote.png',
    roles: ['instructor'],
  }
];

// --- Funciones de ayuda para acceder a los datos ---

/**
 * Devuelve todos los instructores.
 */
export const getAllInstructors = () => instructors;

/**
 * Devuelve solo los instructores principales (líderes).
 */
export const getLeaders = () => instructors.filter(i => i.roles.includes('leader'));

/**
 * Devuelve todos los que son instructores, para la galería.
 */
export const getGalleryInstructors = () => instructors.filter(i => i.roles.includes('instructor'));

/**
 * Busca un instructor por su slug.
 * @param slug El slug del instructor a buscar.
 * @returns El objeto del instructor o undefined si no se encuentra.
 */
export const getInstructorBySlug = (slug: string) => {
  return instructors.find(instructor => instructor.slug === slug);
};