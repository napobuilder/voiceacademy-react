// FILE: src/App.tsx
import { Routes, Route, Outlet } from 'react-router-dom';
import { useCartStore } from '@/stores/cartStore';
import { Header } from '@/sections/Header';
import { Footer } from '@/sections/Footer';
import { HomePage } from '@/pages/HomePage';
import { CoursePage } from '@/pages/CoursePage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import GoDemosPage from '@/pages/GoDemosPage';
import { CartPanel } from '@/components/CartPanel';
import { PaymentSuccessPage } from '@/pages/PaymentSuccessPage';
import { PaymentCancelledPage } from '@/pages/PaymentCancelledPage';

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
        <Route path="godemos" element={<GoDemosPage />} />
        <Route path="payment/success" element={<PaymentSuccessPage />} />
        <Route path="payment/cancelled" element={<PaymentCancelledPage />} />
      </Route>
    </Routes>
  );
}

export default App;