import React, { useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar por título o autor"
        value={query}
        onChange={handleInputChange}
        className="border border-gray-300 rounded p-2 mr-2"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white rounded p-2"
      >
        Buscar
      </button>
    </form>
  );
};

export default Search;
