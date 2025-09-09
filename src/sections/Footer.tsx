// FILE: src/sections/Footer.tsx

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-texto-principal text-white/70 text-center py-10">
      <div className="container mx-auto px-4">
        <p>&copy; {currentYear} Voice Academy. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
