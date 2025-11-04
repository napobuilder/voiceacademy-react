
// FILE: scripts/seedOnlineCourses.ts
import { supabase } from './lib/supabaseClient.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tipos de datos del JSON
interface CourseJSON {
  slug: string;
  title: string;
  instructor: string;
  dates: string;
  time: string;
  price: {
    amount: number;
  };
  content: string[];
}

// Mapeo de nombres de instructores a slugs
const instructorSlugMap: { [key: string]: string } = {
  'ABELARDO OSECHES': 'abelardo-oseches',
  'JOSÉ ANTONIO CASTILLO': 'jose-antonio-castillo',
  'FÉLIX PTOLO': 'felix-ptolo',
  'MARIANGÉLICA AUMAITRE': 'mariangelica-aumaitre',
  'CHARLOT PRINS': 'charlot-prins',
};

// Mapeo de títulos de cursos a nombres de íconos
const getIconName = (title: string): string => {
  if (title.includes('DICCIÓN')) return 'ChatBubbleBottomCenterTextIcon';
  if (title.includes('LOCUCIÓN')) return 'MegaphoneIcon';
  if (title.includes('ORATORIA')) return 'PresentationChartLineIcon';
  if (title.includes('NARRACIÓN')) return 'ChatBubbleBottomCenterTextIcon'; // Usamos uno similar
  if (title.includes('ACENTO NEUTRO')) return 'MicrophoneIcon';
  if (title.includes('DOBLAJE')) return 'SpeakerWaveIcon';
  if (title.includes('AUDIOLIBROS')) return 'SpeakerWaveIcon'; // Usamos uno similar
  return 'MicrophoneIcon'; // Default
};

// Función para parsear la fecha
const parseCourseDate = (dateString: string): Date => {
  const monthMap: { [key: string]: number } = {
    'ENERO': 0, 'FEBRERO': 1, 'MARZO': 2, 'ABRIL': 3, 'MAYO': 4, 'JUNIO': 5,
    'JULIO': 6, 'AGOSTO': 7, 'SEPTIEMBRE': 8, 'OCTUBRE': 9, 'NOVIEMBRE': 10, 'DICIEMBRE': 11
  };
  const parts = dateString.toUpperCase().split(':');
  const monthName = parts[0].trim();
  const month = monthMap[monthName];
  const dayMatch = parts[1].match(/\d+/);
  const day = dayMatch ? parseInt(dayMatch[0], 10) : 1;
  return new Date(2025, month, day);
};

const seedCourses = async () => {
  console.log('Iniciando script para poblar la base de datos...');

  try {
    // 0. Eliminar cursos online existentes
    console.log('Eliminando cursos online existentes para asegurar una carga limpia...');
    const { error: deleteError } = await supabase
      .from('courses')
      .delete()
      .eq('type', 'online');

    if (deleteError) {
      throw new Error(`Error al eliminar cursos existentes: ${deleteError.message}`);
    }
    console.log('Cursos online existentes eliminados con éxito.');

    // 1. Leer el archivo JSON
    const jsonPath = path.resolve(process.cwd(), 'public/cursos-proximos-online');
    const jsonData = fs.readFileSync(jsonPath, 'utf-8');
    const data = JSON.parse(jsonData);
    const coursesToSeed: CourseJSON[] = data.courses;
    console.log(`Se encontraron ${coursesToSeed.length} cursos en el archivo JSON.`);

    // 2. Transformar los datos para la DB
    const coursesForDb = coursesToSeed.map(course => {
      const instructorSlug = instructorSlugMap[course.instructor];
      if (!instructorSlug) {
        console.warn(`Instructor no encontrado en el mapa: ${course.instructor}`);
      }

      return {
        slug: course.slug,
        title: course.title,
        display_title: course.title,
        short_description: course.content[0],
        long_description: course.content.join(' '),
        price: course.price.amount,
        icon_name: getIconName(course.title),
        start_date: parseCourseDate(course.dates).toISOString(),
        featured: false,
        details: [{ icon: 'UsersIcon', label: 'Horario', value: course.time }],
        syllabus: course.content.map(item => ({ title: item, description: '' })),
        instructor_slugs: instructorSlug ? [instructorSlug] : [],
        type: 'online' as 'online' | 'presencial',
      };
    });
    
    console.log('Transformando datos para la base de datos...');

    // 3. Insertar en Supabase
    console.log("Insertando cursos en la tabla 'courses' de Supabase...");
    const { data: insertedData, error } = await supabase
      .from('courses')
      .insert(coursesForDb)
      .select();

    if (error) {
      throw error;
    }

    console.log(`¡Éxito! Se han insertado ${insertedData.length} cursos en la base de datos.`);
    console.log('Script finalizado.');

  } catch (err) {
    console.error('Ha ocurrido un error durante la ejecución del script:', err);
  }
};

seedCourses();
