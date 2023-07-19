import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

interface NavbarProps {
  isEmpleado: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isEmpleado }) => {
  const [hoveredLink, setHoveredLink] = useState('');
  const navigate = useNavigate();

  const handleMouseEnter = (linkName: string) => {
    setHoveredLink(linkName);
  };

  const handleMouseLeave = () => {
    setHoveredLink('');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <nav className="top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 bg-white supports-backdrop-blur:bg-white/95 dark:bg-violeta5 shadow-lg fixed">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-white text-lg font-semibold focus:outline-none">Biblioteca Rio Negro</h1>
            </div>

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
                {isEmpleado && ( 
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
                )}
                {isEmpleado && ( 
                  <Link
                    to="/App/Mlibro"
                    className={`text-white relative ${hoveredLink === 'Libros' ? 'text-violeta5' : ''}`}
                    onMouseEnter={() => handleMouseEnter('Libros')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div
                      className={`p-5 transition-colors duration-300 ${
                        hoveredLink === 'Libros' ? 'bg-violeta7' : 'bg-transparent'
                      }`}
                    >
                      Libros
                    </div>
                  </Link>
                )}
                {isEmpleado && ( 
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
                )}
                {!isEmpleado && ( 
                  <Link
                    to="/App/Pedido"
                    className={`text-white relative ${hoveredLink === 'Pedido' ? 'text-violeta5' : ''}`}
                    onMouseEnter={() => handleMouseEnter('Pedido')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div
                      className={`p-5 transition-colors duration-300 ${
                        hoveredLink === 'Pedido' ? 'bg-violeta7' : 'bg-transparent'
                      }`}
                    >
                      Pedido
                    </div>
                  </Link>
                )}
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
