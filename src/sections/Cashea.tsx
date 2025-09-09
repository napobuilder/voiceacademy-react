import type { FC } from 'react';

export const Cashea: FC = () => {
  const bgPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <section 
      id="cashea-promo" 
      className="bg-[#FEF200] text-black relative py-16 z-10"
      style={{ backgroundImage: bgPattern }}
    >
      <div className="container mx-auto px-5 text-center">
        <div className="flex justify-center items-center">
          <img src="/assets/logo-cashea-oficial.webp" alt="Logo de Cashea" className="w-48 h-auto" />
        </div>
      </div>
    </section>
  );
};