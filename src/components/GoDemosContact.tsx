import type { FC } from 'react';

// --- Iconos SVG ---
const Icon: FC<{ path: React.ReactNode; className?: string }> = ({ path, className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        {path}
    </svg>
);

const MailIcon = () => <Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />} />;
const PhoneIcon = () => <Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />} />;

export const GoDemosContact: FC = () => {
    const generalMsg = encodeURIComponent("Hola, tengo una pregunta sobre GoDemos.");
    const phoneNumber = "584127435516";

    return (
        <div className="mt-20 md:mt-24 text-center border-t border-slate-200 pt-10">
            <h3 className="text-2xl font-bold text-texto-principal">¿Tienes Preguntas?</h3>
            <p className="mt-2 text-texto-secundario">Estamos aquí para ayudarte a crecer.</p>
            <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
                <a href="mailto:entrenamientosvoiceacademy@gmail.com" className="flex items-center text-texto-secundario hover:text-accent-orange transition-colors group">
                    <MailIcon />
                    <span className="ml-2 group-hover:underline">entrenamientosvoiceacademy@gmail.com</span>
                </a>
                <a href={`https://wa.me/${phoneNumber}?text=${generalMsg}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-texto-secundario hover:text-accent-orange transition-colors group">
                    <PhoneIcon />
                    <span className="ml-2 group-hover:underline">+58 412 743 5516</span>
                </a>
            </div>
        </div>
    );
};