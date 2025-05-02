
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [checkingSession, setCheckingSession] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Check for authentication in localStorage
        const auth = localStorage.getItem('flipboard_auth');
        setHasSession(!!auth);
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setCheckingSession(false);
      }
    };

    checkSession();
  }, []);

  if (isLoading || checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-flipboard-purple animate-spin" />
      </div>
    );
  }

  return (isAuthenticated || hasSession) ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
