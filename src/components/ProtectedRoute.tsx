
// FILE: src/components/ProtectedRoute.tsx
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
        navigate('/admin/login');
      } else if (data.session) {
        setSession(data.session);
      } else {
        navigate('/admin/login');
      }
      setLoading(false);
    };

    fetchSession();

    // Escuchar cambios en la autenticación (login/logout en otra pestaña)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setSession(session);
        } else {
          setSession(null);
          navigate('/admin/login');
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Cargando sesión...</p>
      </div>
    );
  }

  // Si hay sesión, renderiza el contenido protegido
  return session ? <>{children}</> : null;
}
