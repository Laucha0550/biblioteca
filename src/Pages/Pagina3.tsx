// import React, { useEffect, useState } from 'react';


// const GeneroListPage = () => {
//   const [generos, setGeneros] = useState([]);

//   useEffect(() => {
//     // Realizar la llamada a la API para obtener los géneros
//     axios.get('https://biblioteca-2023.web.app/genero')
//       .then(response => {
//         setGeneros(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Lista de Géneros</h1>
//       <ul>
//         {generos.map(genero => (
//           <li key={genero.IdGenero}>{genero.NombreGenero}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default GeneroListPage;
