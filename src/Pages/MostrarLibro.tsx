import React, { useState, useEffect, ChangeEvent } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CrearLibro from './CrearLibro.tsx';
import CrearLibroGeneros from './CrearLibroGeneros.tsx';

interface Libro {
  id: string;
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
interface SidebarProps {
  generos: Genero[];
  generosSeleccionados: string[];
  handleGeneroSeleccionado: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface MostrarLibrosProps {
  isEmpleado: boolean;
}

const MostrarLibro: React.FC<MostrarLibrosProps> = ({ isEmpleado }) => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [generosSeleccionados, setGenerosSeleccionados] = useState<string[]>([]);
  const [showCrearLibroForm, setShowCrearLibroForm] = useState(false);
  const [showCrearLibroGeneros, setShowCrearLibroGeneros] = useState(false);
  const [idLibroCreado, setIdLibroCreado] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    obtenerLibros();
    obtenerGeneros();
  }, []);

  const obtenerLibros = () => {
    let url = 'http://localhost/principal.php?route=libautnom';
  
    if (generosSeleccionados.length > 0) {
      const generosQuery = generosSeleccionados.join(',');
      url = `http://localhost/principal.php?route=lixgen=${generosQuery}`;
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
    fetch('http://localhost/principal.php?route=generos')
      .then(response => response.json())
      .then(data => {
        setGeneros(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleOpenCrearLibroForm = () => {
    setShowCrearLibroForm(true);
  };

  const handleCloseCrearLibroForm = (idLibro: string) => {
    setShowCrearLibroForm(false);
    setIdLibroCreado(idLibro);
    setShowCrearLibroGeneros(true);
  };

  const handleCloseCrearLibroGeneros = () => {
    setShowCrearLibroGeneros(false);
    setIdLibroCreado('');
  };

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleGeneroSeleccionado = (event: ChangeEvent<HTMLInputElement>) => {
    const generoId = event.target.value;
    if (event.target.checked) {
      setGenerosSeleccionados([...generosSeleccionados, generoId]);
    } else {
      setGenerosSeleccionados(generosSeleccionados.filter(id => id !== generoId));
    }
    console.log(generosSeleccionados);
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

  return (
    <div className="p-4">
      <div className="fixed bottom-4 right-4 z-10">
        <button onClick={handleOpenCrearLibroForm} className="bg-violeta6 text-white relative rounded-full px-6 py-4 text-xl" title="Crear un nuevo libro">
          +
        </button>
      </div>
      
      <div className='p-4 mt-12 text-black'>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Buscar por nombre de libro"
        />
      </div>
      
      <div className="grid grid-cols-5 gap-4 mt-14 relative text-center text-black">
        {currentBooks.map(libro => (
          <div key={libro.id} className="bg-violeta5 bg-opacity-50 shadow-xl text-center p-4 rounded">
            <h2 className="text-lg font-bold">{libro.nombrelibro}</h2>
            <p>ISBN: {libro.isbn}</p>
            <p>Autor: {libro.nomautor}</p>
            <img
              src={libro.imagen}
              alt="Portada del libro"
              className="w-full max-h-64 object-contain"
            />
            <p>{libro.descripcion}</p>
          </div>
        ))}
      </div>

      {/* Mostrar botones de página siguiente y página anterior */}
      {totalPages > 1 && (
        <div className="pagination p-4 mt-12 text-black">
          <button
            onClick={previousPage}
            className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}
            disabled={currentPage === 1}
          >
            Página anterior
          </button>
          <button
            onClick={nextPage}
            className={`pagination-item ${currentPage === totalPages ? 'disabled' : ''}`}
            disabled={currentPage === totalPages}
          >
            Página siguiente
          </button>
        </div>
      )}

      {showCrearLibroForm && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-btn" onClick={() => handleCloseCrearLibroForm('')}>
              Cerrar
            </button>
            <CrearLibro onLibroCreado={handleCloseCrearLibroForm} />
          </div>
        </div>
      )}

      {showCrearLibroGeneros && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-btn" onClick={handleCloseCrearLibroGeneros}>
              Cerrar
            </button>
            <CrearLibroGeneros idLibroo={idLibroCreado} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MostrarLibro;
