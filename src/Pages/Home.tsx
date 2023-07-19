import React from 'react';

interface HomeProps {
  isEmpleado: boolean;
}

const Home: React.FC<HomeProps> = ({ isEmpleado }) => {
  return (
    <div>
      <h2>Página de Inicio</h2>
      {isEmpleado ? (
        <p>Bienvenido cliente, aquí tienes acceso a contenido especial para clientes.</p>
      ) : (
        <p>Bienvenido empleado, aquí tienes acceso a contenido especial para empleados.</p>
      )}
    </div>
  );
};

export default Home;
