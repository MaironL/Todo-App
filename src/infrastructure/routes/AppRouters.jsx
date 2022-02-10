import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as C from '../screens';

const AppRouters = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<C.Home />} />
        <Route path='*' element={<C.Error />} />
      </Routes>
    </Router>
  );
};

export default AppRouters;
