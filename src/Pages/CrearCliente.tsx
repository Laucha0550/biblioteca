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
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null); // Id del usuario seleccionado o null si es nuevo usuario
  const [showUserModal, setShowUserModal] = useState<boolean>(false);

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

    if (selectedUserId) {
      // Usuario existente seleccionado, asignarlo al cliente
      setCliente((prevCliente) => ({
        ...prevCliente,
        idusuario: selectedUserId,
      }));
    } else {
      // Llamar a la API para guardar el nuevo usuario
      const response = await fetch('http://192.168.0.191/principal.php?route=usuarios', {
        method: 'POST',
        body: JSON.stringify(nuevoUsuario),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Usuario guardado:', data);

        // Asignar el nuevo usuario al cliente
        setCliente((prevCliente) => ({
          ...prevCliente,
          idusuario: data.idusuario,
        }));

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

  // Función para abrir el modal
  const handleShowUserModal = () => {
    setShowUserModal(true);
  };

  // Función para cerrar el modal
  const handleCloseUserModal = () => {
    setShowUserModal(false);
  };

  const handleUserSelection = (userId: number) => {
    setSelectedUserId(userId);
    handleCloseUserModal();
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-4 bg-gray-100 rounded shadow">
      <div>
        {/* Formulario de Cliente */}
        <h2 className="text-xl font-bold col-start-1 col-end-2 mb-4">Formulario de Cliente</h2>
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
                         {/* Mostrar usuarios existentes */}
      <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Usuarios Existentes:</h3>
          <ul>
            {usuarios.map((usuario) => (
              <li key={usuario.idusuario} onClick={() => handleUserSelection(usuario.idusuario)} className="cursor-pointer">
                {usuario.nombreusuario}
              </li>
            ))}
          </ul>
        </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar Cliente
          </button>
        </form>
      </div>
      <div>
      
        {/* Formulario de Usuario */}
        <h2 className="text-xl font-bold col-start-3 col-end-4 mb-4">Formulario de Usuario</h2>
        <button
          onClick={handleShowUserModal}
          className="bg-violeta5 hover:bg-violeta7 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Agregar Usuario
        </button>
       
        

        {/* Modal para agregar usuario */}
        {showUserModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow">
              <h2 className="text-xl font-bold mb-4">Agregar Usuario</h2>
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
                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-violeta5"
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
                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:border-violeta6"
                  />
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleCloseUserModal}
                    className="mr-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-violeta5 hover:bg-violeta7 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Guardar Usuario
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrearClienteUsuario;
