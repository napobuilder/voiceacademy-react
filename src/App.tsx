
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
import { AdminLoginPage } from '@/pages/AdminLoginPage';
import { AdminDashboardPage } from '@/pages/AdminDashboardPage';
import { CourseEditorPage } from '@/pages/CourseEditorPage';
import { ProtectedRoute } from '@/components/ProtectedRoute';

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
      {/* Rutas del Panel de Administración */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route 
        path="/admin"
        element={
          <ProtectedRoute>
            <Outlet /> {/* Usamos Outlet para renderizar rutas anidadas */}
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="courses/new" element={<CourseEditorPage />} />
        <Route path="courses/:slug/edit" element={<CourseEditorPage />} />
      </Route>

      {/* Rutas del Sitio Público */}
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