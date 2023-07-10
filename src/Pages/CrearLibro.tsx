import React, { useState, useEffect } from 'react';

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
    fetch('http://localhost/principal.php?route=autores')
      .then(response => response.json())
      .then(data => {
        setAutores(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSubmit = event => {
    event.preventDefault();

    const nuevoLibro = {
      nombrelibro: nombrelibro,
      isbn: isbn,
      idautor: idAutor,
      imagen: imagen,
      descripcion: descripcion
    };

    axios
      .post('http://192.168.0.191/principal.php?route=libros', nuevoLibro)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Libro</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="resena" className="block mb-2">
          Nombre de Libro:
        </label>
        <textarea
          id="nombrelibro"
          name="nombrelibro"
          rows="4"
          cols="50"
          value={nombrelibro}
          onChange={event => setNombreLibro(event.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        ></textarea>
        <br />
        <label htmlFor="isbn" className="block mb-2">
          ISBN:
        </label>
        <textarea
          id="isbn"
          name="isbn"
          rows="4"
          cols="50"
          value={isbn}
          onChange={event => setIsbn(event.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        ></textarea>
        <br />
        <label htmlFor="autor" className="block mb-2">
          Autor:
        </label>
        <select
          id="autor"
          name="autor"
          value={idAutor}
          onChange={event => setIdAutor(event.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        >
          <option value="">Seleccione un Autor</option>
          {autores.map(autor => (
            <option key={autor.idautor} value={autor.idautor}>
              {autor.idautor}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="imagen" className="block mb-2">
          URL de Imagen:
        </label>
        <textarea
          id="imagen"
          name="imagen"
          rows="4"
          cols="50"
          value={imagen}
          onChange={event => setImagen(event.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        ></textarea>
        <br />
        <label htmlFor="descripcion" className="block mb-2">
          Sinopsis:
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          rows="4"
          cols="50"
          value={descripcion}
          onChange={event => setDescripcion(event.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        ></textarea>
        <br />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 mt-4"
        >
          Crear Libro
        </button>
      </form>
    </div>
  );
};

export default CrearLibro;
