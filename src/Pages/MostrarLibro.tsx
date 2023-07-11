import React, { useState, useEffect } from 'react';
import CrearLibro from './CrearLibro.tsx';

interface Libro {
  id: string;
  nombrelibro: string;
  isbn: string;
  idautor: string;
  imagen: string;
  descripcion: string;
}

const MostrarLibro = () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [showCrearLibro, setShowCrearLibro] = useState(false);

  useEffect(() => {
    obtenerLibros();
  }, []);

  const obtenerLibros = () => {
    fetch('http://192.168.0.191/principal.php?route=libros')
      .then(response => response.json())
      .then(data => {
        setLibros(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleOpenCrearLibro = () => {
    setShowCrearLibro(true);
  };

  const handleCloseCrearLibro = () => {
    setShowCrearLibro(false);
  };

  return (
    <div className="p-4">
      <div className="fixed bottom-4 right-4 z-10">
        <button
          onClick={handleOpenCrearLibro} className="bg-violeta6 text-white relative rounded-full px-6 py-4 text-xl" title="Crear un nuevo libro">
          +
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-14 relative text-center  text-black">
        {libros.map(libro => (
          <div key={libro.id} className="bg-violeta5  bg-opacity-50 shadow-xl text-center p-4 rounded">
            <h2 className="text-lg font-bold">{libro.nombrelibro}</h2>
            <p>ISBN: {libro.isbn}</p>
            <p>Autor: {libro.idautor}</p>
            <img
              src={libro.imagen}
              alt="Portada del libro"
              className="w-full max-h-64 object-contain"
            />
            <p>{libro.descripcion}</p>
          </div>
        ))}
      </div>

      

      {showCrearLibro && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-btn" onClick={handleCloseCrearLibro}>
              Cerrar
            </button>
            <CrearLibro />
          </div>
        </div>
      )}
    </div>
  );
};

export default MostrarLibro;