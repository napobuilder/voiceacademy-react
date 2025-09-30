// FILE: src/pages/CoursePage.tsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { courses } from '@/data/courses';
import { getInstructorBySlug } from '@/data/instructors';
import { PrimaryButton } from '@/components/Button';
import { useCartStore } from '@/stores/cartStore';

export function CoursePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const openCart = useCartStore((state) => state.openCart);
  
  const course = courses.find(c => c.slug === slug);

  if (!course) {
    return (
      <div className="container mx-auto px-5 py-24 text-center">
        <h1 className="text-4xl font-bold text-accent-blue">Curso no encontrado</h1>
        <p className="mt-4 text-lg text-texto-secundario">El curso que buscas no existe o ha sido movido.</p>
        <Link to="/" className="mt-8 inline-block">
          <PrimaryButton>Volver al Inicio</PrimaryButton>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!course) return;
    addToCart(course);
    openCart();
  };

  const handleBuyNow = () => {
    if (!course) return;
    addToCart(course); // Ensure item is in cart before checkout
    navigate('/checkout');
  };

  return (
    <div className="bg-fondo-seccion">
      <div className="container mx-auto px-5 py-16 md:py-24">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Columna Principal */}
          <div className="lg:col-span-2">
            <span className={`inline-block mb-4 text-sm font-bold uppercase tracking-wider ${course.type === 'Presencial' ? 'text-secondary-bg' : 'text-accent-orange'}`}>
              Curso {course.type}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-accent-blue leading-tight">{course.title}</h1>
            
            <div className="mt-6 mb-8 space-y-4">
              {course.instructorSlugs.map((slug, index) => {
                const instructor = getInstructorBySlug(slug);
                if (!instructor) return null; // No debería pasar si los datos son consistentes

                return (
                  <div key={index} className="flex items-center gap-4">
                    <img src={instructor.imageUrl} alt={instructor.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-texto-principal">{instructor.name}</p>
                      <p className="text-sm text-texto-secundario">{instructor.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <h2 className="text-2xl font-bold text-accent-blue mt-12 mb-4">Descripción del Curso</h2>
            <p className="text-lg text-texto-secundario leading-relaxed">{course.longDescription}</p>

            <h2 className="text-2xl font-bold text-accent-blue mt-12 mb-6">¿Qué aprenderás?</h2>
            <div className="space-y-4">
              {course.syllabus.map((item, index) => (
                <div key={index} className="bg-fondo p-4 rounded-lg flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-blue/10 text-accent-blue font-bold flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-texto-principal">{item.title}</h3>
                    <p className="text-texto-secundario">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar de Compra */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-32">
              <h3 className="text-3xl font-bold text-accent-blue text-center">${course.price} <span className="text-lg font-normal">{course.currency}</span></h3>
              
              {course.details && course.details.length > 0 && (
                <div className="my-6 space-y-3">
                  {course.details.map((detail, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <span className="text-accent-orange">{detail.icon}</span>
                      <span className="text-texto-secundario"><strong className="text-texto-principal">{detail.label}:</strong> {detail.value}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 space-y-3">
                <PrimaryButton onClick={handleAddToCart} className="w-full">Añadir al Carrito</PrimaryButton>
                <button 
                  onClick={handleBuyNow}
                  className="w-full bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-custom transition hover:bg-gray-300"
                >
                  Comprar Ahora
                </button>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}