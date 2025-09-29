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
    name: 'Abelardo Oseches',
    imgSrc: '/assets/fotos-voiceacademy/Abelardo Oseches.jpg'
  },
  {
    name: 'Alí Rondón',
    imgSrc: '/assets/fotos-voiceacademy/Alí Rondón.jpg'
  },
  {
    name: 'Charlot Prince',
    imgSrc: '/assets/fotos-voiceacademy/Charlot Prince.jpg'
  },
  {
    name: 'Félix Ptolo',
    imgSrc: '/assets/fotos-voiceacademy/Félix Ptolo.jpg'
  },
  {
    name: 'Henrique Palacios',
    imgSrc: '/assets/fotos-voiceacademy/Henrique Palacios.jpg'
  },
  {
    name: 'Hernan Rodriguez',
    imgSrc: '/assets/fotos-voiceacademy/Hernan Rodriguez2.png'
  },
  {
    name: 'Jesús Conde',
    imgSrc: '/assets/fotos-voiceacademy/Jesús Conde.jpg'
  },
  {
    name: 'José Antonio Castillo',
    imgSrc: '/assets/fotos-voiceacademy/José Antonio Castillo.jpg'
  },
  {
    name: 'José Gomez Chompré',
    imgSrc: '/assets/fotos-voiceacademy/José Gomez Chompré.jpg'
  }
];
