import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.tsx';
import Home from './Home.tsx';
import MostrarLibro from './MostrarLibro.tsx';
import PrestamoPage from './Prestamo.tsx';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/App/Prestamo" element={<PrestamoPage />} />
        <Route path="/App/Mlibro" element={<MostrarLibro />} />
      </Routes>
    </div>
  );
}

export default App;
