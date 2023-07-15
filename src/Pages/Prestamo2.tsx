import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface PrestamoData {
  idstock: string;
  idcliente: string;
  idempleado: string;
  fechaprestamo: string;
  fechadevolucion: string;
  fechaentrega: string;
  idmulta: string;
}

const PrestamoPage: React.FC = () => {
  const [idStock, setIdStock] = useState('');
  const [idCliente, setIdCliente] = useState('');
  const [idEmpleado, setIdEmpleado] = useState('');
  const [fechaPrestamo, setFechaPrestamo] = useState('');
  const [fechaDevolucion, setFechaDevolucion] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [idMulta, setIdMulta] = useState('');

  const [stockOptions, setStockOptions] = useState([]);
  const [clienteOptions, setClienteOptions] = useState([]);
  const [empleadoOptions, setEmpleadoOptions] = useState([]);

  useEffect(() => {
    // Realiza la solicitud para obtener las opciones de stock
    fetch('http://192.168.0.191/principal.php?route=stocks')
      .then(response => response.json())
      .then(data => setStockOptions(data))
      .catch(error => console.error('Error al obtener opciones de stock:', error));

    // Realiza la solicitud para obtener las opciones de cliente
    fetch('http://192.168.0.191/principal.php?route=cliautnom')
      .then(response => response.json())
      .then(data => setClienteOptions(data))
      .catch(error => console.error('Error al obtener opciones de cliente:', error));

    // Realiza la solicitud para obtener las opciones de empleado
    fetch('http://192.168.0.191/principal.php?route=empautnom')
      .then(response => response.json())
      .then(data => setEmpleadoOptions(data))
      .catch(error => console.error('Error al obtener opciones de empleado:', error));
  }, []);

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

    // Realiza una solicitud POST a la API para guardar los datos del préstamo
    try {
      const response = await fetch('http://192.168.0.191/principal.php?route=prestamos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prestamoData),
      });

      if (response.ok) {
        // Se guardó el préstamo exitosamente
        console.log('Préstamo guardado correctamente');
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Página de Préstamos</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="block mb-2">ID Stock:</label>
          <select
            name="idstock"
            value={idStock}
            onChange={(event) => setIdStock(event.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Seleccionar Stock</option>
            {stockOptions.map((stock: any) => (
              <option key={stock.idstock} value={stock.idstock}>
                {stock.idstock}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">ID Cliente:</label>
          <select
            name="idcliente"
            value={idCliente}
            onChange={(event) => setIdCliente(event.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Seleccionar Cliente</option>
            {clienteOptions.map((cliente: any) => (
              <option key={cliente.idcliente} value={cliente.idcliente}>
                {cliente.nombrecliente}
              </option>
            ))}
          </select>
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
            {empleadoOptions.map((empleado: any) => (
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

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Guardar Préstamo
        </button>
      </form>
    </div>
  );
};

export default PrestamoPage;
