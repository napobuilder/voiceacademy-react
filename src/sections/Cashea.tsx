import type { FC } from 'react';

export const Cashea: FC = () => {
  const bgPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <section 
      id="cashea-promo" 
      className="bg-[#FEF200] text-black relative py-12 md:py-16 z-10 overflow-hidden"
      style={{ backgroundImage: bgPattern }}
    >
      {/* SVG Decorativo con clases responsivas */}
      <img 
        src="/assets/fotos-voiceacademy/Diseño sin título.svg" 
        alt="Decoración Cashea" 
        className="absolute right-0 -bottom-2 w-44 h-auto z-0 md:top-0 md:h-full md:w-auto"
      />

      <div className="container mx-auto px-4 relative z-10 h-full flex justify-start md:justify-center items-center">
        <div className="text-left md:text-center">
          <img 
            src="/assets/logo-cashea-oficial.webp" 
            alt="Logo de Cashea" 
            className="w-32 md:w-48 h-auto"
          />
          <p className="text-xl font-bold text-gray-800 mt-4">
            Ahora compra tus <br className="md:hidden" />cursos con <span className="font-extrabold">Cashea</span>
          </p>
        </div>
      </div>
    </section>
  );
};