import React from 'react'
import Navbar from './components/Navbar'
import Inicio from './components/Inicio'
import Nosotros from './components/Nosotros'
import Servicios from './components/Servicios'
import Doctores from './components/Doctores'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
    <Navbar/>

    <main>
      <div id="inicio">
        <Inicio/>
      </div>

      <div id="nosotros">
        <Nosotros/>
      </div>

      <div id="servicios">
        <Servicios/>
      </div>

      <div id="doctores">
        <Doctores/>
      </div>

     
        <Footer/>
     

    </main>
    </>
  );
};

export default App