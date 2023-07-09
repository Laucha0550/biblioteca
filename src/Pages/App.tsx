import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import Home from './Home.tsx';
import GeneroListPage from './Pagina3.tsx';
import Buscador from './Buscador.tsx';
import ItemsPage from './ItemsPage.tsx';
import ListaPersonas from './Persona.tsx';
import CrearAutor from './CrearAutor.tsx';
import CrearLibro from './CrearLibro.tsx';

const Sidebar = () => (
  <div className={'hidden lg:block fixed backdrop-blur inset-0 top-[3.8125rem] right-auto w-[16rem] pb-10 px-8 overflow-y-auto'}>
    <ul className="p-4">
      <li className="mb-2">
        <Link to="/menu" className=" text-vintaje4 hover:underline">Inicio</Link>
      </li>
      <li className="mb-2">
        <Link to="/Pagina3" className=" text-vintaje4 hover:underline">Genero</Link>
      </li>
      <li className="mb-2">
        <Link to="/Persona" className=" text-vintaje4 hover:underline">Persona</Link>
      </li>
      <li className="mb-2">
        <Link to="/CAutor" className=" text-vintaje4 hover:underline">Crear Autor</Link>
      </li>
      <li className="mb-2">
        <Link to="/CLibro" className=" text-vintaje4 hover:underline">Crear Libro</Link>
      </li>
    </ul>
  </div>
);

type NavbarProps = {
  toggleSidebar: () => void;
  openModal: () => void;
};

const Navbar = ({ toggleSidebar, openModal }: NavbarProps) => (
  <nav className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-vintaje2">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <h1 className="text-black text-lg font-semibold focus:outline-none">Biblioteca Maximo Meridio 3ero</h1>
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 mt-4 rounded"
          onClick={openModal}
        >
          Abrir Página Emergente
        </button>
      </div>
    </div>
  </nav>
);

const Outlet = () => {
  const [generos, setGeneros] = useState([]);
  const [filteredGeneros, setFilteredGeneros] = useState([]);

  useEffect(() => {
    // Realizar la llamada a la API para obtener los géneros
    axios.get('https://biblioteca-2023.web.app/genero')
      .then(response => {
        setGeneros(response.data);
        setFilteredGeneros(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const filterList = (searchTerm: string) => {
    const filteredList = generos.filter(genero =>
      genero.NombreGenero.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGeneros(filteredList);
  };

  return (
    <div className="container mx-auto text-blue-200">
      <h1 className="text-2xl font-bold mt-4 text-blue-200">Página de inicio</h1>
      <Buscador filterList={filterList} /> {/* Agregar el componente Buscador aquí */}
      <div className="p-4">
        <Routes>
          <Route path="/menu" element={<Home />} />
          <Route path="/pagina3" element={<GeneroListPage generos={filteredGeneros} />} /> {/* Usar filteredGeneros en lugar de generos */}
          <Route path="/persona" element={<ListaPersonas />} />
          <Route path="/cautor" element={<CrearAutor />} />
          <Route path="/clibro" element={<CrearLibro />} />
        </Routes>
      </div>
    </div>
  );
};


const App = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Router>
      <div className="flex bg-vintaje1 flex-col">
        <Navbar toggleSidebar={() => {}} openModal={toggleModal} />
        <div className="flex">
          <div className="w-64">
            <Sidebar />
          </div>
          <div className="flex-1">
            <div className="overflow-y-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showModal}
        onRequestClose={toggleModal}
        contentLabel="Cargar Items"
      >
        <ItemsPage closeModal={toggleModal} />
      </Modal>
    </Router>
  );
};

export default App;
