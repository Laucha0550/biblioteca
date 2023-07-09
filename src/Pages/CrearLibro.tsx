import React, { useState, useEffect } from 'react';
import axios from 'axios';


const CrearLibro = () => {
  const [nombrelibro, setNombreLibro] = useState('');
  const [isbn, setIsbn] = useState('');
  const [idAutor, setIdAutor] = useState('');
  const [autores, setAutores] = useState([]);
  const [imagen, setImagen] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    obtenerAutores();
  }, []);

  const obtenerAutores = () => {
    axios.get('http://localhost/principal.php?route=autores')
      .then(response => {
        if (Array.isArray(response.data)) {
          setAutores(response.data);
        } else {
          console.error('La respuesta del servidor no es un array:', response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  

  const handleSubmit = event => {
    event.preventDefault();
    // Realizar la solicitud POST para crear el libro
    const nuevoLibro = {
      nombre: nombrelibro,
      isbn: isbn,
      id: idAutor,
      imagen: imagen,
      descripcion: descripcion
    };

    axios.post('http://localhost/principal.php?route=libros', nuevoLibro)
      .then(response => {
        // Manejar la respuesta del servidor
        console.log(response.data);
        // Limpiar los campos del formulario
        // setNombreLibro('');
        // setIsbn('');
        // setIdAutor('');
        // setImagen('');
        // setDescripcion('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Crear Libro</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="resena">Nombre de Libro: </label>
        <textarea id="nombrelibro" name="nombrelibro" rows="4" cols="50" value={nombrelibro} onChange={event => setNombreLibro(event.target.value)}></textarea>
        <br />
        <label htmlFor="isbn">ISBN: </label>
        <textarea id="isbn" name="isbn" rows="4" cols="50" value={isbn} onChange={event => setIsbn(event.target.value)}></textarea>
        <br />
        <label htmlFor="autor">Autor:</label>
        <select id="autor" name="autor" value={idAutor} onChange={event => setIdAutor(event.target.value)}>
          <option value="">Seleccione un Autor</option>
          {autores.map(autor => (
            <option key={autor.id} value={autor.idautor}>{autor.idautor}</option>
          ))}
        </select>
        <br />
        <label htmlFor="imagen">URL de Imagen:</label>
        <textarea id="imagen" name="imagen" rows="4" cols="50" value={imagen} onChange={event => setImagen(event.target.value)}></textarea>
        <br />
        <label htmlFor="descripcion">Sinopsis:</label>
        <textarea id="descripcion" name="descripcion" rows="4" cols="50" value={descripcion} onChange={event => setDescripcion(event.target.value)}></textarea>
        <br />
        <button type="submit">Crear Autor</button>
      </form>
    </div>
  );
};

export default CrearLibro;
