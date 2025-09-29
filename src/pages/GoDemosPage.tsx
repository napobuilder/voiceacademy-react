import React, { useState } from 'react';
import type { FC } from 'react';
import { GoDemosContact } from 'src/components/GoDemosContact';

// --- Iconos SVG (Adaptados al estilo del proyecto) ---
const Icon: FC<{ path: React.ReactNode; className?: string }> = ({ path, className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        {path}
    </svg>
);

const CheckIcon: FC = () => <Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />} />;
const StarIcon: FC = () => <Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.254 3.138a.563.563 0 00-.162.632l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.162-.632l-4.254-3.138a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />} className="w-5 h-5" />;

const GoDemosPage: FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);
  const basicPlanMsg = encodeURIComponent("Hola, estoy interesado en el Plan Basic de GoDemos.");
  const proPlanMsg = encodeURIComponent("Hola, estoy interesado en el Plan Pro de GoDemos.");
  const phoneNumber = "584127435516";

  return (
    <section id="godemos" className="bg-fondo font-sans text-texto-secundario antialiased">
      <div className="container mx-auto px-4 py-12 md:py-24">
        
        {/* --- Cabecera --- */}
        <header className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-8">
                <img src="/Logo_Horizontal_W_PNG (1).png" alt="GoDemos Logo" className="h-16" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-texto-principal">
                Tu Voz, <span className="bg-gradient-to-r from-accent-orange to-orange-400 text-transparent bg-clip-text">Potenciada</span>. Todo en un Mismo Lugar.
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-texto-secundario">
                La plataforma definitiva para locutores. Graba, compite en castings, comparte tu talento y conecta con productores.
            </p>
        </header>

        {/* --- Selector de Plan --- */}
        <div className="my-12 md:my-16 flex justify-center items-center gap-4">
            <span className={`font-medium ${!isAnnual ? 'text-accent-orange' : 'text-slate-500'}`}>Mensual</span>
            <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAnnual ? 'bg-accent-orange' : 'bg-slate-300'}`}
            >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <span className={`font-medium ${isAnnual ? 'text-accent-orange' : 'text-slate-500'}`}>Anual</span>
            <span className="hidden md:inline-block ml-2 px-3 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">Ahorra 2 meses</span>
        </div>

        {/* --- Sección de Planes --- */}
        <main>
            <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-8">
                
                {/* --- Plan Basic --- */}
                <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-slate-200 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <h3 className="text-2xl font-bold text-texto-principal">Plan Basic</h3>
                    <p className="mt-2 text-texto-secundario h-14">Ideal para talentos emergentes que buscan un demo profesional y sus primeros castings.</p>
                    <div className="my-8 text-center">
                        <span className="text-5xl font-extrabold tracking-tight text-texto-principal">${isAnnual ? '150' : '15'}</span>
                        <span className="text-texto-secundario">/{isAnnual ? 'año' : 'mes'}</span>
                    </div>
                    <ul className="space-y-4 text-texto-secundario flex-grow">
                        <li className="flex items-center gap-3"><CheckIcon /> Graba y descarga demos ilimitados</li>
                        <li className="flex items-center gap-3"><CheckIcon /> Demoteca personal con link público</li>
                        <li className="flex items-center gap-3"><CheckIcon /> Acceso a castings nacionales</li>
                        <li className="flex items-center gap-3"><CheckIcon /> Acceso a webinars mensuales</li>
                        <li className="flex items-center gap-3"><CheckIcon /> Mentoría grabada</li>
                    </ul>
                    <a href={`https://wa.me/${phoneNumber}?text=${basicPlanMsg}`} target="_blank" rel="noopener noreferrer" className="mt-8 w-full py-3 px-6 text-center font-semibold text-accent-orange bg-orange-100 rounded-lg transition hover:bg-orange-200">
                        Empezar con Basic
                    </a>
                </div>

                {/* --- Plan Pro (Destacado) --- */}
                <div className="relative bg-texto-principal p-8 rounded-2xl shadow-2xl w-full max-w-md ring-4 ring-accent-orange flex flex-col transition-transform duration-300 hover:scale-105">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-x-1.5 rounded-full bg-accent-orange px-4 py-1.5 text-sm font-medium text-white">
                            <StarIcon /> MÁS POPULAR
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Plan Pro</h3>
                    <p className="mt-2 text-slate-400 h-14">Para profesionales que buscan expandirse, organizar su trabajo y facturar más.</p>
                    <div className="my-8 text-center">
                        <span className="text-5xl font-extrabold tracking-tight text-white">${isAnnual ? '250' : '20'}</span>
                        <span className="text-slate-400">/{isAnnual ? 'año' : 'mes'}</span>
                    </div>
                    <ul className="space-y-4 text-slate-300 flex-grow">
                        <li className="flex items-center gap-3 font-semibold text-accent-orange-hover"><CheckIcon /> Todo lo del Plan Basic, y además:</li>
                        <li className="flex items-center gap-3"><CheckIcon /> CRM para organizar tu trabajo</li>
                        <li className="flex items-center gap-3"><CheckIcon /> Mentoría personalizada</li>
                        <li className="flex items-center gap-3"><CheckIcon /> Asesoría profesional</li>
                    </ul>
                    <a href={`https://wa.me/${phoneNumber}?text=${proPlanMsg}`} target="_blank" rel="noopener noreferrer" className="mt-8 w-full py-3 px-6 text-center font-semibold text-white bg-accent-orange rounded-lg transition hover:bg-accent-orange-hover shadow-accent-orange/30 shadow-lg">
                        Elegir Plan Pro
                    </a>
                </div>

            </div>
        </main>

        <GoDemosContact />

      </div>
    </section>
  );
};

export default GoDemosPage;