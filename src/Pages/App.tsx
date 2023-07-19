import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar2.tsx';
import Home from './Home.tsx';
import MostrarLibro from './MostrarLibro.tsx';
import PrestamoPage from './Prestamo.tsx';
import MostrarStock from './MostrarStock.tsx';
import FormularioLibros from './Stock.tsx';
import PedidoPage from './Pedido.tsx';
import LoadingScreen from './PantalladeCarga.tsx';

interface AppProps {
  isEmpleado: boolean; // Agrega la prop isClient al componente App
}
const App: React.FC<AppProps> = () => {
  const [loading, setLoading] = useState(true);
  const isEmpleado = JSON.parse(localStorage.getItem('isEmpleado') || 'false');

  // const App: React.FC<AppProps> = ({ isEmpleado }) => {

  useEffect(() => {
    // Simula una tarea de inicio de sesión o carga de datos
    // Aquí puedes realizar las solicitudes necesarias al servidor

    // Por ejemplo, puedes agregar un tiempo de espera simulado con setTimeout
    setTimeout(() => {
      setLoading(false); // Cuando los datos están listos, establece loading en false
    }, 2000); // Tiempo de espera simulado de 2 segundos
  }, []);
  return (
    <div>
      {/* Navbar */}
      <Navbar isEmpleado={isEmpleado} />

      {/* Contenido de las páginas */}
      <Routes>
        <Route path="/" element={<Home isEmpleado={isEmpleado} />} />
        <Route path="/Home" element={<Home isEmpleado={isEmpleado} />} />
        <Route path="/SPrestamo" element={<MostrarStock isEmpleado={isEmpleado} />} />
        <Route path="/Mlibro" element={<MostrarLibro isEmpleado={isEmpleado} />} />
        <Route path="/Stock" element={<FormularioLibros isEmpleado={isEmpleado} />} />
        <Route path="/Pedido" element={<PedidoPage isEmpleado={isEmpleado} />} />
      </Routes>
    </div>
  );
};

export default App;
