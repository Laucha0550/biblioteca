import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Modal from 'react-modal';
import Home from './Home.tsx';
import ItemsPage from './ItemsPage.tsx';
import ListaPersonas from './Persona.tsx';
import CrearAutor from './CrearAutor.tsx';
import CrearLibro from './CrearLibro.tsx';
import Navbar from './Navbar.tsx';
import MostrarLibro from './MostrarLibro.tsx';

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
      <li className="mb-2">
        <Link to="/MLibro" className=" text-vintaje4 hover:underline">Mostrar Libros</Link>
      </li>
    </ul>
  </div>
);

type NavbarProps = {
  toggleSidebar: () => void;
  openModal: () => void;
};


const Outlet = () => {
  const [generos, setGeneros] = useState([]);
  const [filteredGeneros, setFilteredGeneros] = useState([]);

  return (
    <div className="container mx-auto text-blue-200">
      {/* <Buscador filterList={filterList} /> Agregar el componente Buscador aquí */}
      <div className="p-4">
        <Routes>
          <Route path="/menu" element={<Home />} />
          {/* <Route path="/pagina3" element={<GeneroListPage generos={filteredGeneros} />} /> Usar filteredGeneros en lugar de generos */}
          <Route path="/persona" element={<ListaPersonas />} />
          <Route path="/cautor" element={<CrearAutor />} />
          <Route path="/clibro" element={<CrearLibro />} />
          <Route path="/mlibro" element={<MostrarLibro />} />
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
      <Navbar toggleSidebar={() => { }} openModal={toggleModal} />
      <div className="min-h-screen bg-gradient-to-b from-violeta9 to-violeta8">

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
        <Modal
          isOpen={showModal}
          onRequestClose={toggleModal}
          contentLabel="Cargar Items">
          <ItemsPage closeModal={toggleModal} />
        </Modal>
      </div>

    </Router>
  );
};

export default App;
