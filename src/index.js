import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Pages/App.tsx';
import reportWebVitals from './reportWebVitals';
import Modal from 'react-modal';
import Login from './Pages/login.tsx';


ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
      
        <Login />
      
    
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
