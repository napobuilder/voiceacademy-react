// FILE: src/pages/HomePage.tsx
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

export function HomePage() {
  return (
    <main>
      <Hero />
      <Metodo />
      <Filosofia />
      <GoDemosBanner />
      <Cashea />
      <Presenciales />
      <Online />
      <Corporativos />
      <Servicios />
      <Nosotros />
      <CtaFinal />
    </main>
  );
}