import React from 'react';

type ItemsPageProps = {
  closeModal: () => void;
};

const ItemsPage = ({ closeModal }: ItemsPageProps) => {

  return (
    <div>
      <h2>Items Page</h2>
      <button onClick={closeModal}>Cerrar</button>
    </div>
  );
};

export default ItemsPage;
