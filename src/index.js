import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './Pages/App.tsx';
import Login from './Pages/login.tsx';
import reportWebVitals from './reportWebVitals.js';

const isLoggedIn = () => {
  // Comprueba si el usuario está autenticado verificando si existe un token en el localStorage
  const token = localStorage.getItem('token');
  return !!token;
};

const PrivateRoute = ({ element, ...rest }) => {
  return isLoggedIn() ? element : <Navigate to="/login" />;
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/App/*" element={<PrivateRoute element={<App />} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
