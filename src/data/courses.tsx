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

export const courses: Course[] = [
  // --- Cursos Presenciales ---
  {
    slug: 'acento-neutro-sabatino-presencial',
    title: "Acento Neutro (Sabatino)",
    shortDescription: "Deslocaliza tu acento y logra una comunicación de alcance internacional. Te enseñamos un método único para aplicarlo en locución, doblaje y oratoria.",
    longDescription: "Este entrenamiento intensivo y efectivo, se basa en un método propio que te enseña a deslocalizar tu acento natal. Te enseñamos sus distintas aplicaciones para la oratoria, la locución, el doblaje y para la comunicación en general. No vas a creer como cambia tu forma de comunicar cuando deslocalizas y neutralizas tu acento.",
    price: 50,
    currency: 'EUR',
    icon: <MicrophoneIcon className="w-9 h-9 text-secondary-bg" />,
    startDate: new Date('2025-10-04T09:00:00Z'), 
    featured: true,
    details: [
      { icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />, label: 'Horario', value: 'Sáb. 4 y 11 de Oct. | 9am-4pm' },
      { icon: <UsersIcon className="w-6 h-6 text-texto-secundario" />, label: 'Cupos', value: 'Grupos reducidos' },
    ],
    syllabus: [
      { title: 'Características del Acento Neutro', description: 'Definición, musicalidad y diferencias clave.' },
      { title: 'Ritmo, Melodía y Cadencia', description: 'Ejercicios para dominar la prosodia del español neutro.' },
      { title: 'Usos y Aplicaciones', description: 'Prácticas en narración, doblaje y locución comercial.' },
    ],
    instructorSlugs: ['abelardo-oseches'],
    type: 'Presencial',
  },
    {
      slug: 'oratoria-semanal-presencial',
      title: "Oratoria (Entre semana)",
      shortDescription: "La oratoria moderna, la que se basa en la comunicación efectiva, en la estructura de mensajes orientados a impactar.",
      longDescription: "La oratoria moderna, la que se basa en la comunicación efectiva, en la estructura de mensajes orientados a impactar mediante herramientas como el storytelling, la naturalidad y el sentido orgánico de la expresión, pero trabajada con técnicas y herramientas para hacerlo bien, que suene bien y que se vea bien. No hay comunicación sin autenticidad y eso es lo que te enseñamos aquí.",
      price: 50,
      currency: 'EUR',
      icon: <PresentationChartLineIcon className="w-9 h-9 text-secondary-bg" />,
      startDate: new Date('2025-10-07T13:00:00Z'),
      details: [
        { icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />, label: 'Horario', value: 'Mar 7 a Vie 10 de Oct. | 1pm-4pm' },
        { icon: <UsersIcon className="w-6 h-6 text-texto-secundario" />, label: 'Cupos', value: 'Grupos reducidos' },
      ],
      syllabus: [
          { title: 'Manejo del Miedo Escénico', description: 'Técnicas para controlar la ansiedad y proyectar confianza.' },
          { title: 'Comunicación Efectiva', description: 'Cómo estructurar una presentación y comunicar con impacto.' },
          { title: 'Lenguaje Corporal y Gestual', description: 'Uso del lenguaje no verbal como elemento de comunicación.' },
      ],
      instructorSlugs: ['felix-ptolo'],
      type: 'Presencial',
    },
  {
    slug: 'locucion-comercial-integral-presencial',
    title: "Locución Comercial Integral",
    shortDescription: "Un programa completo que abarca desde la locución comercial y corporativa hasta la locución de promociones para Radio y TV.",
    longDescription: "Un programa integral que te convertirá en un locutor todo terreno. Aprenderás a decodificar textos, manejar diferentes estilos e intenciones, y entender el nuevo rol del locutor en la industria. Con prácticas en cabina y dirección personalizada de dos de nuestros mejores instructores.",
    price: 170,
    currency: 'EUR',
    icon: <MegaphoneIcon className="w-9 h-9 text-secondary-bg" />,
    startDate: new Date('2025-10-14T13:00:00Z'),
    featured: true,
    details: [
      { icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />, label: 'Horario', value: 'Mar 14 a Vie 31 de Oct. | 1pm-4pm' },
      { icon: <UsersIcon className="w-6 h-6 text-texto-secundario" />, label: 'Cupos', value: 'Grupos reducidos' },
    ],
    syllabus: [
        { title: 'Módulo 1: Locución Comercial', description: 'Análisis de texto, intención, estilos y prácticas con guiones reales.' },
        { title: 'Módulo 2: Promociones para Radio y TV', description: 'Técnicas para IDs, promos y liners.' },
        { title: 'Módulo 3: Locución Corporativa', description: 'El tono institucional, e-learning y narración para videos.' },
    ],
    instructorSlugs: ['abelardo-oseches', 'jesus-conde'],
    type: 'Presencial',
  },
  {
    slug: 'doblaje-integral-presencial',
    title: "Doblaje Integral",
    shortDescription: "Un programa intensivo que te lleva desde los fundamentos del doblaje hasta técnicas avanzadas en reality shows, documentales y animados.",
    longDescription: "Este es el programa más completo de doblaje. En cuatro módulos intensivos, aprenderás los fundamentos de la sincronización y la actuación vocal, para luego especializarte en los géneros más demandados: reality shows, documentales y dibujos animados. Un curso impartido por tres de las voces más experimentadas de la industria.",
    price: 170,
    currency: 'EUR',
    icon: <SpeakerWaveIcon className="w-9 h-9 text-secondary-bg" />,
    startDate: new Date('2025-10-21T13:00:00Z'),
    details: [
      { icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />, label: 'Horario', value: 'Oct 21 a Nov 14 | 1pm-4pm' },
      { icon: <UsersIcon className="w-6 h-6 text-texto-secundario" />, label: 'Cupos', value: 'Grupos reducidos' },
    ],
    syllabus: [
        { title: 'Módulo 1: Acento Neutro', description: 'Instructor: Abelardo Oseches' },
        { title: 'Módulo 2: Dibujos Animados', description: 'Instructor: José Gómez Chompré' },
        { title: 'Módulo 3: Reality y Live Action', description: 'Instructora: Mariangélica Aumaitre' },
        { title: 'Módulo 4: Narración para Documentales', description: 'Instructor: Abelardo Oseches' },
    ],
    instructorSlugs: ['abelardo-oseches', 'jose-gomez-chompre', 'mariangelica-aumaitre'],
    type: 'Presencial',
  },
  {
      slug: 'doblaje-basico-sabatino-presencial',
      title: "Doblaje Básico (Sabatino)",
      shortDescription: "Vive una experiencia inmersiva en el mundo del doblaje, entrenando tu capacidad interpretativa y manejando el lip sync.",
      longDescription: "Vive una experiencia inmersiva en el mundo del doblaje, entrenando tu capacidad interpretativa, manejando y controlando tonos, matices, ritmos e intenciones, aprende a manejar el lip sync y otras herramientas para que vivas la experiencia real de ponerle tu voz a personajes de series reales o dibujos animados. Prácticas dirigidas y ejercicios reales.",
      price: 50,
      currency: 'EUR',
      icon: <SpeakerWaveIcon className="w-9 h-9 text-secondary-bg" />,
      startDate: new Date('2025-10-04T09:00:00Z'),
      details: [
        { icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />, label: 'Horario', value: 'Sáb. 4 y 11 de Oct. | 9am-4pm' },
        { icon: <UsersIcon className="w-6 h-6 text-texto-secundario" />, label: 'Cupos', value: 'Grupos reducidos' },
      ],
      syllabus: [
        { title: 'Respiración y Manejo del Aire', description: 'Técnicas fundamentales para el control de la voz.' },
        { title: 'Entonación y Articulación', description: 'Modulación de la voz y ejercicios para una pronunciación clara.' },
        { title: 'Acento Neutro Internacional', description: 'Estándares para doblaje y locución de alcance global.' },
        { title: 'Manejo de Intenciones', description: 'Interpretación y transmisión de la emoción del personaje.' },
      ],
      instructorSlugs: ['jose-gomez-chompre'],
      type: 'Presencial',
    },
  {
    slug: 'doblaje-basico-semanal-presencial',
    title: "Doblaje Básico (Entre semana)",
    shortDescription: "Vive una experiencia inmersiva en el mundo del doblaje, entrenando tu capacidad interpretativa y manejando el lip sync.",
    longDescription: "Vive una experiencia inmersiva en el mundo del doblaje, entrenando tu capacidad interpretativa, manejando y controlando tonos, matices, ritmos e intenciones, aprende a manejar el lip sync y otras herramientas para que vivas la experiencia real de ponerle tu voz a personajes de series reales o dibujos animados. Prácticas dirigidas y ejercicios reales.",
    price: 50,
    currency: 'EUR',
    icon: <SpeakerWaveIcon className="w-9 h-9 text-secondary-bg" />,
    startDate: new Date('2025-10-14T13:00:00Z'),
    details: [
      { icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />, label: 'Horario', value: 'Mar 14 a Vie 17 de Oct. | 1pm-4pm' },
      { icon: <UsersIcon className="w-6 h-6 text-texto-secundario" />, label: 'Cupos', value: 'Grupos reducidos' },
    ],
    syllabus: [
      { title: 'Respiración y Manejo del Aire', description: 'Técnicas fundamentales para el control de la voz y el soporte del diafragmas.' },
      { title: 'Entonación y Articulación', description: 'Modulación de la voz y ejercicios para una pronunciación clara y precisa.' },
      { title: 'Acento Neutro Internacional', description: 'Estándares para doblaje y locución de alcance global.' },
      { title: 'Proyección de la Voz', description: 'Cómo hacer que tu voz se escuche con claridad sin forzarla.' },
      { title: 'Manejo de Intenciones', description: 'Interpretación y transmisión de la emoción y el propósito del personaje.' },
      { title: 'Ejercicios Prácticos Dirigidos', description: 'Prácticas en atril con escenas reales y feedback personalizado.' },
    ],
    instructorSlugs: ['jose-gomez-chompre'],
    type: 'Presencial',
  },
  {
    slug: 'oratoria-sabatino-presencial',
    title: "Oratoria (Sabatino)",
    shortDescription: "La oratoria moderna, la que se basa en la comunicación efectiva, en la estructura de mensajes orientados a impactar.",
    longDescription: "La oratoria moderna, la que se basa en la comunicación efectiva, en la estructura de mensajes orientados a impactar mediante herramientas como el storytelling, la naturalidad y el sentido orgánico de la expresión, pero trabajada con técnicas y herramientas para hacerlo bien, que suene bien y que se vea bien. No hay comunicación sin autenticidad y eso es lo que te enseñamos aquí.",
    price: 50,
    currency: 'EUR',
    icon: <PresentationChartLineIcon className="w-9 h-9 text-secondary-bg" />,
    startDate: new Date('2025-10-18T09:00:00Z'),
    details: [
      { icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />, label: 'Horario', value: 'Sáb. 18 y 25 de Oct. | 9am-4pm' },
      { icon: <UsersIcon className="w-6 h-6 text-texto-secundario" />, label: 'Cupos', value: 'Grupos reducidos' },
    ],
    syllabus: [
        { title: 'Manejo del Miedo Escénico', description: 'Técnicas para controlar la ansiedad y proyectar confianza.' },
        { title: 'Comunicación Efectiva', description: 'Cómo estructurar una presentación y comunicar con impacto.' },
        { title: 'Lenguaje Corporal y Gestual', description: 'Uso del lenguaje no verbal como elemento de comunicación.' },
        { title: 'Ejercicios Prácticos', description: 'Prácticas personalizadas con feedback para pulir tus habilidades.' },
    ],
    instructorSlugs: ['felix-ptolo'],
    type: 'Presencial',
  },
  {
    slug: 'diccion-perfecta-sabatino-presencial',
    title: "Dicción Perfecta (Sabatino)",
    shortDescription: "Deja de usar el lápiz creyendo que vas a corregir tus problemas de pronunciación. Aquí te enseñamos un método único.",
    longDescription: "Aquí te enseñamos un método único que se basa en la mecánica de los fonemas y en el componente auditivo de la dicción, para que tu pronunciación vaya de 0 a 100 en simples pasos. 100% práctico, interactivo y con resultados sorprendentes.",
    price: 50,
    currency: 'EUR',
    icon: <ChatBubbleBottomCenterTextIcon className="w-9 h-9 text-secondary-bg" />,
    startDate: new Date('2025-10-18T09:00:00Z'),
    featured: true,
    details: [
      { icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />, label: 'Horario', value: 'Sáb. 18 y 25 de Oct. | 9am-4pm' },
      { icon: <UsersIcon className="w-6 h-6 text-texto-secundario" />, label: 'Cupos', value: 'Grupos reducidos' },
    ],
    syllabus: [
        { title: 'Mecánica de la Dicción', description: 'Entendimiento profundo de los órganos y puntos articulatorios.' },
        { title: 'Articulación de Fonemas', description: 'Ejercicios específicos para cada fonema del español.' },
        { title: 'Ejercicios Prácticos Dirigidos', description: 'Prácticas de lectura y conversación con corrección en vivo.' },
    ],
    instructorSlugs: ['abelardo-oseches'],
    type: 'Presencial',
  },
  {
    slug: 'voces-animados-sabatino-presencial',
    title: "Voces para Dibujos Animados|(Sabatino)",
    shortDescription: "El doblaje de animados no es imitar voces; la caracterización es un arte y se basa en técnica.",
    longDescription: "Aprende a manejar tu voz, a colocarla, a usar tus resonadores para convertirla en aguda o en grave según las características de tu personaje. Te enseñamos a combinar esas habilidades con la interpretación a través de técnicas divertidas, inmersivas y 100% prácticas.",
    price: 50,
    currency: 'EUR',
    icon: <MicrophoneIcon className="w-9 h-9 text-secondary-bg" />,
    startDate: new Date('2025-10-18T09:00:00Z'),
    details: [
      { icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />, label: 'Horario', value: 'Sáb. 18 y 25 de Oct. | 9am-4pm' },
      { icon: <UsersIcon className="w-6 h-6 text-texto-secundario" />, label: 'Cupos', value: 'Grupos reducidos' },
    ],
    syllabus: [
        { title: 'Intención e interpretación', description: 'Aprende a transmitir emociones y dar vida a los personajes.' },
        { title: 'Caracterización de voces', description: 'Técnicas para crear voces únicas y memorables.' },
        { title: 'Cómo crear voces originales', description: 'Explora tu registro vocal para desarrollar un repertorio de personajes.' },
        { title: 'Manejo del ritmo', description: 'La importancia del timing en la comedia y la acción.' },
        { title: 'Sincro', description: 'Técnicas de sincronización de labios para un doblaje perfecto.' },
        { title: 'Manejo del libreto', description: 'Cómo interpretar y adaptar el guion original.' },
        { title: 'Ejercicios prácticos y dirigidos', description: 'Práctica constante con feedback de tu instructor.' },
    ],
    instructorSlugs: ['jose-gomez-chompre'],
    type: 'Presencial',
  },
  {
    slug: 'narracion-documentales-semanal-presencial',
    title: "Narración para Documentales (Entre semana)",
    shortDescription: "Aprende a contar historias que cautivan. Domina el arte de la narración para documentales, desde el tono y el ritmo hasta el storytelling.",
    longDescription: "Este curso te sumerge en el mundo de la narración de documentales. Aprenderás a analizar guiones, a encontrar el tono adecuado para cada historia y a utilizar tu voz como una herramienta poderosa para informar y emocionar. Con prácticas intensivas y la guía de un experto en el área.",
    price: 50,
    currency: 'EUR',
    icon: <ChatBubbleBottomCenterTextIcon className="w-9 h-9 text-secondary-bg" />,
    startDate: new Date('2025-10-21T09:00:00Z'),
    details: [
      { icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />, label: 'Horario', value: 'Mar 21 a Vie 24 de Oct. | 9am-12m' },
      { icon: <UsersIcon className="w-6 h-6 text-texto-secundario" />, label: 'Cupos', value: 'Grupos reducidos' },
    ],
    syllabus: [
        { title: 'Características de la narración', description: 'Tono, ritmo, melodía y cadencia para contar historias.' },
        { title: 'Articulación y Proyección', description: 'Técnicas para una voz clara y con presencia.' },
        { title: 'Intención y Storytelling', description: 'El arte de contar historias para informar y emocionar.' },
        { title: 'Acento Neutro en Narración', description: 'Aplicación del acento neutro para audiencias internacionales.' },
        { title: 'Ejercicios Prácticos Grabados', description: 'Práctica intensiva con guiones reales y feedback personalizado.' },
    ],
    instructorSlugs: ['abelardo-oseches'],
    type: 'Presencial',
  },

  // --- Cursos Online ---
  {
    slug: 'diccion-perfecta-online',
    title: "Dicción Perfecta",
    shortDescription: "Corrige tus problemas de pronunciación con un método único basado en la mecánica de los fonemas.",
    longDescription: "Deja de usar el lápiz creyendo que vas a corregir tus problemas de pronunciación. Aquí te enseñamos un método único que se basa en la mecánica de los fonemas y en el componente auditivo de la dicción, para que tu pronunciación vaya de 0 a 100 en 4 simples pasos. 100% práctico, interactivo y con resultados sorprendentes.",
    price: 45,
    currency: 'EUR',
    icon: <ChatBubbleBottomCenterTextIcon className="w-9 h-9 text-accent-blue" />,
    startDate: new Date('2025-09-30T20:00:00Z'),
    featured: true,
    details: [
      { icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />, label: 'Horario', value: 'Sep 30, Oct 1 y 2 | 8:00pm - 9:30pm' },
      { icon: <UsersIcon className="w-6 h-6 text-texto-secundario" />, label: 'Cupos', value: 'Grupos reducidos' },
    ],
    syllabus: [
        { title: 'Mecánica de la Dicción', description: 'Conocimiento de los órganos y puntos articulatorios.' },
        { title: 'Fonemas y Articulación', description: 'Puntos articulatorios de cada fonema.' },
        { title: 'Ejercicios Prácticos', description: 'Ejercicios prácticos y dirigidos para la corrección.' },
    ],
    instructorSlugs: ['abelardo-oseches'],
    type: 'Online',
  },
  {
    slug: 'oratoria-online',
    title: "Oratoria",
    shortDescription: "La oratoria moderna basada en la comunicación efectiva, la estructura de mensajes y el storytelling para impactar con naturalidad y autenticidad.",
    longDescription: "La oratoria moderna, la que se basa en la comunicación efectiva, en la estructura de mensajes orientados a impactar mediante herramientas como el storytelling, la naturalidad y el sentido orgánico de la expresión, pero trabajada con técnicas y herramientas para hacerlo bien, que suene bien y que se vea bien. No hay comunicación sin autenticidad y eso es lo que te enseñamos aquí.",
    price: 45,
    currency: 'EUR',
    icon: <PresentationChartLineIcon className="w-9 h-9 text-accent-blue" />,
    startDate: new Date('2025-10-14T20:00:00Z'),
    featured: true,
    details: [
      { icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />, label: 'Horario', value: 'Octubre 14, 15 y 16 | 8:00pm - 9:30pm' },
      { icon: <UsersIcon className="w-6 h-6 text-texto-secundario" />, label: 'Cupos', value: 'Grupos reducidos' },
    ],
    syllabus: [
        { title: 'Confianza y Miedo Escénico', description: 'Manejo del miedo escénico y desarrollo de la autoconfianza.' },
        { title: 'Discurso y Comunicación', description: 'Elementos del discurso, y cómo comunicar y presentar eficazmente.' },
        { title: 'Lenguaje No Verbal', description: 'El lenguaje corporal y gestual como elemento de comunicación.' },
    ],
    instructorSlugs: ['felix-ptolo'],
    type: 'Online',
  },
  {
    slug: 'promociones-radio-tv-online',
    title: "Promociones para Radio y TV",
    shortDescription: "Aprende a grabar promociones para radio y TV, manejando la intención, el ritmo y los diferentes estilos que demanda el medio.",
    longDescription: "Un curso intensivo para dominar el arte de las promociones. Aprenderás a manejar la entonación, el ritmo y las intenciones específicas para identificar emisoras de radio, canales de TV y grabar promociones de alto impacto. Con ejercicios prácticos y dirigidos por un experto.",
    price: 45,
    currency: 'EUR',
    icon: <MegaphoneIcon className="w-9 h-9 text-accent-blue" />,
    startDate: new Date('2025-10-21T20:00:00Z'),
    featured: true,
    details: [
      { icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />, label: 'Horario', value: 'Octubre 21, 22 y 23 | 8:00pm - 9:30pm' },
      { icon: <UsersIcon className="w-6 h-6 text-texto-secundario" />, label: 'Cupos', value: 'Grupos reducidos' },
    ],
    syllabus: [
        { title: 'Técnica Vocal', description: 'Entonación, articulación, dicción y manejo del acento neutro.' },
        { title: 'Intención y Ritmo', description: 'Cómo abordar los diferentes tipos de promociones (IDs, liners, promos).' },
        { title: 'Prácticas Dirigidas', description: 'Ejercicios prácticos y feedback con material real de radio y TV.' },
    ],
    instructorSlugs: ['jose-antonio-castillo'],
    type: 'Online',
  },
  {
    slug: 'doblaje-basico-online',
    title: "Doblaje Básico",
    shortDescription: "Una experiencia inmersiva en el doblaje, entrenando tu capacidad interpretativa, manejando tonos, matices, ritmos, intenciones y lip sync.",
    longDescription: "Vive una experiencia inmersiva en el mundo del doblaje, entrenando tu capacidad interpretativa, manejando y controlando tonos, matices, ritmos e intenciones, aprende a manejar el lip sync y otras herramientas para que vivas la experiencia real de ponerle tu voz a personajes de series reales o dibujos animados. Prácticas dirigidas y ejercicios reales.",
    price: 45,
    currency: 'EUR',
    icon: <MicrophoneIcon className="w-9 h-9 text-accent-blue" />,
    startDate: new Date('2025-10-07T20:00:00Z'),
    featured: true,
    details: [
      { icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />, label: 'Horario', value: 'Octubre 7, 8 y 9 | 8:00pm - 9:30pm' },
      { icon: <UsersIcon className="w-6 h-6 text-texto-secundario" />, label: 'Cupos', value: 'Grupos reducidos' },
    ],
    syllabus: [
      { title: 'Fundamentos', description: 'Respiración, manejo del aire, entonación, articulación y dicción.' },
      { title: 'La Voz en el Doblaje', description: 'Manejo y proyección de la voz, y aplicación del acento neutro internacional.' },
      { title: 'Interpretación', description: 'Manejo de intenciones y creación de personajes.' },
      { title: 'Práctica Dirigida', description: 'Ejercicios prácticos con feedback personalizado.' },
    ],
    instructorSlugs: ['jose-gomez-chompre'],
    type: 'Online',
  },
  {
    slug: 'narracion-documentales-online',
    title: "Narración para Documentales",
    shortDescription: "Aprende a contar historias que cautivan. Domina el arte de la narración para documentales, desde el tono y el ritmo hasta el storytelling.",
    longDescription: "Este curso te sumerge en el mundo de la narración de documentales. Aprenderás a analizar guiones, a encontrar el tono adecuado para cada historia y a utilizar tu voz como una herramienta poderosa para informar y emocionar. Con prácticas intensivas y la guía de un experto en el área.",
    price: 45,
    currency: 'EUR',
    icon: <ChatBubbleBottomCenterTextIcon className="w-9 h-9 text-accent-blue" />,
    startDate: new Date('2025-10-28T20:00:00Z'),
    featured: true,
    details: [
      { icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />, label: 'Horario', value: 'Octubre 28, 29 y 30 | 8:00pm - 9:30pm' },
      { icon: <UsersIcon className="w-6 h-6 text-texto-secundario" />, label: 'Cupos', value: 'Grupos reducidos' },
    ],
    syllabus: [
        { title: 'Características de la narración', description: 'Tono, ritmo, melodía y cadencia para contar historias.' },
        { title: 'Técnica Vocal Aplicada', description: 'Articulación, proyección y uso del acento neutro en narración.' },
        { title: 'Prácticas Grabadas', description: 'Ejercicios prácticos con guiones reales y feedback personalizado.' },
    ],
    instructorSlugs: ['abelardo-oseches'],
    type: 'Online',
  },
  {
    slug: 'locucion-acting-audiolibros-online',
    title: "Locución y Acting para Audiolibros",
    shortDescription: "Desarrolla tu capacidad interpretativa y aprende a dar vida a las historias con tu voz. Un curso enfocado en las técnicas de actuación y narración para audiolibros.",
    longDescription: "Sumérgete en el creciente mundo de los audiolibros. Este curso te proporcionará las herramientas para manejar tu voz, caracterizar personajes y dominar las intenciones y ritmos narrativos. A través de ejercicios prácticos, aprenderás a interpretar textos y a cautivar a la audiencia.",
    price: 45,
    currency: 'EUR',
    icon: <SpeakerWaveIcon className="w-9 h-9 text-accent-blue" />,
    startDate: new Date('2025-12-03T20:00:00Z'),
    featured: true,
    details: [
      { icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />, label: 'Horario', value: 'Diciembre 3, 4 y 5 | 8:00pm - 9:30pm' },
      { icon: <UsersIcon className="w-6 h-6 text-texto-secundario" />, label: 'Cupos', value: 'Grupos reducidos' },
    ],
    syllabus: [
        { title: 'Actuación y Caracterización', description: 'Desarrollo de técnicas de actuación y herramientas para caracterizar personajes.' },
        { title: 'Manejo de la Voz', description: 'Control de la voz, intenciones narrativas, ritmos e inflexiones.' },
        { title: 'Prácticas Dirigidas', description: 'Ejercicios prácticos y dirigidos con interpretación de textos.' },
    ],
    instructorSlugs: ['charlot-prince'],
    type: 'Online',
  },
];