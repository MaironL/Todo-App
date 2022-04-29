import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import PersistAuthRoutes from './PersistAuthRoutes';
import * as C from 'infrastructure/screens';

const AppRouters = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path='/signIn' element={<C.SignIn />} />
        <Route path='/unauthorized' element={<C.Unauthorized />} />
        {/* Persisted Login */}
        <Route element={<PersistAuthRoutes />}>
          {/* Private routes */}
          <Route element={<ProtectedRoutes allowedRoles={['Admin', 'User']} />}>
            <Route path='/' element={<C.Home />} />
          </Route>
        </Route>

        {/* Persisted Login */}
        <Route path='*' element={<C.Error />} />
      </Routes>
    </Router>
  );
};

export default AppRouters;
