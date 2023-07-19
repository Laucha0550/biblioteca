import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useLocation } from 'react-router-dom';

interface PrestamoData {
  idstock: string;
  idcliente: string;
  idempleado: string;
  fechaprestamo: string;
  fechadevolucion: string;
  fechaentrega: string;
  idmulta: string;
}

interface Libro {
  idlibro: string;
  nombrelibro: string;
}

interface Stock {
  idstock: string;
  idlibro: string;
  disponible: string;
}

interface listaLibros {
  librosSeleccionados: Libro[];
}

const PrestamoPage: React.FC<listaLibros> = ({ librosSeleccionados }) => {
  const [idStock, setIdStock] = useState('');
  const [idCliente, setIdCliente] = useState('');
  const [idEmpleado, setIdEmpleado] = useState('');
  const [fechaPrestamo, setFechaPrestamo] = useState('');
  const [fechaDevolucion, setFechaDevolucion] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [idMulta, setIdMulta] = useState('');
  const [stockOptions, setStockOptions] = useState<Stock[]>([]);
  const [clienteOptions, setClienteOptions] = useState<any[]>([]);
  const [empleadoOptions, setEmpleadoOptions] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const location = useLocation();

  useEffect(() => {
    fetch('http://192.168.0.191/principal.php?route=stocks')
      .then(response => response.json())
      .then(data => setStockOptions(data))
      .catch(error => console.error('Error al obtener opciones de stock:', error));

    fetch('http://192.168.0.191/principal.php?route=cliautnom')
      .then(response => response.json())
      .then(data => setClienteOptions(data))
      .catch(error => console.error('Error al obtener opciones de cliente:', error));

    fetch('http://192.168.0.191/principal.php?route=empautnom')
      .then(response => response.json())
      .then(data => setEmpleadoOptions(data))
      .catch(error => console.error('Error al obtener opciones de empleado:', error));
  }, []);

  useEffect(() => {
    const filteredResults = clienteOptions.filter(cliente =>
      cliente.nombrecliente.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [searchTerm, clienteOptions]);

  useEffect(() => {
    if (librosSeleccionados.length > 0) {
      const libroSeleccionado = librosSeleccionados[0]; 
      const idStockDisponible = obtenerIdStockDisponible(libroSeleccionado.idlibro);

      if (idStockDisponible) {
        setIdStock(idStockDisponible);
      }
    }
  }, [librosSeleccionados, stockOptions]);

  const obtenerIdStockDisponible = (idLibro: string) => {
    const stockDisponible = stockOptions.find(
      stock => stock.idlibro === idLibro && stock.disponible === 't'
    );

    return stockDisponible ? stockDisponible.idstock : null;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const prestamoData: PrestamoData = {
      idstock: idStock,
      idcliente: idCliente,
      idempleado: idEmpleado,
      fechaprestamo: fechaPrestamo,
      fechadevolucion: fechaDevolucion,
      fechaentrega: fechaEntrega,
      idmulta: idMulta,
    };

    try {
      const response = await fetch('http://192.168.0.191/principal.php?route=prestamos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prestamoData),
      });

      if (response.ok) {
        const prestamoResponse = await response.json(); 

        const stockResponse = await fetch(
          `http://192.168.0.191/principal.php?route=stocks/${idStock}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ disponible: 'false' }),
          }
        );

        if (stockResponse.ok) {
          console.log('Préstamo guardado correctamente');
        } else {
          console.error('Error al cambiar el estado del stock');
        }
      } else {
        console.error('Error al guardar el préstamo');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'fechaprestamo':
        setFechaPrestamo(value);
        break;
      case 'fechadevolucion':
        setFechaDevolucion(value);
        break;
      case 'fechaentrega':
        setFechaEntrega(value);
        break;
      default:
        break;
    }
  };

  const handleMultaChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIdMulta(event.target.value);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Realizar Préstamo</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="block mb-2">ID Cliente:</label>
          <input
            type="text"
            name="idcliente"
            value={idCliente}
            onChange={(event) => setIdCliente(event.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Buscar Cliente:</label>
          <input
            type="text"
            name="search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          {searchResults.length > 0 && (
            <ul>
              {searchResults.map(cliente => (
                <li
                  key={cliente.idcliente}
                  onClick={() => setIdCliente(cliente.idcliente)}
                  className="cursor-pointer"
                >
                  {cliente.nombrecliente}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2">ID Empleado:</label>
          <select
            name="idempleado"
            value={idEmpleado}
            onChange={(event) => setIdEmpleado(event.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Seleccionar Empleado</option>
            {empleadoOptions.map(empleado => (
              <option key={empleado.idempleado} value={empleado.idempleado}>
                {empleado.nombreempleado}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Fecha de Préstamo:</label>
          <input
            type="date"
            name="fechaprestamo"
            value={fechaPrestamo}
            onChange={handleDateChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Fecha de Devolución:</label>
          <input
            type="date"
            name="fechadevolucion"
            value={fechaDevolucion}
            onChange={handleDateChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Fecha de Entrega:</label>
          <input
            type="date"
            name="fechaentrega"
            value={fechaEntrega}
            onChange={handleDateChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">ID Multa:</label>
          <input
            type="text"
            name="idmulta"
            value={idMulta}
            onChange={handleMultaChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Libros Seleccionados:</label>
          <ul>
            {librosSeleccionados.map(libro => (
              <li key={libro.idlibro}>{libro.nombrelibro}</li>
            ))}
          </ul>
        </div>

        <button type="submit" className="bg-violeta5 text-white px-4 py-2 rounded-md">
          Guardar Préstamo
        </button>
      </form>
    </div>
  );
};

export default PrestamoPage;
