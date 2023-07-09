import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Persona {
  nombre: string;
  apellido: string;
  email: string;
}

const ListaPersonas: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);

  useEffect(() => {
    // Hacer la solicitud GET al backend para obtener los datos de la tabla personas
    axios.get('http://192.168.0.191/principal.php?route=personas')
      .then(response => {
        // Actualizar el estado con los datos obtenidos
        setPersonas(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="text-black">
      <h1 className="text-2xl font-bold mb-4">Lista de Personas</h1>
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Apellido</th>
            <th className="border p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {personas.map(persona => (
            <tr key={persona.email}>
              <td className="border p-2">{persona.nombre}</td>
              <td className="border p-2">{persona.apellido}</td>
              <td className="border p-2">{persona.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaPersonas;
