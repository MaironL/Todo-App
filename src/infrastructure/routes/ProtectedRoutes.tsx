import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from 'infrastructure/Auth/useAuth';

interface IProtectedRoutes {
  allowedRoles?: string[];
}

function ProtectedRoutes({ allowedRoles }: IProtectedRoutes) {
  const location = useLocation();
  const { isAuth } = useAuth();

  return allowedRoles?.includes(isAuth().role) ? (
    <Outlet />
  ) : isAuth().name ? (
    <Navigate to='/unauthorized' replace state={{ from: location }} />
  ) : (
    <Navigate to='/signIn' replace state={{ from: location }} />
  );
}

export default ProtectedRoutes;
