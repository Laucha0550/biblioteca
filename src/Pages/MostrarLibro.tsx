import React, { useState, useEffect } from 'react';

const MostrarLibro = () => {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    obtenerLibros();
  }, []);

  const obtenerLibros = () => {
    fetch('http://localhost/principal.php?route=libros')
      .then(response => response.json())
      .then(data => {
        setLibros(data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mostrar Libros</h1>

      <div className="grid grid-cols-3 text-black gap-4">
        {libros.map(libro => (
          <div key={libro.id} className="border border-gray-300 p-4 rounded">
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
    </div>
  );
};

export default MostrarLibro;
