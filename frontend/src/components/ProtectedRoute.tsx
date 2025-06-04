import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { IUser } from '../models/interfaces/IUser';

interface ProtectedRouteProps {
  children: (user: IUser) => React.ReactNode;
  requireAuth?: boolean;
}

export const ProtectedRoute = ({ children, requireAuth = true }: ProtectedRouteProps) => {
  const { user } = useAuth();
  
  if (requireAuth && !user) {
    return <Navigate to="/signin" replace />;
  }
  
  if (!requireAuth && user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children(user as IUser)}</>;
}; 