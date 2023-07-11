import React, {useEffect, useState, ChangeEvent, SyntheticEvent, FormEvent  } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [contrasena, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // Validar los datos ingresados
    if (email && contrasena) {
      // Enviar los datos al servidor para la autenticación

      // Ejemplo de solicitud utilizando fetch
      fetch('http://192.168.0.191/principal.php?route=usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, contrasena }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error en la autenticación');
          }
        })
        .then((data) => {
          // Manejar la respuesta exitosa del servidor
          // Almacenar el token de autenticación en el cliente
          // Redireccionar a la página principal u otra ruta protegida
        })
        .catch((error) => {
          // Manejar errores de autenticación
          console.error(error);
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full mx-auto p-8 bg-white border border-gray-300 shadow">
        <h2 className="text-2xl font-semibold mb-6">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Contraseña</label>
            <input type="password" id="contrasena" value={contrasena} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required />
          </div>
          <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
