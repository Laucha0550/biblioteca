import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.tsx';
import Home from './Home.tsx';
import MostrarLibro from './MostrarLibro.tsx';
import PrestamoPage from './Prestamo.tsx';
import FormularioLibros from './Stock.tsx';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/App/Prestamo" element={<PrestamoPage />} />
        <Route path="/App/Mlibro" element={<MostrarLibro />} />
        <Route path="/App/Stock" element={<FormularioLibros />} />
      </Routes>
    </div>
  );
}

export default App;
