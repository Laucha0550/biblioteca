import React from 'react';

type ItemsPageProps = {
  closeModal: () => void;
};

const ItemsPage = ({ closeModal }: ItemsPageProps) => {
  // Lógica y contenido de la página de Items

  return (
    <div>
      <h2>Items Page</h2>
      {/* Contenido de la página */}
      <button onClick={closeModal}>Cerrar</button>
    </div>
  );
};

export default ItemsPage;
