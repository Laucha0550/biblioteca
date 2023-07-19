import '../index.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [hoveredLink, setHoveredLink] = useState('');
  const navigate = useNavigate();

  const handleMouseEnter = (linkName: string) => {
    setHoveredLink(linkName);
  };

  const handleMouseLeave = () => {
    setHoveredLink('');
  };

  const handleLogout = () => {
    // Elimina el token del localStorage y redirige al login
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <nav className="top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-violeta5 shadow-lg fixed">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Elementos del lado izquierdo */}
            <div className="flex items-center">
              <h1 className="text-white text-lg font-semibold focus:outline-none">Biblioteca La Librería</h1>
            </div>

            {/* Elementos del lado derecho */}
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex space-x-4">
                <Link
                  to="/App/Home"
                  className={`text-white relative ${hoveredLink === 'Inicio' ? 'text-violeta5' : ''}`}
                  onMouseEnter={() => handleMouseEnter('Inicio')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    className={`p-5 transition-colors duration-300 ${
                      hoveredLink === 'Inicio' ? 'bg-violeta7' : 'bg-transparent'
                    }`}
                  >
                    Inicio
                  </div>
                </Link>
                <Link
                  to="/App/Pedido"
                  className={`text-white relative ${hoveredLink === 'Genero' ? 'text-violeta5' : ''}`}
                  onMouseEnter={() => handleMouseEnter('Genero')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    className={`p-5 transition-colors duration-300 ${
                      hoveredLink === 'Genero' ? 'bg-violeta7' : 'bg-transparent'
                    }`}
                  >
                    Pedido
                  </div>
                </Link>
                <Link
                  to="/App/Stock"
                  className={`text-white relative ${hoveredLink === 'Stock' ? 'text-violeta5' : ''}`}
                  onMouseEnter={() => handleMouseEnter('Stock')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    className={`p-5 transition-colors duration-300 ${
                      hoveredLink === 'Stock' ? 'bg-violeta7' : 'bg-transparent'
                    }`}
                  >
                    Stock
                  </div>
                </Link>
                <Link
                  to="/App/SPrestamo"
                  className={`text-white relative ${hoveredLink === 'Prestamo' ? 'text-violeta5' : ''}`}
                  onMouseEnter={() => handleMouseEnter('Prestamo')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    className={`p-5 transition-colors duration-300 ${
                      hoveredLink === 'Prestamo' ? 'bg-violeta7' : 'bg-transparent'
                    }`}
                  >
                    Prestamo
                  </div>
                </Link>
                <Link
                  to="/App/MLibro"
                  className={`text-white relative ${hoveredLink === 'Mostrar Libro' ? 'text-violeta5' : ''}`}
                  onMouseEnter={() => handleMouseEnter('Mostrar Libro')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    className={`p-5 transition-colors duration-300 ${
                      hoveredLink === 'Mostrar Libro' ? 'bg-violeta7' : 'bg-transparent'
                    }`}
                  >
                    Mostrar Libros
                  </div>
                </Link>
                <Link
                  to="/App/CCliente"
                  className={`text-white relative ${hoveredLink === 'Cliente' ? 'text-violeta5' : ''}`}
                  onMouseEnter={() => handleMouseEnter('Cliente')}
                  onMouseLeave={handleMouseLeave}
                >
                  <div
                    className={`p-5 transition-colors duration-300 ${
                      hoveredLink === 'Cliente' ? 'bg-violeta7' : 'bg-transparent'
                    }`}
                  >
                    Cliente
                  </div>
                </Link>
                {/* Botón para cerrar sesión */}
                <button
                  onClick={handleLogout}
                  className="text-white relative bg-transparent p-5 transition-colors duration-300"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;



