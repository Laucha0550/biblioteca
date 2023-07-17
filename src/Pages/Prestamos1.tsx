import React, { useState, useEffect, ChangeEvent } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PrestamoPage from './Prestamo.tsx';

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

const SelectedBooksList = ({ selectedBooks, handleRemoveFromList }: { selectedBooks: Libro[]; handleRemoveFromList: (libro: Libro) => void }) => (
  <div className="absolute bottom-full right-0 bg-white p-4 shadow-xl rounded-lg">
    <h2>Lista de libros seleccionados:</h2>
    {selectedBooks.map(libro => (
      <div key={libro.id}>
        <h3>{libro.nombrelibro}</h3>
        {/* Mostrar más detalles del libro si es necesario */}
        <button onClick={() => handleRemoveFromList(libro)}>Quitar de la lista</button>
      </div>
    ))}
  </div>
);

const Prestamos = () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [generosSeleccionados, setGenerosSeleccionados] = useState<string[]>([]);
  const [showCrearLibroForm, setShowCrearLibroForm] = useState(false);
  const [showCrearLibroGeneros, setShowCrearLibroGeneros] = useState(false);
  const [idLibroCreado, setIdLibroCreado] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage, setBooksPerPage] = useState(9);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState<Libro | null>(null);
  const [selectedBooks, setSelectedBooks] = useState<Libro[]>([]);
  const [showSelectedBooksList, setShowSelectedBooksList] = useState(false);

  useEffect(() => {
    obtenerLibros();
    obtenerGeneros();
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
    setCurrentPage(1); // Resetear la página actual al realizar una búsqueda
  };

  const handleGeneroSeleccionado = (event: ChangeEvent<HTMLInputElement>) => {
    const generoId = event.target.value;
    if (event.target.checked) {
      setGenerosSeleccionados([...generosSeleccionados, generoId]);
    } else {
      setGenerosSeleccionados(generosSeleccionados.filter(id => id !== generoId));
    }
    console.log(generosSeleccionados); // Verificar los géneros seleccionados en la consola
  };

  const handleSelectBook = (libro: Libro) => {
    if (selectedBooks.length < 3) {
      setSelectedBook(libro);
    }
  };

  const handleAddToList = (libro: Libro) => {
    if (selectedBooks.length < 3) {
      setSelectedBooks([...selectedBooks, libro]);
      setSelectedBook(null);
    }
  };

  const handleRemoveFromList = (libro: Libro) => {
    setSelectedBooks(selectedBooks.filter(selectedBook => selectedBook.id !== libro.id));
  };

  const handleToggleSelectedBooksList = () => {
    setShowSelectedBooksList(!showSelectedBooksList);
  };

  // Obtener el índice inicial y final de los libros a mostrar en la página actual
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;

  // Filtrar los libros en función del término de búsqueda
  const filteredBooks = libros.filter(libro =>
    libro.nombrelibro.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtener los libros a mostrar en la página actual
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Cambiar a la página siguiente
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Cambiar a la página anterior
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-4">
      <div className="fixed bottom-4 right-4 z-10">
        <button
          onClick={handleToggleSelectedBooksList}
          className="bg-violeta6 text-white relative rounded-full px-6 py-4 text-xl"
          title="Mostrar lista de libros seleccionados">
          {showSelectedBooksList ? '-' : '+'}
        </button>
        {showSelectedBooksList && <SelectedBooksList selectedBooks={selectedBooks} handleRemoveFromList={handleRemoveFromList} />}
        <button
          onClick={handleOpenCrearLibroForm}
          className="bg-violeta6 text-white relative rounded-full px-6 py-4 text-xl"
          title="Crear un nuevo libro">
          Cargar Prestamo
        </button>
      </div>

      <div className="p-4 mt-12 text-black">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Buscar por nombre de libro"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mt-14 relative text-center text-black">
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
            {selectedBooks.length < 3 && (
              <button onClick={() => handleAddToList(libro)}>Seleccionar</button>
            )}
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
    </div>
  );
};

export default Prestamos;
