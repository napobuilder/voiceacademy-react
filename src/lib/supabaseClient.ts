// FILE: src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/data/supabase.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and anon key are required. Make sure to create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
