import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // Lógica para realizar la autenticación y establecer el estado de autenticación
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Lógica para cerrar sesión y restablecer el estado de autenticación
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
