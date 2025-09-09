// FILE: src/App.tsx
import { Routes, Route, Outlet } from 'react-router-dom';
import { useCartStore } from './stores/cartStore';
import { Header } from 'src/sections/Header';
import { Footer } from 'src/sections/Footer';
import { HomePage } from 'src/pages/HomePage';
import { CoursePage } from 'src/pages/CoursePage';
import { CheckoutPage } from 'src/pages/CheckoutPage';
import { CartPanel } from 'src/components/CartPanel';

function Layout() {
  const { isCartOpen, openCart, closeCart } = useCartStore();

  return (
    <div className="bg-fondo text-texto-principal font-sans">
      <Header onCartClick={openCart} />
      <CartPanel isOpen={isCartOpen} onClose={closeCart} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="cursos/:slug" element={<CoursePage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        {/* Aquí se pueden añadir otras rutas como /carrito, etc. */}
      </Route>
    </Routes>
  );
}

export default App;
