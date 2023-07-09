import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Autor {
  id: number;
  nombre: string;
  // Otros campos del autor
}

const CrearLibro: React.FC = () => {
  const [nombreLibro, setNombreLibro] = useState('');
  const [isbn, setIsbn] = useState('');
  const [idAutor, setIdAutor] = useState(0);
  const [autores, setAutores] = useState<Autor[]>([]);
  const [imagen, setImagen] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    // Obtener la lista de autores para seleccionar uno
    axios.get('http://localhost:8080/api/autores')
      .then(response => {
        setAutores(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Realizar la solicitud POST para crear el libro
    const nuevoLibro = {
      nombreLibro,
      isbn,
      idAutor,
      imagen,
      descripcion
    };
    axios.post('http://localhost:8080/api/libros', nuevoLibro)
      .then(response => {
        // Manejar la respuesta del servidor
        console.log(response.data);
        // Limpiar los campos del formulario
        setNombreLibro('');
        setIsbn('');
        setIdAutor(0);
        setImagen('');
        setDescripcion('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Crear Libro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombreLibro">Nombre del Libro:</label>
          <input
            type="text"
            id="nombreLibro"
            value={nombreLibro}
            onChange={e => setNombreLibro(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="isbn">ISBN:</label>
          <input
            type="text"
            id="isbn"
            value={isbn}
            onChange={e => setIsbn(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="idAutor">Autor:</label>
          <select
            id="idAutor"
            value={idAutor}
            onChange={e => setIdAutor(Number(e.target.value))}
          >
            <option value={0}>Seleccionar autor...</option>
            {autores.map(autor => (
              <option key={autor.id} value={autor.id}>
                {autor.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="imagen">URL de la Imagen:</label>
          <input
            type="text"
            id="imagen"
            value={imagen}
            onChange={e => setImagen(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
          />
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default CrearLibro;
