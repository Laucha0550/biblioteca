import React, { useState } from 'react';

interface Persona {
  nombre: string;
  apellido: string;
  email: string;
  dni: string;
  telefono: string;
}

const CrearPersonas = () => {
  const [persona, setPersona] = useState<Persona>({
    nombre: '',
    apellido: '',
    email: '',
    dni: '',
    telefono: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch('http://localhost/principal.php?route=personas', {
      method: 'POST',
      body: JSON.stringify(persona),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log('Persona guardada:', data))
      .catch((error) => console.error('Error al guardar la persona:', error));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPersona((prevPersona) => ({
      ...prevPersona,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-4 bg-gray-100 rounded shadow">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-gray-700 font-bold mb-2">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={persona.nombre}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="apellido" className="block text-gray-700 font-bold mb-2">
            Apellido:
          </label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={persona.apellido}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={persona.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dni" className="block text-gray-700 font-bold mb-2">
            DNI:
          </label>
          <input
            type="text"
            id="dni"
            name="dni"
            value={persona.dni}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="telefono" className="block text-gray-700 font-bold mb-2">
            Teléfono:
          </label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={persona.telefono}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};

export default CrearPersonas;
