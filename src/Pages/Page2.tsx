import React, { useState } from 'react';

const ItemsPage = ({ closeModal }) => {
  const [items, setItems] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [itemText, setItemText] = useState('');

  const addItem = () => {
    const newItem = {
      image: selectedImage,
      text: itemText,
    };

    setItems([...items, newItem]);
    setSelectedImage(null);
    setItemText('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Cargar Items</h1>
      <div className="flex mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mr-2"
        />
        <input
          type="text"
          value={itemText}
          onChange={(e) => setItemText(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Ingrese el texto del elemento"
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 ml-2 rounded"
          onClick={addItem}
        >
          Agregar Elemento
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div key={index} className="bg-gray-200 p-4">
            <img
              src={item.image}
              alt="Item Image"
              className="mb-2 max-h-40 object-contain"
            />
            <p className="text-sm">{item.text}</p>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 mt-4 rounded"
        onClick={closeModal}
      >
        Cerrar Página Emergente
      </button>
    </div>
  );
};

export default ItemsPage;
