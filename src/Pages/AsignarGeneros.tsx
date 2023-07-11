import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import AsignarGeneros from './AsignarGeneros';

interface Autor {
  idautor: string;
}

interface Genero {
  idgenero: string;
  nombregenero: string;
}

const CrearLibro = () => {
  const [nombrelibro, setNombreLibro] = useState('');
  const [isbn, setIsbn] = useState('');
  const [idAutor, setIdAutor] = useState('');
  const [autores, setAutores] = useState<Autor[]>([]);
  const [imagen, setImagen] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [generosSeleccionados, setGenerosSeleccionados] = useState<string[]>([]);
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [idLibroCreado, setIdLibroCreado] = useState('');
  const [mostrarVentanaGeneros, setMostrarVentanaGeneros] = useState(false);

  useEffect(() => {
    obtenerAutores();
  }, []);

  const obtenerAutores = () => {
    fetch('http://192.168.0.191/principal.php?route=autores')
      .then(response => response.json())
      .then(data => {
        setAutores(data);
        obtenerGeneros();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const obtenerGeneros = () => {
    fetch('http://192.168.0.191/principal.php?route=generos')
      .then(response => response.json())
      .then(data => {
        setGeneros(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleGeneroChange = (event: ChangeEvent<HTMLInputElement>) => {
    const generoId = event.target.value;
    if (event.target.checked) {
      setGenerosSeleccionados([...generosSeleccionados, generoId]);
    } else {
      setGenerosSeleccionados(generosSeleccionados.filter(idgenero => idgenero !== generoId.toString()));
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const nuevoLibro = {
      nombrelibro: nombrelibro,
      isbn: isbn,
      idautor: idAutor,
      imagen: imagen,
      descripcion: descripcion,
      generos: generosSeleccionados
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
        const idlibro = data.idlibro; // Obtén el ID del libro recién creado

        asignarGeneros(idlibro);
        setMostrarVentanaGeneros(true); // Mostrar la ventana emergente
        setMensaje('Se ha creado el libro correctamente');
        limpiarCampos();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const asignarGeneros = (idlibro: string) => {
    const promises = generosSeleccionados.map(idgenero => {
      const generoLibro = {
        idgenero: idgenero,
        idlibro: idlibro,
      };

      return fetch('http://192.168.0.191/principal.php?route=rutagl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(generoLibro),
      });
    });

    Promise.all(promises)
      .then(responses => {
        console.log(responses);
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

  const handleNombreLibroChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNombreLibro(event.target.value);
  };

  const handleIsbnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsbn(event.target.value);
  };

  const handleIdAutorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setIdAutor(event.target.value);
  };

  const handleImagenChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImagen(event.target.value);
  };

  const handleDescripcionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescripcion(event.target.value);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Libro</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="nombrelibro" className="block mb-2">
          Nombre de Libro:
        </label>
        <input
          id="nombrelibro"
          name="nombrelibro"
          type="text"
          value={nombrelibro}
          onChange={handleNombreLibroChange}
          className="border border-gray-300 rounded p-2 mb-4"
        />

        <label htmlFor="isbn" className="block mb-2">
          ISBN:
        </label>
        <input
          id="isbn"
          name="isbn"
          type="text"
          value={isbn}
          onChange={handleIsbnChange}
          className="border border-gray-300 rounded p-2 mb-4"
        />

        <label htmlFor="autor" className="block mb-2">
          Autor:
        </label>
        <select
          id="autor"
          name="autor"
          value={idAutor}
          onChange={handleIdAutorChange}
          className="border border-gray-300 rounded p-2 mb-4"
        >
          <option value="">Seleccione un Autor</option>
          {autores.map(autor => (
            <option key={autor.idautor} value={autor.idautor}>
              {autor.idautor}
            </option>
          ))}
        </select>

        <label htmlFor="imagen" className="block mb-2">
          URL de Imagen:
        </label>
        <input
          id="imagen"
          name="imagen"
          type="text"
          value={imagen}
          onChange={handleImagenChange}
          className="border border-gray-300 rounded p-2 mb-4"
        />

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
          className="border border-gray-300 rounded p-2 mb-4"
        ></textarea>

        <label className="block mb-2">Géneros:</label>
        {generos.map(genero => (
          <label key={genero.idgenero} className="flex items-center">
            <input
              type="checkbox"
              value={genero.idgenero}
              checked={generosSeleccionados.includes(genero.idgenero)}
              onChange={handleGeneroChange}
              className="mr-2"
            />
            <span>{genero.nombregenero}</span>
          </label>
        ))}

        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 mt-4"
        >
          Crear Libro
        </button>
      </form>

      {mensaje && <p className="text-green-500 mb-4">{mensaje}</p>}

      {mostrarVentanaGeneros && <AsignarGeneros idLibro={idLibroCreado} />}
    </div>
  );
};

export default CrearLibro;
