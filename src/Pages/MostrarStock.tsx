import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PrestamoPage from './Prestamo.tsx';
import libro from '../img/icolibro.png';

interface Libro {
  idlibro: string;
  nombrelibro: string;
  isbn: string;
  idautor: string;
  imagen: string;
  descripcion: string;
  nomautor: string;
}

interface Genero {
  idgenero: string;
  nombregenero: string;
}

interface Stock {
  idstock: string;
  idlibro: string;
  disponible: string;
}
interface MostrarStocksProps {
  isEmpleado: boolean;
}

  const MostrarStock: React.FC<MostrarStocksProps> = ({ isEmpleado }) => {

  const [libros, setLibros] = useState<Libro[]>([]);
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [generosSeleccionados, setGenerosSeleccionados] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [librosSeleccionados, setLibrosSeleccionados] = useState<{ idlibro: string, nombrelibro: string }[]>([]);
  const [mostrarListaSeleccionada, setMostrarListaSeleccionada] = useState(false);
  const [mostrarFormularioPrestamo, setMostrarFormularioPrestamo] = useState(false);

  useEffect(() => {
    obtenerLibros();
    obtenerGeneros();
    obtenerStock();
  }, []);

  const obtenerLibros = () => {
    let url = 'http://192.168.0.191/principal.php?route=libautnom';

    if (generosSeleccionados.length > 0) {
      const generosQuery = generosSeleccionados.join(',');
      url = `http://192.168.0.191/principal.php?route=lixgen=${generosQuery}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setLibros(data);
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

  const obtenerStock = () => {
    fetch('http://192.168.0.191/principal.php?route=stocks')
      .then(response => response.json())
      .then(data => {
        setStocks(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Resetear la página actual al realizar una búsqueda
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;

  const filteredBooks = libros.filter(libro =>
    libro.nombrelibro.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getDisponible = (id: string) => {
    const stockSum = stocks.reduce((total, stock) => {
      if (stock.idlibro === id && stock.disponible === 't') {
        return total + 1;
      }
      return total;
    }, 0);

    return stockSum.toString();
  };

  
  const agregarLibroSeleccionado = (libro: Libro) => {
    const disponible = getDisponible(libro.idlibro);

    if (disponible !== '0' && librosSeleccionados.length < 3) {
      const nuevoLibroSeleccionado = {
        idlibro: libro.idlibro,
        nombrelibro: libro.nombrelibro
      };

      setLibrosSeleccionados([...librosSeleccionados, nuevoLibroSeleccionado]);
    }
  };

  const eliminarLibroSeleccionado = (libro: Libro) => {
    const updatedList = librosSeleccionados.filter(l => l.idlibro !== libro.idlibro);
    setLibrosSeleccionados(updatedList);
  };

  const handleMostrarListaSeleccionada = () => {
    setMostrarListaSeleccionada(!mostrarListaSeleccionada);
  };

  const handleMostrarFormularioPrestamo = () => {
    setMostrarFormularioPrestamo(true);
  };

  const handleCerrarFormularioPrestamo = () => {
    setMostrarFormularioPrestamo(false);
  };

  return (
    <div className="p-4">
      <div className="fixed bottom-4 right-4 z-10"></div>

      <div className="p-2 md:w-1/4 lg:w-1/5 mt-12 text-black">
        <input
          className="p-3 brown-bg rounded w-full"
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Buscar por nombre de libro"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-14 relative text-center text-black">
        {currentBooks.map(libro => (
          <div key={libro.idlibro} className="bg-violeta5 bg-opacity-50 shadow-xl text-center p-4 rounded">
            <h2 className="text-lg font-bold">{libro.nombrelibro}</h2>
            <p>ISBN: {libro.isbn}</p>
            <p>Autor: {libro.nomautor}</p>
            <p>Cantidad disponible: {getDisponible(libro.idlibro)}</p>
            <img src={libro.imagen} alt="Portada del libro" className="w-full max-h-64 object-contain " />
            <p>{libro.descripcion}</p>
            {librosSeleccionados.some(l => l.idlibro === libro.idlibro) ? (
              <button className="bg-red-500 text-white p-2 rounded-xl text-xl w-full shadow-lg " onClick={() => eliminarLibroSeleccionado(libro)}>Quitar</button>
            ) : (
              <button className="bg-green-500 text-white p-2 rounded-xl text-xl w-full shadow-lg " onClick={() => agregarLibroSeleccionado(libro)} disabled={getDisponible(libro.idlibro) === '0'}>
                Agregar
              </button>
            )}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
  <div className="pagination p-4 mt-12 text-black">
    <button
      onClick={previousPage}
      className={`pagination-item brown-bg ${currentPage === 1 ? 'disabled' : ''}`}
      disabled={currentPage === 1}
    >
      Página anterior
    </button>
    <button
      onClick={nextPage}
      className={`pagination-item brown-bg ${currentPage === totalPages ? 'disabled' : ''}`}
      disabled={currentPage === totalPages}
    >
      Página siguiente
    </button>
  </div>
)}

      {mostrarFormularioPrestamo && librosSeleccionados.length > 0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <PrestamoPage librosSeleccionados={librosSeleccionados} />
            <button onClick={handleCerrarFormularioPrestamo}>Cerrar</button>
          </div>
        </div>
      )}
      {librosSeleccionados.length > 0 && (
        <div className="mt-16 fixed bottom-20 right-4">
          <button className=" bg-violeta5 text-white p-5 rounded-full opacity-90"onClick={handleMostrarListaSeleccionada}>
            {mostrarListaSeleccionada ? <img src={libro} className='w-10 h-10' /> : <img src={libro} className='w-10 h-10 ' />}
          </button>
          {mostrarListaSeleccionada && (
            <div className="mt-16 fixed bottom-20 right-20 ">
              <h2>Lista de libros seleccionados:</h2>
              <ul>
                {librosSeleccionados.map(libro => (
                  <li key={libro.idlibro}>{libro.nombrelibro}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <button className="fixed bottom-4 right-4 z-10 bg-violeta5 text-white p-5 rounded-full opacity-90" onClick={handleMostrarFormularioPrestamo}>
        Realizar Prestamo
      </button>
    </div>
  );
};

export default MostrarStock;