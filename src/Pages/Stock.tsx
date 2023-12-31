import React, { useState, useEffect } from 'react';

interface Libro {
  idlibro: number;
  nombrelibro: string;
  idautor: number;
  imagen: string;
}

interface Stock {
  idstock: number;
  idlibro: number;
  disponible: boolean;
}

interface FormularioLibrosProps {
  isEmpleado: boolean; 
}

const FormularioLibros: React.FC<FormularioLibrosProps> = ({ isEmpleado }) => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [cantidad, setCantidad] = useState<number>(1);

  useEffect(() => {
    fetch('http://localhost/principal.php?route=libautnom')
      .then((response) => response.json())
      .then((data) => setLibros(data))
      .catch((error) => console.error('Error al obtener los libros:', error));
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const idLibro = Number((event.target as HTMLFormElement)['libro'].value);
    const disponibilidad = (event.target as HTMLFormElement)['disponible'].checked;

    if (idLibro) {
      for (let i = 0; i < cantidad; i++) {
        const data = {
          idlibro: idLibro,
          disponible: disponibilidad
        };

        fetch('http://localhost/principal.php?route=stocks', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => console.log('Libro guardado:', data))
          .catch((error) => console.error('Error al guardar el libro:', error));
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-4 bg-gray-100 rounded shadow">
      {isEmpleado && ( 
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="libro" className="block text-gray-700 font-bold mb-2">
              Libro:
            </label>
            <select
              id="libro"
              name="libro"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            >
              {libros.map((libro) => (
                <option key={libro.idlibro} value={libro.idlibro}>
                  {libro.nombrelibro}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="disponible" className="block text-gray-700 font-bold mb-2">
              Disponible:
            </label>
            <input
              type="checkbox"
              id="disponible"
              name="disponible"
              className="mr-2 leading-tight"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cantidad" className="block text-gray-700 font-bold mb-2">
              Cantidad:
            </label>
            <input
              type="number"
              id="cantidad"
              name="cantidad"
              value={cantidad}
              onChange={(event) => setCantidad(Number(event.target.value))}
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-violeta5 text-white opacity-90 py-2 px-4 rounded focus:outline-none"
          >
            Guardar
          </button>
        </form>
      )}
    </div>
  );
};

export default FormularioLibros;
