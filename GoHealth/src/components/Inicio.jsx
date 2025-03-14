import React from 'react';
import { Link } from 'react-scroll';

const Inicio = () => {
  return (
    <div id="Home" className="h-[80vh] flex flex-col justify-center lg:px-32 px-5 text-white bg-[url('assets/img/ya.jpg')] bg-no-repeat bg-cover opacity-90">
      <div className="w-full lg:w-3/5 space-y-4 mt-5">
        <h1 className='text-5xl font-bold leading-snug'>Tu salud es lo más importante...</h1>
        <p className="text-lg lg:text-xl">
          Creemos que el bienestar es un derecho fundamental, por lo que trabajamos 
          con pasión y compromiso para proporcionar soluciones médicas accesibles, 
          eficientes y humanas.
        </p>
        <br />
        <Link 
          to="servicios"  // Debe coincidir con el ID de la sección
          spy={true} 
          smooth={true} 
          duration={500} 
          offset={-50} // Ajusta para que no quede detrás del Navbar
          className="bg-brightColor text-white px-4 py-3 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out cursor-pointer"
        >
          Nuestros Servicios
        </Link>
      </div>
    </div>
  );
};

export default Inicio;
