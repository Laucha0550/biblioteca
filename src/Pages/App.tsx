//import '../App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from './Navbar.tsx';
import Home from './Home.tsx';
import MostrarLibro from './MostrarLibro.tsx';

function App() {
  return (
    <div>
      <Routes>
      ||<Route path='/App' element= {<Navbar />}>
           <Route path='/App/MLibro' element= {<MostrarLibro/>}>
           </Route>
        </Route>
          {/* <Route path='/' element= {<Home />}>
        </Route> 
        <Route path='/App/Home' element= {<Home />}>
        </Route> */}
        
        <Route path='/Stock' element= {<Home />}>
        </Route>
        <Route path='/Prestamo' element= {<Home />}> 
        </Route>
      </Routes>
    </div>
  );
}
export default App;
