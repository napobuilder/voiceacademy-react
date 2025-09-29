// FILE: src/data/instructors.ts

export interface Instructor {
  name: string;
  imgSrc: string;
  title?: string; // Opcional, para los líderes
  quote?: string; // Opcional, para los líderes
  bio?: string; // Opcional, para el modal de la galería
  imgStyle?: React.CSSProperties;
}

export const leaders: Instructor[] = [
  {
    imgSrc: '/assets/abelardo-oseche.jpg',
    name: 'Abelardo Oseches',
    title: 'CEO fundador. Director Académico',
    quote: 'Vi a demasiados artistas estancarse por falta de un método. Mi misión es darte las herramientas no sólo para dominar su voz, sino para construir una carrera.',
    imgStyle: { objectPosition: '50% 40%' }
  },
  {
    imgSrc: '/assets/maira-rojas.jpg',
    name: 'Maira Alejandra Rojas',
    title: 'CCO. Directora Operativa',
    quote: 'Mi pasión es la organización, la producción y los procesos. Nuestra misión es hacer de Voice, un ejemplo de gestión, de atención y de formación, para crear experiencias inolvidables desde el primer contacto.',
    imgStyle: { objectPosition: '50% 20%' }
  },
  {
    imgSrc: '/assets/zayanit-lamas.jpg',
    name: 'Zayanit Lamas',
    title: 'Coordinadora',
    quote: 'Como diseñadora trato de mostrar la mejor cara de Voice, que lo que proyectemos como imagen se relacione con lo que somos como comunidad. Mi tarea al ser también la cara visible de la atención, es hacer que todos nuestros alumnos y clientes se sientan en casa.',
    imgStyle: { objectPosition: '50% 40%' }
  }
];

export const galleryInstructors: Instructor[] = [
  {
    name: 'Instructor 1',
    imgSrc: '/assets/maira-rojas.jpg', // Placeholder
    bio: 'Biografía detallada del Instructor 1. Aquí se hablará de su experiencia, logros y especialidades.'
  },
  {
    name: 'Instructor 2',
    imgSrc: '/assets/abelardo-oseche.jpg', // Placeholder
    bio: 'Biografía detallada del Instructor 2. Aquí se hablará de su experiencia, logros y especialidades.'
  },
  {
    name: 'Instructor 3',
    imgSrc: '/assets/zayanit-lamas.jpg', // Placeholder
    bio: 'Biografía detallada del Instructor 3. Aquí se hablará de su experiencia, logros y especialidades.'
  },
  {
    name: 'Instructor 4',
    imgSrc: '/assets/maira-rojas.jpg', // Placeholder
    bio: 'Biografía detallada del Instructor 4. Aquí se hablará de su experiencia, logros y especialidades.'
  },
  {
    name: 'Instructor 5',
    imgSrc: '/assets/abelardo-oseche.jpg', // Placeholder
    bio: 'Biografía detallada del Instructor 5. Aquí se hablará de su experiencia, logros y especialidades.'
  }
];
