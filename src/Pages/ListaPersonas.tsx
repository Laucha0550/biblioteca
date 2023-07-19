import React, { useEffect, useState } from 'react';

interface Persona {
  nombre: string;
  apellido: string;
  email: string;
}

const ListaPersonas: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [personaEditando, setPersonaEditando] = useState<Persona | null>(null);

  useEffect(() => {
    fetch('http://192.168.0.191/principal.php?route=personas')
      .then(response => response.json())
      .then(data => {
        setPersonas(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleEliminarPersona = (email: string) => {
    fetch(`http://192.168.0.191/principal.php?route=personas/${email}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        setPersonas(prevPersonas => prevPersonas.filter(persona => persona.email !== email));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleEditarPersona = (email: string) => {
    const personaSeleccionada = personas.find(persona => persona.email === email);
    if (personaSeleccionada) {
      setPersonaEditando(personaSeleccionada);
    }
  };

  const handleGuardarEdicion = (personaEditada: Persona) => {
    fetch(`http://192.168.0.191/principal.php?route=personas/${personaEditada.email}`, {
      method: 'PUT',
      body: JSON.stringify(personaEditada),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setPersonas(prevPersonas =>
          prevPersonas.map(persona => (persona.email === personaEditada.email ? personaEditada : persona))
        );
        setPersonaEditando(null);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleCancelarEdicion = () => {
    setPersonaEditando(null);
  };

  return (
    <div className="text-black">
      <h1 className="text-2xl font-bold mb-4">Lista de Personas</h1>
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Apellido</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personas.map(persona => (
            <tr key={persona.email}>
              <td className="border p-2">{persona.nombre}</td>
              <td className="border p-2">{persona.apellido}</td>
              <td className="border p-2">{persona.email}</td>
              <td className="border p-2">
                {personaEditando?.email === persona.email ? (
                  <>
                    <button
                      onClick={() => handleGuardarEdicion(personaEditando)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={handleCancelarEdicion}
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEliminarPersona(persona.email)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => handleEditarPersona(persona.email)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Editar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaPersonas;
