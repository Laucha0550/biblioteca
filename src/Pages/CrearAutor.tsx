import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';

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
    fetch('http://192.168.0.191/principal.php?route=personas')
      .then(response => response.json())
      .then(data => {
        setPersonas(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const autorData = {
      idpersona: idPersona,
      resena: resena
    };

    fetch('http://192.168.0.191/principal.php?route=autores', {
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
        <select id="persona" name="persona" value={idPersona} onChange={(event: ChangeEvent<HTMLSelectElement>) => setIdPersona(event.target.value)}>
          <option value="">Seleccione una persona</option>
          {personas.map(persona => (
            <option key={persona.idpersona} value={persona.idpersona}>{persona.nombre}</option>
          ))}
        </select>
        <br />
        <label htmlFor="resena">Reseña:</label>
        <textarea id="resena" name="resena" rows={rows} cols={cols} value={resena} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setResena(event.target.value)}></textarea>
        <br />
        <button type="submit">Crear Autor</button>
      </form>
    </div>
  );
};

export default CrearAutor;
