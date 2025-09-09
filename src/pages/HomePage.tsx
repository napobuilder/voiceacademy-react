// FILE: src/pages/HomePage.tsx
import { Hero } from 'src/sections/Hero';
import { Metodo } from 'src/sections/Metodo';
import { Filosofia } from 'src/sections/Filosofia';
import { Cashea } from 'src/sections/Cashea';
import { Presenciales } from 'src/sections/Presenciales';
import { Online } from 'src/sections/Online';
import { Corporativos } from 'src/sections/Corporativos';
import { Servicios } from 'src/sections/Servicios';
import { Nosotros } from 'src/sections/Nosotros';
import { CtaFinal } from 'src/sections/CtaFinal';

export function HomePage() {
  return (
    <main>
      <Hero />
      <Metodo />
      <Filosofia />
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