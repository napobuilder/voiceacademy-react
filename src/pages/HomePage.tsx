// FILE: src/pages/HomePage.tsx
import { useEffect, useState } from 'react';
import { Hero } from '@/sections/Hero';
import { Metodo } from '@/sections/Metodo';
import { Filosofia } from '@/sections/Filosofia';
import { GoDemosBanner } from '@/sections/GoDemosBanner';
import { Cashea } from '@/sections/Cashea';
import { Presenciales } from '@/sections/Presenciales';
import { Online } from '@/sections/Online';
import { Corporativos } from '@/sections/Corporativos';
import { Servicios } from '@/sections/Servicios';
import { Nosotros } from '@/sections/Nosotros';
import { CtaFinal } from '@/sections/CtaFinal';
import { supabase } from '@/lib/supabaseClient';
import type { Course } from '@/data/course-helpers';
import { transformDbCourseToCourse } from '@/data/course-helpers';

export function HomePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data: dbCourses, error } = await supabase
          .from('courses')
          .select('*');

        if (error) {
          throw error;
        }

        if (dbCourses) {
          const transformedCourses = dbCourses.map(transformDbCourseToCourse);
          setCourses(transformedCourses);
        }
      } catch (err) {
        setError('No se pudieron cargar los cursos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-fondo text-texto-principal">
        <p className="text-2xl font-semibold">Cargando Academia...</p>
        <p className="text-texto-secundario mt-2">Un momento por favor.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-red-50">
        <p className="text-2xl font-semibold text-red-700">Error al cargar los cursos</p>
        <p className="text-red-500 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <main>
      <Hero />
      <Metodo />
      <Filosofia />
      <GoDemosBanner />
      <Cashea />
      <Presenciales courses={courses} />
      <Online courses={courses} />
      <Corporativos />
      <Servicios />
      <Nosotros />
      <CtaFinal />
    </main>
  );
}
