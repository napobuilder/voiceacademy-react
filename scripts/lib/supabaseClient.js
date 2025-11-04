import { createClient } from '@supabase/supabase-js';
// Asegúrate de que estas variables de entorno estén configuradas en tu entorno de ejecución de Node.js
// Por ejemplo, usando un archivo .env y 'dotenv' o configurándolas directamente en el sistema.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Las variables de entorno SUPABASE_URL y SUPABASE_ANON_KEY deben estar definidas.');
}
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
