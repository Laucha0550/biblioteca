import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  toggleSidebar: () => void;
  openModal: () => void;
}

const Navbar = ({ toggleSidebar, openModal }: NavbarProps) => {
  const [hoveredLink, setHoveredLink] = useState('');

  const handleMouseEnter = (linkName: string) => {
    setHoveredLink(linkName);
  };

  const handleMouseLeave = () => {
    setHoveredLink('');
  };

  return (
    <nav className="top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-violeta5 shadow-lg fixed">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Elementos del lado izquierdo */}
          <div className="flex items-center">
            <h1 className="text-white text-lg font-semibold focus:outline-none">Biblioteca Maximo Meridio 3ero</h1>
          </div>

          {/* Elementos del lado derecho */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex space-x-4">
              <Link to="/menu" className={`text-white relative ${hoveredLink === 'Inicio' ? 'text-violeta5' : ''}`} onMouseEnter={() => handleMouseEnter('Inicio')} onMouseLeave={handleMouseLeave}>
                <div className={`p-5 transition-colors duration-300 ${hoveredLink === 'Inicio' ? 'bg-violeta7' : 'bg-transparent'}`}>Inicio</div>
              </Link>
              <Link to="/Pagina3" className={`text-white relative ${hoveredLink === 'Genero' ? 'text-violeta5' : ''}`} onMouseEnter={() => handleMouseEnter('Genero')} onMouseLeave={handleMouseLeave}>
                <div className={`p-5 transition-colors duration-300 ${hoveredLink === 'Genero' ? 'bg-violeta7' : 'bg-transparent'}`}>Genero</div>
              </Link>
              <Link to="/Persona" className={`text-white relative ${hoveredLink === 'Persona' ? 'text-violeta5' : ''}`} onMouseEnter={() => handleMouseEnter('Persona')} onMouseLeave={handleMouseLeave}>
                <div className={`p-5 transition-colors duration-300 ${hoveredLink === 'Persona' ? 'bg-violeta7' : 'bg-transparent'}`}>Persona</div>
              </Link>
              <Link to="/CAutor" className={`text-white relative ${hoveredLink === 'Crear Autor' ? 'text-violeta5' : ''}`} onMouseEnter={() => handleMouseEnter('Crear Autor')} onMouseLeave={handleMouseLeave}>
                <div className={`p-5 transition-colors duration-300 ${hoveredLink === 'Crear Autor' ? 'bg-violeta7' : 'bg-transparent'}`}>Crear Autor</div>
              </Link>
              <Link to="/MLibro" className={`text-white relative ${hoveredLink === 'Mostar Libro' ? 'text-violeta5' : ''}`} onMouseEnter={() => handleMouseEnter('Mostrar Libro')} onMouseLeave={handleMouseLeave}>
                <div className={`p-5 transition-colors duration-300 ${hoveredLink === 'Mostrar Libro' ? 'bg-violeta7' : 'bg-transparent'}`}>Mostrar Libros</div>
              </Link>
              <Link to="/stock" className={`text-white relative ${hoveredLink === 'Stock' ? 'text-violeta5' : ''}`} onMouseEnter={() => handleMouseEnter('Stock')} onMouseLeave={handleMouseLeave}>
                <div className={`p-5 transition-colors duration-300 ${hoveredLink === 'Stock' ? 'bg-violeta7' : 'bg-transparent'}`}>Stock</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
