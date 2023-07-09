import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CrearAutor = () => {
  const [personas, setPersonas] = useState([]);
  const [idPersona, setIdPersona] = useState('');
  const [resena, setResena] = useState('');

  useEffect(() => {
    obtenerPersonas();
  }, []);

  const obtenerPersonas = () => {
    axios.get('http://localhost/principal.php?route=personas')
      .then(response => {
        setPersonas(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSubmit = event => {
    event.preventDefault();

    const autorData = {
      idpersona: idPersona,
      resena: resena
    };

    axios.post('http://localhost/principal.php?route=autores', autorData)
      .then(response => {
        console.log(response.data);
        // Aquí puedes realizar alguna acción adicional después de crear el autor
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Crear Autor</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="persona">Persona:</label>
        <select id="persona" name="persona" value={idPersona} onChange={event => setIdPersona(event.target.value)}>
          <option value="">Seleccione una persona</option>
          {personas.map(persona => (
            <option key={persona.idpersona} value={persona.idpersona}>{persona.nombre}</option>
          ))}
        </select>
        <br />
        <label htmlFor="resena">Reseña:</label>
        <textarea id="resena" name="resena" rows="4" cols="50" value={resena} onChange={event => setResena(event.target.value)}></textarea>
        <br />
        <button type="submit">Crear Autor</button>
      </form>
    </div>
  );
};

export default CrearAutor;
