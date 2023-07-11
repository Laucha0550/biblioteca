import React, { useState, useEffect, ChangeEvent } from 'react';
import CrearLibroForm from './CrearLibro3';
interface Genero {
  idgenero: string;
  nombregenero: string;
}

const CrearLibroGeneros = ({ idLibroo }: { idLibroo: string }) => {
  const [generosSeleccionados, setGenerosSeleccionados] = useState<string>('');
  const [generos, setGeneros] = useState<Genero[]>([]);

  useEffect(() => {
    obtenerGeneros();
  }, []);

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
      setGenerosSeleccionados(prevGenerosSeleccionados =>
        prevGenerosSeleccionados + generoId + ','
      );
    } else {
      setGenerosSeleccionados(prevGenerosSeleccionados =>
        prevGenerosSeleccionados.replace(generoId + ',', '')
      );
    }
  };

  const guardarGenerosLibro = () => {
    const generoLibro = {
      idgenero: generosSeleccionados,
      idlibro: idLibroo?.toString() || '',
    };

    fetch('http://192.168.0.191/principal.php?route=rutagl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(generoLibro),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Asignar Géneros</h1>

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
        type="button"
        className="bg-blue-500 text-white rounded px-4 py-2 mt-4"
        onClick={guardarGenerosLibro}
      >
        Guardar Géneros
      </button>
    </div>
  );
};

export default CrearLibroGeneros;
