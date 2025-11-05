// FILE: src/pages/CourseEditorPage.tsx
import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { instructors as allInstructors } from '@/data/instructors';
import type { Database } from '@/data/supabase.types';

// El tipo para un curso como viene de la DB
type DbCourse = Database['public']['Tables']['courses']['Row'];

// Helper para generar un slug a partir de un string
const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word chars
    .replace(/\s+/g, '-') // replace spaces with -
    .replace(/--+/g, '-') // replace multiple - with single -
    .trim();
};

// Nombres de los íconos disponibles en el helper
const availableIcons = [
  'MicrophoneIcon',
  'PresentationChartLineIcon',
  'MegaphoneIcon',
  'SpeakerWaveIcon',
  'ChatBubbleBottomCenterTextIcon',
];

export function CourseEditorPage() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();
  const isNewCourse = !slug;

  const [formData, setFormData] = useState<Partial<DbCourse>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourse = useCallback(async () => {
    if (isNewCourse) {
      setFormData({ type: 'online', featured: false }); // Valores por defecto
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      if (data) {
        // El JSON de la DB se convierte a string para el textarea
        setFormData({
            ...data,
            details: JSON.stringify(data.details || [], null, 2),
            syllabus: JSON.stringify(data.syllabus || [], null, 2),
        });
      } else {
        setError('Curso no encontrado.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [slug, isNewCourse]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Auto-generar slug si es un curso nuevo y se está escribiendo el título
    if (name === 'title' && isNewCourse) {
        setFormData(prev => ({ ...prev, slug: generateSlug(value) }));
    }
  };

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name } = e.target;
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, [name]: options }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
        // Convertir details y syllabus de string JSON a objeto antes de guardar
        const details = JSON.parse(formData.details as string || '[]');
        const syllabus = JSON.parse(formData.syllabus as string || '[]');

        const payload = {
            ...formData,
            details,
            syllabus,
            price: formData.price || 0, // Aseguramos que price sea 0 si es undefined
        };

      if (isNewCourse) {
        // Crear curso
        const { error } = await supabase.from('courses').insert(payload).single();
        if (error) throw error;
      } else {
        // Actualizar curso
        const { error } = await supabase.from('courses').update(payload).eq('slug', slug);
        if (error) throw error;
      }
      
      alert('¡Curso guardado con éxito!');
      navigate('/admin');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Cargando...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
       <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {isNewCourse ? 'Añadir Nuevo Curso' : 'Editar Curso'}
        </h1>
        <button onClick={() => navigate('/admin')} className="py-2 px-4 rounded-md text-white bg-gray-600 hover:bg-gray-700">
          Volver al Panel
        </button>
      </header>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Título</label>
                <input type="text" name="title" value={formData.title || ''} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>

            {/* Slug */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Slug (URL)</label>
                <input type="text" name="slug" value={formData.slug || ''} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100" readOnly={!isNewCourse} />
            </div>

            {/* Short Description */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Descripción Corta</label>
                <textarea name="short_description" value={formData.short_description || ''} onChange={handleChange} rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>
            
            {/* Long Description */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Descripción Larga</label>
                <textarea name="long_description" value={formData.long_description || ''} onChange={handleChange} rows={6} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>

            {/* Price */}
             <div>
                <label className="block text-sm font-medium text-gray-700">Precio (EUR)</label>
                <input type="number" name="price" value={formData.price || 0} onChange={handleChange} step="0.01" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>

            {/* Start Date */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
                <input type="datetime-local" name="start_date" value={(formData.start_date || '').slice(0, 16)} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
            </div>

            {/* Type */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Tipo</label>
                <select name="type" value={formData.type || 'online'} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                    <option value="online">Online</option>
                    <option value="presencial">Presencial</option>
                </select>
            </div>

            {/* Icon Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Icono</label>
                <select name="icon_name" value={formData.icon_name || ''} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                    {availableIcons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                </select>
            </div>

             {/* Instructors */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Instructores</label>
                <select name="instructor_slugs" multiple value={formData.instructor_slugs || []} onChange={handleMultiSelectChange} className="mt-1 block w-full h-40 border-gray-300 rounded-md shadow-sm">
                    {allInstructors.map(inst => <option key={inst.slug} value={inst.slug}>{inst.name}</option>)}
                </select>
            </div>

            {/* Details (JSON) */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Detalles (JSON)</label>
                <textarea name="details" value={formData.details as string || ''} onChange={handleChange} rows={8} className="mt-1 block w-full font-mono text-sm border-gray-300 rounded-md shadow-sm" />
            </div>

            {/* Syllabus (JSON) */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Syllabus (JSON)</label>
                <textarea name="syllabus" value={formData.syllabus as string || ''} onChange={handleChange} rows={8} className="mt-1 block w-full font-mono text-sm border-gray-300 rounded-md shadow-sm" />
            </div>
             
            {/* Featured */}
            <div className="flex items-center">
                <input type="checkbox" name="featured" checked={formData.featured || false} onChange={handleChange} className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                <label className="ml-2 block text-sm text-gray-900">¿Curso Destacado?</label>
            </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
            <button type="submit" disabled={saving} className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent-blue hover:bg-accent-blue-dark disabled:opacity-50">
                {saving ? 'Guardando...' : (isNewCourse ? 'Crear Curso' : 'Guardar Cambios')}
            </button>
        </div>
      </form>
    </div>
  );
}