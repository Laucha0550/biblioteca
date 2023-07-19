import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.tsx';
import Home from './Home.tsx';
import MostrarLibro from './MostrarLibro.tsx';
import PrestamoPage from './Prestamo.tsx';
import MostrarStock from './MostrarStock.tsx';
import FormularioLibros from './Stock.tsx';
import PedidoPage from './Pedido.tsx';
import LoadingScreen from './PantalladeCarga.tsx';
import CrearClienteUsuario from './CrearCliente.tsx';

interface AppProps {
  isEmpleado: boolean;
}
const App: React.FC<AppProps> = () => {
  const [loading, setLoading] = useState(true);
  const isEmpleado = JSON.parse(localStorage.getItem('isEmpleado') || 'false');

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 2000); 
  }, []);
  return (
    <div>
      <Navbar isEmpleado={isEmpleado} />

      <Routes>
        <Route path="/" element={<Home isEmpleado={isEmpleado} />} />
        <Route path="/Home" element={<Home isEmpleado={isEmpleado} />} />
        <Route path="/SPrestamo" element={<MostrarStock isEmpleado={isEmpleado} />} />
        <Route path="/Mlibro" element={<MostrarLibro isEmpleado={isEmpleado} />} />
        <Route path="/Stock" element={<FormularioLibros isEmpleado={isEmpleado} />} />
        <Route path="/Pedido" element={<PedidoPage isEmpleado={isEmpleado} />} />
        <Route path="/CCliente" element={<CrearClienteUsuario isEmpleado={isEmpleado} />} />
      </Routes>
    </div>
  );
};

export default App;
