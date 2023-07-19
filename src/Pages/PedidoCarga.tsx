import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface Libro {
  idlibro: string;
  nombrelibro: string;
}

interface Persona {
  idpersona: string;
  nombre: string;
}

interface PedidoCargaProps {
  librosSeleccionados: Libro[];
  onClose: () => void; // Función para cerrar el formulario
}

const PedidoCarga: React.FC<PedidoCargaProps> = ({ librosSeleccionados, onClose }) => {
  const [idPersona, setIdPersona] = useState('');
  const [estado, setEstado] = useState('');
  const [observacion, setObservacion] = useState('');

  const [personaOptions, setPersonaOptions] = useState<Persona[]>([]);

  useEffect(() => {
    // Realiza la solicitud para obtener las opciones de persona
    fetch('http://192.168.0.191/principal.php?route=personas')
      .then(response => response.json())
      .then(data => setPersonaOptions(data))
      .catch(error => console.error('Error al obtener opciones de persona:', error));
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Realiza una solicitud POST a la API para guardar cada libro seleccionado como un pedido individual
    try {
      for (const libro of librosSeleccionados) {
        const pedidoData = {
          idlibro: libro.idlibro,
          idpersona: idPersona,
          estado: estado,
          observacion: observacion,
        };

        const response = await fetch('http://192.168.0.191/principal.php?route=pedidos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pedidoData),
        });

        if (response.ok) {
          // Se guardó el pedido exitosamente
          console.log(`Pedido para el libro ${libro.nombrelibro} guardado correctamente`);
          // Aquí puedes realizar alguna acción adicional o mostrar un mensaje de éxito si lo deseas
        } else {
          console.error(`Error al guardar el pedido para el libro ${libro.nombrelibro}`);
          // Aquí puedes mostrar un mensaje de error si lo deseas
        }
        console.log(`Pedido de ${libro.nombrelibro} guardado correctamente`);
      }

      // Cerrar el formulario después de guardar todos los pedidos exitosamente
      onClose();
    //   limpiarLibrosSeleccionados();
    } catch (error) {
      console.error('Error de conexión:', error);
      // Aquí puedes mostrar un mensaje de error si lo deseas
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Cargar Pedido</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="block mb-2">Persona:</label>
          <select
            name="idpersona"
            value={idPersona}
            onChange={(event) => setIdPersona(event.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Seleccionar Persona</option>
            {personaOptions.map(persona => (
              <option key={persona.idpersona} value={persona.idpersona}>
                {persona.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Aquí puedes agregar más campos del formulario para el pedido */}
        <div className="mb-4">
          <label className="block mb-2">Estado:</label>
          <input
            type="text"
            name="estado"
            value={estado}
            onChange={(event) => setEstado(event.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Observación:</label>
          <input
            type="text"
            name="observacion"
            value={observacion}
            onChange={(event) => setObservacion(event.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <button type="submit" className="bg-violeta5 text-white px-4 py-2 rounded-md">
          Guardar Pedido
        </button>
        <button type="button" className="bg-gray-300 text-gray-800 ml-4 px-4 py-2 rounded-md" onClick={onClose}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default PedidoCarga;
