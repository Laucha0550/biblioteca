import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Pages/App.tsx';
import reportWebVitals from './reportWebVitals';
import Modal from 'react-modal';
import Login from './Pages/Login.tsx';


ReactDOM.render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
