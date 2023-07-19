import React, { useState, useEffect } from 'react';

interface HomeProps {
  isEmpleado: boolean;
}

interface Prestamo {
  id: number;
  fechaPrestamo: string;
  libro: string;
}

const Home: React.FC<HomeProps> = ({ isEmpleado }) => {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);

  useEffect(() => {
    if (!isEmpleado) {
      // Realizar el fetch para obtener la lista de préstamos del usuario con el ID específico
      fetch('http://192.168.0.191/principal.php?route=prestamos')
        .then((response) => response.json())
        .then((data) => setPrestamos(data))
        .catch((error) => console.error('Error al obtener los préstamos:', error));
    }
  }, [isEmpleado]);

  return (
    <div className="mt-16 p-10">
      <h2>Página de Inicio</h2>
      {isEmpleado ? (
        <div>
          <p>Bienvenido empleado, aquí tienes acceso a contenido especial para empleados.</p>
        </div>
      ) : (
        <div>
          <p>Bienvenido cliente, aquí tienes acceso a contenido especial para clientes.</p>
          {/* Lista de préstamos */}
          <h3>Tus préstamos:</h3>
          <ul>
            {prestamos.map((prestamo) => (
              <li key={prestamo.id}>
                Fecha de préstamo: {prestamo.fechaPrestamo}, Libro: {prestamo.libro}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
