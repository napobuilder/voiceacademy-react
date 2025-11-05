
// FILE: scripts/seedCourses.ts
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';
import { fileURLToPath } from 'url';

// --- CONFIGURACIÓN ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY deben estar definidas.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- TIPOS DE DATOS ---

// Tipos flexibles para los datos del JSON de entrada
interface GenericCourseJSON {
  // --- Campos comunes o con nombres diferentes ---
  title?: string; // para online
  titulo?: string; // para presencial
  subtitle?: string; // para el nuevo formato
  description?: string; // para el nuevo formato
  instructor?: string; // para formato antiguo
  instructors?: { name: string; bio: string | null }[]; // para el nuevo formato
  slug?: string;
  
  // --- Campos Online ---
  dates?: string;
  time?: string;
  price?: { amount: number };
  content?: string[];

  // --- Campos Presencial ---
  fechas?: string;
  horario?: string;
  schedule?: string; // para el nuevo formato
  inversion?: any; // para formato antiguo
  investment?: any; // para el nuevo formato
  modulos?: { titulo: string; instructor: string }[];
  edad?: string;
}

// Mapeo de nombres de instructores a slugs (Case-insensitive)
const instructorSlugMap: { [key: string]: string } = {
  'abelardo oseches': 'abelardo-oseches',
  'josé antonio castillo': 'jose-antonio-castillo',
  'félix ptolo': 'felix-ptolo',
  'mariangélica aumaitre': 'mariangelica-aumaitre',
  'charlot prins': 'charlot-prins',
  'alí rondón': 'ali-rondon',
  'henrique palacios': 'henrique-palacios',
  'hernan rodriguez': 'hernan-rodriguez',
  'jesus conde': 'jesus-conde',
  'josé gomez chompré': 'jose-gomez-chompre',
  'maira rojas': 'maira-rojas',
  'maritza rojas': 'maritza-rojas',
  'luis loreto': 'luis-loreto', // Añadido para presenciales
  'mila capote': 'mila-capote'
};

// --- HELPERS ---

const getIconName = (title: string): string => {
  const upperTitle = title.toUpperCase();
  if (upperTitle.includes('DICCIÓN')) return 'ChatBubbleBottomCenterTextIcon';
  if (upperTitle.includes('LOCUCIÓN')) return 'MegaphoneIcon';
  if (upperTitle.includes('ORATORIA')) return 'PresentationChartLineIcon';
  if (upperTitle.includes('NARRACIÓN')) return 'BookOpenIcon';
  if (upperTitle.includes('ACENTO NEUTRO')) return 'MicrophoneIcon';
  if (upperTitle.includes('DOBLAJE')) return 'SpeakerWaveIcon';
  if (upperTitle.includes('AUDIOLIBROS')) return 'BookOpenIcon';
  if (upperTitle.includes('CANTO')) return 'MusicalNoteIcon';
  return 'TrophyIcon'; // Default
};

const parsePrice = (price: any): number => {
    if (typeof price === 'object' && price !== null && 'amount' in price) {
        return price.amount;
    }
    if (typeof price === 'string') {
        const match = price.match(/(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
    }
    return 0;
}

const generateSlug = (title: string, subtitle: string = '', date: string = ''): string => {
    let baseSlug = title.toLowerCase()
        .replace(/ñ/g, 'n')
        .replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u')
        .replace(/\([^)]+\)/g, '') // remove content in parentheses
        .replace(/[^a-z0-9\s-]/g, '') // remove non-word chars
        .replace(/[\s_-]+/g, '-') // collapse whitespace and replace by -
        .replace(/^-+|-+$/g, ''); // trim -

    // Add suffix for specific course types like (SABATINO)
    if (title.toLowerCase().includes('sabatino') || subtitle.toLowerCase().includes('sabatino')) {
        baseSlug += '-sabatino';
    }

    if (date) {
        const monthMatch = date.match(/(ENERO|FEBRERO|MARZO|ABRIL|MAYO|JUNIO|JULIO|AGOSTO|SEPTIEMBRE|OCTUBRE|NOVIEMBRE|DICIEMBRE)/i);
        if (monthMatch) {
            return `${baseSlug}-${monthMatch[0].toLowerCase()}`;
        }
    }
    return baseSlug;
}

const parseCourseDate = (dateString: string): Date => {
  const monthMap: { [key: string]: number } = {
    'ENERO': 0, 'FEBRERO': 1, 'MARZO': 2, 'ABRIL': 3, 'MAYO': 4, 'JUNIO': 5,
    'JULIO': 6, 'AGOSTO': 7, 'SEPTIEMBRE': 8, 'OCTUBRE': 9, 'NOVIEMBRE': 10, 'DICIEMBRE': 11
  };
  
  const parts = dateString.toUpperCase().replace(/:|,/g, ' ').split(' ').filter(p => p.trim() !== '');
  
  let month = -1;
  let day = -1;

  for (const part of parts) {
    if (monthMap[part] !== undefined) {
      month = monthMap[part];
    }
    const dayNum = parseInt(part, 10);
    if (!isNaN(dayNum) && day === -1) {
      day = dayNum;
    }
  }

  if (month === -1) month = new Date().getMonth(); // Default to current month if not found
  if (day === -1) day = 1; // Default to first day if not found
  
  return new Date(2025, month, day);
};

// --- SCRIPT PRINCIPAL ---

const seedCourses = async () => {
    console.log('Iniciando script para poblar la base de datos...');

    // 1. Obtener argumentos de la línea de comandos
    const args = process.argv.slice(2);
    const courseType = args[0];
    const jsonPathArg = args[1];

    if (!courseType || !jsonPathArg) {
        console.error('Error: Debes proporcionar el tipo de curso y la ruta del archivo JSON como argumentos.');
        console.error('Ejemplo: node <script> online public/cursos-online.json');
        return;
    }
     if (courseType !== 'online' && courseType !== 'presencial') {
        console.error(`Error: El tipo de curso debe ser 'online' o 'presencial'. Recibido: ${courseType}`);
        return;
    }

    try {
        // 2. Limpiar cursos existentes del tipo especificado
        console.log(`Eliminando cursos de tipo '${courseType}' existentes para asegurar una carga limpia...`);
        const { error: deleteError } = await supabase.from('courses').delete().eq('type', courseType);
        if (deleteError) throw new Error(`Error al eliminar cursos existentes: ${deleteError.message}`);
        console.log(`Cursos de tipo '${courseType}' eliminados con éxito.`);

        // 3. Leer el archivo JSON
        const jsonPath = path.resolve(process.cwd(), jsonPathArg);
        if (!fs.existsSync(jsonPath)) {
            throw new Error(`El archivo JSON no se encuentra en la ruta: ${jsonPath}`);
        }
                const jsonData = fs.readFileSync(jsonPath, 'utf-8');
                const coursesData = JSON.parse(jsonData);
                const coursesToSeed: GenericCourseJSON[] = Array.isArray(coursesData) ? coursesData : coursesData.courses;
                console.log(`Se encontraron ${coursesToSeed.length} cursos en el archivo JSON.`);
        
                // 4. Transformar datos
                const coursesForDb = coursesToSeed.map(course => {
                                const title = course.title || course.titulo || 'Sin Título';
                                const subtitle = course.subtitle || '';
                                const dateString = course.dates || course.fechas || '';
                                const slug = course.slug || generateSlug(title, subtitle, dateString);                    const price = parsePrice(course.price || course.investment || course.inversion);
                    const syllabusContent = course.content || course.modulos?.map(m => `${m.titulo} (con ${m.instructor})`) || [];
                    const syllabus = syllabusContent.map(item => ({ title: item, description: '' }));
                    const longDescription = course.description || syllabusContent.join('. ') + '.';
                    const shortDescription = syllabusContent[0] || '';
                    const startDate = parseCourseDate(dateString);
        
                    let instructorSlugs: string[] = [];
                    if (course.instructors && Array.isArray(course.instructors)) {
                        instructorSlugs = course.instructors
                            .map(inst => instructorSlugMap[inst.name.toLowerCase()])
                            .filter((slug): slug is string => !!slug);
                    } else if (course.instructor && typeof course.instructor === 'string') {
                        const instructorSlug = instructorSlugMap[course.instructor.toLowerCase()];
                        if (instructorSlug) {
                            instructorSlugs.push(instructorSlug);
                        }
                    } else if (course.modulos) {
                        instructorSlugs = course.modulos
                            .map(m => instructorSlugMap[m.instructor.toLowerCase()])
                            .filter((slug): slug is string => !!slug);
                    }
                    instructorSlugs = [...new Set(instructorSlugs)]; // Eliminar duplicados
        
        
                    return {
                        slug,
                        title,
                        display_title: title,
                        short_description: shortDescription,
                        long_description: longDescription,
                        price: price,
                        icon_name: getIconName(title),
                        start_date: startDate.toISOString(),
                        featured: false,
                        details: [{ icon: 'UsersIcon', label: 'Horario', value: course.schedule || course.horario || course.time }],
                        syllabus,
                        instructor_slugs: instructorSlugs,
                        type: courseType,
                    };
                });

        console.log('Transformando datos para la base de datos...');

        // 5. Insertar en Supabase
        if (coursesForDb.length > 0) {
            console.log(`Insertando ${coursesForDb.length} cursos en la tabla 'courses' de Supabase...`);
            const { data: insertedData, error } = await supabase.from('courses').insert(coursesForDb).select();
            if (error) throw error;
            console.log(`¡Éxito! Se han insertado ${insertedData.length} cursos en la base de datos.`);
        } else {
            console.log('No hay cursos para insertar.');
        }

        console.log('Script finalizado.');

    } catch (err) {
        console.error('Ha ocurrido un error durante la ejecución del script:', err);
    }
};

seedCourses();
