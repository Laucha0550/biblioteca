import axios from 'axios';

axios.get('https://biblioteca-2023.web.app/')
  .then(response => {
    // Maneja los datos de respuesta aquí
    console.log(response.data);
  })
  .catch(error => {
    // Maneja los errores aquí
    console.error(error);
  });
