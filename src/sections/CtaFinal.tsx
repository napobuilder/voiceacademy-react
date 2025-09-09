// FILE: src/sections/CtaFinal.tsx
import { useState } from 'react';
import { SectionHeader } from 'src/components/SectionHeader';
import Button from 'src/components/Button';
import { CheckIcon } from '@heroicons/react/24/solid';

export function CtaFinal() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    objetivo: '',
    desafio: '',
    nombre: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (step === 1 && !formData.objetivo) {
      setError('Por favor, completa este campo.');
      return;
    }
    if (step === 2 && !formData.desafio) {
      setError('Por favor, completa este campo.');
      return;
    }
    setError('');
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.email) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setError('Por favor, introduce un email válido.');
        return;
    }
    setError('');
    setSubmitted(true);
  };

  const totalSteps = 3;
  const progress = (step - 1) / (totalSteps - 1) * 100;

  return (
    <section id="cta-final" className="bg-fondo-seccion py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Tu Transformación Comienza con un Diagnóstico"
          subtitle="El primer paso no es una audición, es una conversación. Responde 3 preguntas rápidas para que nuestro equipo entienda tu punto de partida y tus metas. No te tomará más de 30 segundos."
        />
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-white to-gray-100 p-10 rounded-2xl shadow-funnel border border-gray-200">
          {!submitted ? (
            <>
              <div className="relative mb-10">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200"></div>
                <div className="absolute top-1/2 left-0 h-1 bg-accent-orange transition-all duration-500" style={{ width: `${progress}%` }}></div>
                <div className="flex justify-between relative">
                  {[...Array(totalSteps)].map((_, i) => (
                    <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${step > i ? 'bg-accent-orange text-white border-accent-orange' : 'bg-white text-gray-400 border-2 border-gray-300'}`}>
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="text-center animate-fadeIn">
                    <label htmlFor="objetivo" className="block text-2xl font-semibold mb-6 text-accent-blue">¿Cuál es tu objetivo principal al formarte con nosotros?</label>
                    <input type="text" id="objetivo" name="objetivo" value={formData.objetivo} onChange={handleChange} className="w-full p-4 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent" placeholder="Ej: Conseguir trabajo, mejorar mi dicción, etc." />
                    <p className="text-red-500 h-6 mt-1">{error}</p>
                    <Button onClick={nextStep} className="mt-6">Siguiente</Button>
                  </div>
                )}
                {step === 2 && (
                  <div className="text-center animate-fadeIn">
                    <label htmlFor="desafio" className="block text-2xl font-semibold mb-6 text-accent-blue">¿Cuál es tu mayor desafío con tu voz ahora mismo?</label>
                    <input type="text" id="desafio" name="desafio" value={formData.desafio} onChange={handleChange} className="w-full p-4 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent" placeholder="Ej: Miedo escénico, falta de técnica, etc." />
                    <p className="text-red-500 h-6 mt-1">{error}</p>
                    <div className="flex justify-center gap-4 mt-6">
                      <Button onClick={prevStep} variant="secondary">Atrás</Button>
                      <Button onClick={nextStep}>Siguiente</Button>
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="text-center animate-fadeIn">
                    <label className="block text-2xl font-semibold mb-6 text-accent-blue">Excelente. Por último, tu nombre y email de contacto:</label>
                    <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full p-4 text-center border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-accent-orange focus:border-transparent" placeholder="Tu nombre completo" />
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-4 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-transparent" placeholder="tu.email@ejemplo.com" />
                    <p className="text-red-500 h-6 mt-1">{error}</p>
                    <div className="flex justify-center gap-4 mt-6">
                      <Button onClick={prevStep} variant="secondary">Atrás</Button>
                      <Button type="submit">Finalizar Diagnóstico</Button>
                    </div>
                  </div>
                )}
              </form>
            </>
          ) : (
            <div className="text-center animate-fadeIn">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckIcon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-accent-blue mb-4">¡Diagnóstico Completo!</h3>
                <p className="text-texto-secundario text-lg mb-8">Hemos recibido tus respuestas. El último paso es enviarlas a nuestro equipo por WhatsApp para agendar una conversación personalizada.</p>
                <Button 
                    href={`https://wa.me/584123456789?text=${encodeURIComponent('¡Hola Voice Academy! 👋\n\nAcabo de completar el diagnóstico:\n*Nombre:* ' + formData.nombre + '\n*🎯 Mi Objetivo:* ' + formData.objetivo + '\n*🤔 Mi Desafío:* ' + formData.desafio + '\n*✉️ Mi Email:* ' + formData.email + '\n\n¡Espero su contacto!')}`}
                    target="_blank"
                    variant="whatsapp"
                >
                    Confirmar y Chatear en WhatsApp
                </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
