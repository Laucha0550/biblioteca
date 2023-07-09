import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Persona {
  id: number;
  nombre: string;
  // Otros campos de persona
}

const CrearAutor: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [idpersona, setIdPersona] = useState(0);
  const [resena, setReseña] = useState('');

  useEffect(() => {
    // Obtener la lista de personas para seleccionar una
    axios.get('http://localhost/principal.php?route=personas')
      .then(response => {
        setPersonas(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Realizar la solicitud POST para crear el autor
    const nuevoAutor = {
      idpersona,
      resena
    };
    axios.post('http://localhost/principal.php?route=autores', nuevoAutor)
      .then(response => {
        // Manejar la respuesta del servidor
        console.log(response.data);
        // Limpiar los campos del formulario
        setIdPersona(0);
        setReseña('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Crear Autor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="idpersona">Persona:</label>
          <select
            id="idpersona"
            value={idpersona}
            onChange={e => setIdPersona(Number(e.target.value))}
          >
            <option value={0}>Seleccionar persona...</option>
            {personas.map(persona => (
              <option key={persona.id} value={persona.id}>
                {persona.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="resena">Reseña:</label>
          <textarea
            id="resena"
            value={resena}
            onChange={e => setReseña(e.target.value)}
          />
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CrearAutor;
