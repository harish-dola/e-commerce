import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isAuthenticated, initializing } = useAuth();

  if (initializing) {
    return <div className="state-panel">Loading session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
