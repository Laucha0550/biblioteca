import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import CrearLibroGeneros from './CrearLibroGeneros.tsx';

interface Autor {
  idautor: string;
}

const CrearLibroForm = ({
  onLibroCreado,
}: {
  onLibroCreado: (idLibroo: string) => void;
}) => {
  const [nombrelibro, setNombreLibro] = useState('');
  const [isbn, setIsbn] = useState('');
  const [idAutor, setIdAutor] = useState('');
  const [autores, setAutores] = useState<Autor[]>([]);
  const [imagen, setImagen] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ultimoIdLibro, setUltimoIdLibro] = useState('');

  useEffect(() => {
    obtenerAutores();
  }, []);

  const obtenerAutores = () => {
    fetch('http://192.168.0.191/principal.php?route=autores')
      .then(response => response.json())
      .then(data => {
        setAutores(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const obtenerUltimoIdLibro = () => {
    fetch('http://192.168.0.191/principal.php?route=ultid')
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const ultimoId = data[0].ultimoIdLibro; // Obtener el último ID de libro
          setUltimoIdLibro(ultimoId); // Asignar el último ID de libro a una variable de estado
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const nuevoLibro = {
      nombrelibro: nombrelibro,
      isbn: isbn,
      idautor: idAutor,
      imagen: imagen,
      descripcion: descripcion,
    };

    fetch('http://192.168.0.191/principal.php?route=libros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoLibro),
    })
      .then(response => response.json())
      .then(data => {
        onLibroCreado(data.ultimoIdLibro);
        limpiarCampos();
        obtenerUltimoIdLibro(); // Obtener el último ID de libro
      })
      .catch(error => {
        console.error(error);
      });
  };

  const limpiarCampos = () => {
    setNombreLibro('');
    setIsbn('');
    setIdAutor('');
    setImagen('');
    setDescripcion('');
  };

  const handleNombreLibroChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNombreLibro(event.target.value);
  };

  const handleIsbnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setIsbn(event.target.value);
  };

  const handleIdAutorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setIdAutor(event.target.value);
  };

  const handleImagenChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setImagen(event.target.value);
  };

  const handleDescripcionChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescripcion(event.target.value);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Libro</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="nombrelibro" className="block mb-2">
          Nombre de Libro:
        </label>
        <textarea
          id="nombrelibro"
          name="nombrelibro"
          rows={4}
          cols={50}
          value={nombrelibro}
          onChange={handleNombreLibroChange}
          className="border border-gray-300 rounded p-2 w-full"
        ></textarea>
        <br />
        <label htmlFor="isbn" className="block mb-2">
          ISBN:
        </label>
        <textarea
          id="isbn"
          name="isbn"
          rows={4}
          cols={50}
          value={isbn}
          onChange={handleIsbnChange}
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
          onChange={handleIdAutorChange}
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
          rows={4}
          cols={50}
          value={imagen}
          onChange={handleImagenChange}
          className="border border-gray-300 rounded p-2 w-full"
        ></textarea>
        <br />
        <label htmlFor="descripcion" className="block mb-2">
          Sinopsis:
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          rows={4}
          cols={50}
          value={descripcion}
          onChange={handleDescripcionChange}
          className="border border-gray-300 rounded p-2 w-full"
        ></textarea>
        <br />

        {ultimoIdLibro && (
          <CrearLibroGeneros idLibroo={ultimoIdLibro} />
        )}

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

export default CrearLibroForm;