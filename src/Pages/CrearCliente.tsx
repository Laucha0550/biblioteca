import React, { useState, useEffect } from 'react';

interface Persona {
  idpersona: number;
  nombre: string;
  apellido: string;
  email: string;
}

interface Usuario {
  idusuario: number;
  nombreusuario: string;
  contrasena: string;
}

interface Cliente {
  idpersona: number;
  direccion: string;
  idusuario: number;
}
interface CrearClienteUsuariosProps {
  isEmpleado: boolean; 
}

const CrearClienteUsuario: React.FC<CrearClienteUsuariosProps> = ({ isEmpleado }) => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cliente, setCliente] = useState<Cliente>({
    idpersona: 0,
    direccion: '',
    idusuario: 0,
  });
  const [nuevoUsuario, setNuevoUsuario] = useState<Usuario>({
    idusuario: 0,
    nombreusuario: '',
    contrasena: '',
  });
  const [filtro, setFiltro] = useState<string>('');

  useEffect(() => {
    // Llamar a la API para obtener la lista de personas
    fetch('http://localhost/principal.php?route=personas')
      .then((response) => response.json())
      .then((data) => setPersonas(data))
      .catch((error) => console.error('Error al obtener las personas:', error));

    // Llamar a la API para obtener la lista de usuarios
    fetch('http://localhost/principal.php?route=usuarios')
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error('Error al obtener los usuarios:', error));
  }, []);

  const handleSubmitCliente = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Llamar a la API para guardar el cliente
    const response = await fetch('http://localhost/principal.php?route=clientes', {
      method: 'POST',
      body: JSON.stringify(cliente),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Cliente guardado:', data);

      // Obtener el nuevo usuario creado y agregarlo a la lista de usuarios
      const nuevoUsuarioResponse = await fetch(`http://localhost/principal.php?route=usuarios/${data.idusuario}`);
      const nuevoUsuarioData = await nuevoUsuarioResponse.json();

      setUsuarios((prevUsuarios) => [...prevUsuarios, nuevoUsuarioData]);
    } else {
      console.error('Error al guardar el cliente:', data);
    }
  };

  const handleSubmitUsuario = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Llamar a la API para guardar el usuario
    const response = await fetch('http://localhost/principal.php?route=usuarios', {
      method: 'POST',
      body: JSON.stringify(nuevoUsuario),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Usuario guardado:', data);

      // Actualizar la lista de usuarios con el nuevo usuario
      setUsuarios((prevUsuarios) => [...prevUsuarios, data]);

      // Limpiar el formulario del nuevo usuario
      setNuevoUsuario({
        idusuario: 0,
        nombreusuario: '',
        contrasena: '',
      });
    } else {
      console.error('Error al guardar el usuario:', data);
    }
  };

  const handleChangeCliente = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCliente((prevCliente) => ({
      ...prevCliente,
      [name]: value,
    }));
  };

  const handleChangeUsuario = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNuevoUsuario((prevNuevoUsuario) => ({
      ...prevNuevoUsuario,
      [name]: value,
    }));
  };

  const handlePersonaSeleccionada = (idPersona: number) => {
    setCliente((prevCliente) => ({
      ...prevCliente,
      idpersona: idPersona,
    }));
  };

  const handleFiltroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(event.target.value);
  };

  const personasFiltradas = personas.filter(
    (persona) =>
      persona.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      persona.apellido.toLowerCase().includes(filtro.toLowerCase()) ||
      persona.email.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto mt-16 p-4 bg-gray-100 rounded shadow">
      <div className="grid grid-cols-2 gap-4">
        <form onSubmit={handleSubmitCliente}>
          <div className="mb-4">
            <label htmlFor="idpersona" className="block text-gray-700 font-bold mb-2">
              Persona:
            </label>
            <input
              type="text"
              id="filtroPersona"
              name="filtroPersona"
              value={filtro}
              onChange={handleFiltroChange}
              placeholder="Buscar persona..."
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            />
            <table className="mt-4 w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Nombre</th>
                  <th className="border p-2">Apellido</th>
                  <th className="border p-2">Email</th>
                </tr>
              </thead>
              <tbody>
                {personasFiltradas.map((persona) => (
                  <tr key={persona.idpersona}>
                    <td
                      className={`border p-2 cursor-pointer ${
                        cliente.idpersona === persona.idpersona ? 'bg-blue-200' : ''
                      }`}
                      onClick={() => handlePersonaSeleccionada(persona.idpersona)}
                    >
                      {persona.nombre}
                    </td>
                    <td className="border p-2">{persona.apellido}</td>
                    <td className="border p-2">{persona.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mb-4">
            <label htmlFor="direccion" className="block text-gray-700 font-bold mb-2">
              Dirección:
            </label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={cliente.direccion}
              onChange={handleChangeCliente}
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar Cliente
          </button>
        </form>

        <form onSubmit={handleSubmitUsuario}>
          <div className="mb-4">
            <label htmlFor="nombreusuario" className="block text-gray-700 font-bold mb-2">
              Nombre de Usuario:
            </label>
            <input
              type="text"
              id="nombreusuario"
              name="nombreusuario"
              value={nuevoUsuario.nombreusuario}
              onChange={handleChangeUsuario}
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contrasena" className="block text-gray-700 font-bold mb-2">
              Contraseña:
            </label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              value={nuevoUsuario.contrasena}
              onChange={handleChangeUsuario}
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar Usuario
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrearClienteUsuario;
