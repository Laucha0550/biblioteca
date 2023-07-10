import React, { useEffect, useState } from 'react';

interface Persona {
  idpersona: string;
  nombre: string;
}

const CrearAutor = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [idPersona, setIdPersona] = useState('');
  const [resena, setResena] = useState('');
  const rows = 4;
  const cols = 50;

  useEffect(() => {
    obtenerPersonas();
  }, []);

  const obtenerPersonas = () => {
    fetch('http://localhost/principal.php?route=personas')
      .then(response => response.json())
      .then(data => {
        setPersonas(data);
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

    fetch('http://localhost/principal.php?route=autores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(autorData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
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
        <textarea id="resena" name="resena" rows={4} cols={50} value={resena} onChange={event => setResena(event.target.value)}></textarea>
        <br />
        <button type="submit">Crear Autor</button>
      </form>
    </div>
  );
};

export default CrearAutor;
