// FILE: src/data/courses.ts
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

export interface Course {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  currency: 'USD';
  icon: ReactNode;
  details?: { // Made optional
    icon: ReactNode;
    label: string;
    value: string;
  }[];
  syllabus: {
    title: string;
    description: string;
  }[];
  instructor: {
    name: string;
    title: string;
    imageUrl: string;
  };
  type: 'Presencial' | 'Online';
}

export const courses: Course[] = [
  // --- Cursos Presenciales ---
  {
    slug: 'acento-neutro-presencial',
    title: "Acento Neutro",
    shortDescription: "Deslocaliza tu acento y logra una comunicación de alcance internacional. Te enseñamos un método único para aplicarlo en locución, doblaje y oratoria.",
    longDescription: "Este entrenamiento intensivo y efectivo, se basa en un método propio que te enseña a deslocalizar tu acento natal. Te enseñamos sus distintas aplicaciones para la oratoria, la locución, el doblaje y para la comunicación en general. No vas a creer como cambia tu forma de comunicar cuando deslocalizas y neutralizas tu acento.",
    price: 50,
    currency: 'USD',
    icon: <MicrophoneIcon className="w-9 h-9 text-secondary-bg" />,
    // Details removed as requested
    syllabus: [
      { title: 'Fundamentos', description: 'Entendiendo el aparato fonador y los puntos de articulación.' },
      { title: 'Deslocalización', description: 'Ejercicios prácticos para neutralizar el acento nativo.' },
      { title: 'Aplicaciones', description: 'Prácticas de locución comercial, doblaje y oratoria.' },
    ],
    instructor: {
      name: 'Abelardo Oseches',
      title: 'Director Académico',
      imageUrl: '/assets/abelardo-oseche.jpg'
    },
    type: 'Presencial',
  },
  {
    slug: 'diccion-perfecta-presencial',
    title: "Dicción Perfecta",
    shortDescription: "Deja de usar el lápiz creyendo que vas a corregir tus problemas de pronunciación. Aquí te enseñamos un método único.",
    longDescription: "Aquí te enseñamos un método único que se basa en la mecánica de los fonemas y en el componente auditivo de la dicción, para que tu pronunciación vaya de 0 a 100 en 4 simples pasos. 100% práctico, interactivo y con resultados sorprendentes.",
    price: 50,
    currency: 'USD',
    icon: <ChatBubbleBottomCenterTextIcon className="w-9 h-9 text-secondary-bg" />,
    details: [
      { icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />, label: 'Inicia', value: 'Mar 17 de Septiembre' },
      { icon: <UsersIcon className="w-6 h-6 text-texto-secundario" />, label: 'Cupos', value: 'Grupos reducidos' },
    ],
    syllabus: [
        { title: 'Diagnóstico', description: 'Identificación de vicios de dicción y áreas de mejora.' },
        { title: 'Mecánica Fonética', description: 'Ejercicios de articulación y modulación.' },
        { title: 'Práctica Dirigida', description: 'Lectura en voz alta con feedback personalizado.' },
    ],
    instructor: {
        name: 'Maira Rojas',
        title: 'Directora Operativa',
        imageUrl: '/assets/maira-rojas.jpg'
    },
    type: 'Presencial',
  },
  {
    slug: 'locucion-comercial-presencial',
    title: "Locución Comercial",
    shortDescription: "La disciplina más rentable del mundo profesional de la voz. Aprende a decodificar y comprender los textos y mucho más.",
    longDescription: "Aprende a decodificar y comprender los textos, herramientas para lograr diferencias estilos e intenciones comerciales, manejo de las cualidades de la voz, entiende el nuevo rol del locutor comercial, aprende las técnicas de la locución internacional en una experiencia dinámica, práctica y con dirección personalizada.",
    price: 50,
    currency: 'USD',
    icon: <MegaphoneIcon className="w-9 h-9 text-secondary-bg" />,
    details: [
      { icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />, label: 'Inicia', value: 'Mié 18 de Septiembre' },
      { icon: <UsersIcon className="w-6 h-6 text-texto-secundario" />, label: 'Cupos', value: 'Grupos reducidos' },
    ],
    syllabus: [
        { title: 'El Guión Comercial', description: 'Análisis de texto, intención y público objetivo.' },
        { title: 'Estilos y Registros', description: 'Prácticas con diferentes estilos: institucional, promocional, etc.' },
        { title: 'Grabación en Cabina', description: 'Simulación de un casting real y grabación de demo.' },
    ],
    instructor: {
        name: 'Abelardo Oseches',
        title: 'Director Académico',
        imageUrl: '/assets/abelardo-oseche.jpg'
    },
    type: 'Presencial',
  },
  {
    slug: 'doblaje-basico-presencial',
    title: "Doblaje Básico",
    shortDescription: "Vive una experiencia inmersiva en el mundo del doblaje, entrenando tu capacidad interpretativa y manejando el lip sync.",
    longDescription: "Vive una experiencia inmersiva en el mundo del doblaje, entrenando tu capacidad interpretativa, manejando y controlando tonos, matices, ritmos e intenciones, aprende a manejar el lip sync y otras herramientas para que vivas la experiencia real de ponerle tu voz a personajes de series reales o dibujos animados. Prácticas dirigidas y ejercicios reales.",
    price: 50,
    currency: 'USD',
    icon: <SpeakerWaveIcon className="w-9 h-9 text-secondary-bg" />,
    details: [
      { icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />, label: 'Inicia', value: 'Jue 19 de Septiembre' },
      { icon: <UsersIcon className="w-6 h-6 text-texto-secundario" />, label: 'Cupos', value: 'Grupos reducidos' },
    ],
    syllabus: [
        { title: 'Sincronización y Ritmo', description: 'Técnicas de lip sync y ajuste a la banda de sonido original.' },
        { title: 'Creación de Personajes', description: 'Intención, caracterización y propuesta actoral.' },
        { title: 'Práctica en Atril', description: 'Grabación de escenas de series y películas.' },
    ],
    instructor: {
        name: 'Zayanit Lamas',
        title: 'Coordinadora',
        imageUrl: '/assets/zayanit-lamas.jpg'
    },
    type: 'Presencial',
  },
  {
    slug: 'oratoria-presencial',
    title: "Oratoria",
    shortDescription: "La oratoria moderna, la que se basa en la comunicación efectiva, en la estructura de mensajes orientados a impactar.",
    longDescription: "La oratoria moderna, la que se basa en la comunicación efectiva, en la estructura de mensajes orientados a impactar mediante herramientas como el storytelling, la naturalidad y el sentido orgánico de la expresión, pero trabajada con técnicas y herramientas para hacerlo bien, que suene bien y que se vea bien. No hay comunicación sin autenticidad y eso es lo que te enseñamos aquí.",
    price: 50,
    currency: 'USD',
    icon: <PresentationChartLineIcon className="w-9 h-9 text-secondary-bg" />,
    details: [
      { icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />, label: 'Inicia', value: 'Vie 20 de Septiembre' },
      { icon: <UsersIcon className="w-6 h-6 text-texto-secundario" />, label: 'Cupos', value: 'Grupos reducidos' },
    ],
    syllabus: [
        { title: 'El Miedo Escénico', description: 'Técnicas para controlar la ansiedad y proyectar confianza.' },
        { title: 'Estructura del Discurso', description: 'Introducción, desarrollo, conclusión y storytelling.' },
        { title: 'Lenguaje No Verbal', description: 'Gestos, postura y contacto visual para reforzar tu mensaje.' },
    ],
    instructor: {
        name: 'Abelardo Oseches',
        title: 'Director Académico',
        imageUrl: '/assets/abelardo-oseche.jpg'
    },
    type: 'Presencial',
  },
  {
    slug: 'doblaje-animados-presencial',
    title: "Doblaje de Dibujos Animados",
    shortDescription: "El doblaje de animados no es imitar voces o \"hacer vocecitas\" la caracterización es un arte y se basa en técnica.",
    longDescription: "Aprende a manejar tu voz, a colocarla, a usar tus resonadores para convertirla en aguda o en grave segúnelas características de tu personaje. Te enseñamos a combinar esas habilidades con la interpretación a través de técnicas divertidas, inmersivas y 100% prácticas.",
    price: 50,
    currency: 'USD',
    icon: <MicrophoneIcon className="w-9 h-9 text-secondary-bg" />,
    details: [
      { icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />, label: 'Inicia', value: 'Sáb 21 de Septiembre' },
      { icon: <UsersIcon className="w-6 h-6 text-texto-secundario" />, label: 'Cupos', value: 'Grupos reducidos' },
    ],
    syllabus: [
        { title: 'Caracterización Vocal', description: 'Uso de resonadores, tonos y matices para crear personajes.' },
        { title: 'El Cartoon', description: 'Análisis de estilos de animación y actuación.' },
        { title: '¡A Grabar!', description: 'Práctica intensiva con personajes de series animadas.' },
    ],
    instructor: {
        name: 'Zayanit Lamas',
        title: 'Coordinadora',
        imageUrl: '/assets/zayanit-lamas.jpg'
    },
    type: 'Presencial',
  },

  // --- Cursos Online ---
  {
    slug: 'locucion-comercial-online',
    title: 'Locución Comercial',
    shortDescription: 'La disciplina más rentable del mundo profesional de la voz. Aprende a decodificar textos, diferenciar estilos e intenciones y manejar las cualidades de la voz.',
    longDescription: 'La disciplina más rentable del mundo profesional de la voz. Aprende a decodificar textos, diferenciar estilos e intenciones y manejar las cualidades de la voz. Clases en directo, interacción constante, y acceso a las grabaciones.',
    price: 50,
    currency: 'USD',
    icon: <MegaphoneIcon className="w-9 h-9 text-accent-blue" />,
    details: [
        { icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />, label: 'Fecha', value: 'Fechas disponibles' },
        { icon: <UsersIcon className="w-6 h-6 text-texto-secundario" />, label: 'Cupos', value: '7 cupos disponibles' },
    ],
    syllabus: [
        { title: 'Intención y Estilos', description: 'Aprende a diferenciar y ejecutar los principales estilos de la locución comercial.' },
        { title: 'La Voz como Instrumento', description: 'Ejercicios de modulación, ritmo y proyección.' },
        { title: 'Práctica y Demo', description: 'Grabación de piezas para tu portafolio con feedback en vivo.' },
    ],
    instructor: {
        name: 'Abelardo Oseches',
        title: 'Director Académico',
        imageUrl: '/assets/abelardo-oseche.jpg'
    },
    type: 'Online',
  },
  {
    slug: 'acento-neutro-online',
    title: 'Acento Neutro',
    shortDescription: 'Un entrenamiento intensivo y efectivo con un método propio que te enseña a deslocalizar tu acento natal y sus distintas aplicaciones para la comunicación.',
    longDescription: 'Un entrenamiento intensivo y efectivo con un método propio que te enseña a deslocalizar tu acento natal y sus distintas aplicaciones para la comunicación. Ideal para actores, locutores y profesionales que buscan un alcance internacional.',
    price: 50,
    currency: 'USD',
    icon: <MicrophoneIcon className="w-9 h-9 text-accent-blue" />,
    details: [
        { icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />, label: 'Fecha', value: 'Fechas disponibles' },
        { icon: <UsersIcon className="w-6 h-6 text-texto-secundario" />, label: 'Cupos', value: 'Cupos limitados' },
    ],
    syllabus: [
        { title: 'Fundamentos del Acento Neutro', description: 'Teoría y ejercicios iniciales de deslocalización.' },
        { title: 'Práctica Intensiva', description: 'Ejercicios con textos variados y corrección de errores comunes.' },
        { title: 'Aplicación Profesional', description: 'Simulación de castings y aplicación en diferentes medios.' },
    ],
    instructor: {
        name: 'Abelardo Oseches',
        title: 'Director Académico',
        imageUrl: '/assets/abelardo-oseche.jpg'
    },
    type: 'Online',
  },
  {
    slug: 'oratoria-online',
    title: 'Oratoria',
    shortDescription: 'La oratoria moderna basada en la comunicación efectiva, la estructura de mensajes y el storytelling para impactar con naturalidad y autenticidad.',
    longDescription: 'La oratoria moderna basada en la comunicación efectiva, la estructura de mensajes y el storytelling para impactar con naturalidad y autenticidad. Aprende a conectar con tu audiencia y a transmitir tus ideas con confianza y claridad.',
    price: 50,
    currency: 'USD',
    icon: <SpeakerWaveIcon className="w-9 h-9 text-accent-blue" />,
    details: [
        { icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />, label: 'Fecha', value: 'Fechas disponibles' },
        { icon: <UsersIcon className="w-6 h-6 text-texto-secundario" />, label: 'Cupos', value: 'Cupos limitados' },
    ],
    syllabus: [
        { title: 'Estructura y Mensaje', description: 'Aprende a organizar tus ideas y a construir un discurso coherente.' },
        { title: 'Storytelling y Conexión', description: 'El arte de contar historias para persuadir y emocionar.' },
        { title: 'Puesta en Escena', description: 'Manejo del lenguaje no verbal y técnicas de presentación.' },
    ],
    instructor: {
        name: 'Maira Rojas',
        title: 'Directora Operativa',
        imageUrl: '/assets/maira-rojas.jpg'
    },
    type: 'Online',
  },
  {
    slug: 'doblaje-basico-online',
    title: 'Doblaje Básico',
    shortDescription: 'Una experiencia inmersiva en el doblaje, entrenando tu capacidad interpretativa, manejando tonos, matices, ritmos, intenciones y lip sync.',
    longDescription: 'Una experiencia inmersiva en el doblaje, entrenando tu capacidad interpretativa, manejando tonos, matices, ritmos, intenciones y lip sync. Ideal para quienes quieren iniciarse en el mundo del doblaje de voces.',
    price: 50,
    currency: 'USD',
    icon: <MicrophoneIcon className="w-9 h-9 text-accent-blue" />,
    details: [
        { icon: <CalendarDaysIcon className="w-6 h-6 text-texto-secundario" />, label: 'Fecha', value: 'Fechas disponibles' },
        { icon: <UsersIcon className="w-6 h-6 text-texto-secundario" />, label: 'Cupos', value: 'Cupos limitados' },
    ],
    syllabus: [
        { title: 'Introducción al Doblaje', description: 'Sincronía, ritmo y técnicas básicas de actuación vocal.' },
        { title: 'Interpretación y Personajes', description: 'Creación de voces y adaptación a diferentes personajes.' },
        { title: 'Práctica de Doblaje', description: 'Grabación de escenas y takes con dirección profesional.' },
    ],
    instructor: {
        name: 'Zayanit Lamas',
        title: 'Coordinadora',
        imageUrl: '/assets/zayanit-lamas.jpg'
    },
    type: 'Online',
  },
];