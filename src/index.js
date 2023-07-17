import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './Pages/App.tsx';
import Login from './Pages/login.tsx';
import reportWebVitals from './reportWebVitals.js';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename='/biblioteca'>
      <Login />
      {/* <App /> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
