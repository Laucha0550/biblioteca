import React from 'react';
import CrearPersonas from './CrearPersona.tsx';
import ListaPersonas from './ListaPersonas.tsx';

const PaginaPersonas = () => {
  return (
    <div className="flex">
      <div className="w-1/2 pr-4">
        <CrearPersonas />
      </div>
      <div className="w-1/2 pl-4">
        <ListaPersonas />
      </div>
    </div>
  );
};

export default PaginaPersonas;
