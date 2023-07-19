import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import App from './App.tsx';

const Login = () => {
  const [nombreusuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEmpleado, setIsEmpleado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      navigate('/App/');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://192.168.0.191/principal.php?route=autenticacion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombreusuario, contrasena }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
  
        localStorage.setItem('token', token);
        localStorage.setItem('nombreUsuario', nombreusuario);
        setIsLoggedIn(true);
  
        const isUserEmpleado = data.cargo;
        localStorage.setItem('isEmpleado', JSON.stringify(isUserEmpleado));
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Ocurrió un error desconocido');
      }
    }
  };  

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsEmpleado(false);
    localStorage.clear();
  };

  if (isLoggedIn) {
    return (
      <>
        <App isEmpleado={isEmpleado} />
        <button onClick={handleLogout}></button>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-fondologin bg-cover">
      <div className="relative max-w-lg h-screen flex items-center justify-center bg-violeta5 shadow-xl">
        <div className="relative max-w-md w-full mx-auto p-11 bg-white border border-gray-300 shadow-xl">
          <h2 className="text-2xl font-semibold mb-6">Iniciar sesión</h2>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="nombreusuario" className="block mb-2 text-sm font-medium text-gray-700">
                Nombre de usuario
              </label>
              <input
                type="text"
                id="nombreusuario"
                value={nombreusuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-violeta6"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="contrasena" className="block mb-2 text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                id="contrasena"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-violeta6"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-violeta6 text-white py-2 px-4 rounded-md hover:bg-violeta5"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
