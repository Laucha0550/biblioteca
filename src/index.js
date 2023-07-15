import './index.css';
import React from "react";
import ReactDOM from "react-dom";
import App from './Pages/App.tsx';
import Login from './Pages/login.tsx'
import reportWebVitals from './reportWebVitals.js'
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Login />
      <App/>
    </BrowserRouter>

  </React.StrictMode>
);
reportWebVitals();
