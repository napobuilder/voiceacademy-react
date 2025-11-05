
// FILE: src/pages/AdminDashboardPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import type { Course } from '@/data/courses';
import { transformDbCourseToCourse } from '@/data/course-helpers';

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error al cerrar sesión:', error);
    } else {
      navigate('/admin/login');
    }
  };

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: dbCourses, error } = await supabase
        .from('courses')
        .select('*')
        .order('start_date', { ascending: false }); // Ordenar por fecha de inicio

      if (error) {
        throw error;
      }

      if (dbCourses) {
        const transformedCourses = dbCourses.map(transformDbCourseToCourse);
        setCourses(transformedCourses);
      }
    } catch (err: any) {
      setError(err.message || 'No se pudieron cargar los cursos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este curso? Esta acción no se puede deshacer.')) {
      try {
        const { error } = await supabase.from('courses').delete().eq('slug', slug);
        if (error) throw error;
        alert('¡Curso eliminado con éxito!');
        // Volver a cargar los cursos para actualizar la lista
        fetchCourses(); 
      } catch (err: any) {
        alert(`Error al eliminar el curso: ${err.message}`);
      }
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex justify-center items-center">
        <p className="text-lg text-gray-700">Cargando cursos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-100 min-h-screen flex justify-center items-center">
        <p className="text-lg text-red-700">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
        <button
          onClick={handleLogout}
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Cerrar Sesión
        </button>
      </header>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Gestión de Cursos</h2>
        <button
          onClick={() => navigate('/admin/courses/new')}
          className="mb-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent-blue hover:bg-accent-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-blue"
        >
          Añadir Nuevo Curso
        </button>

        {courses.length === 0 ? (
          <p className="text-gray-600">No hay cursos disponibles. ¡Añade uno!</p>
        ) : (
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.slug} className="flex items-center justify-between p-4 border border-gray-200 rounded-md shadow-sm">
                <span className="text-lg font-medium text-gray-800">{course.title} ({course.type})</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/admin/courses/${course.slug}/edit`)}
                    className="py-1 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(course.slug)} // Lógica de eliminación conectada
                    className="py-1 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
