import React from "react";

interface Book {
  id: number;
  title: string;
  author: string;
}

interface SearchResultsProps {
  results: Book[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  if (results.length === 0) {
    return <p>No se encontraron resultados.</p>;
  }

  return (
    <ul>
      {results.map((book) => (
        <li key={book.id}>
          <strong>Título:</strong> {book.title} <br />
          <strong>Autor:</strong> {book.author}
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
