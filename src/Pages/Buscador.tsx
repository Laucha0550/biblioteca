import React, { useState } from 'react';

type BuscadorProps = {
  filterList: (searchTerm: string) => void;
};

const Buscador = ({ filterList }: BuscadorProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    filterList(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Buscar género"
      />
      <button type="submit">Buscar</button>
    </form>
  );
};

export default Buscador;
