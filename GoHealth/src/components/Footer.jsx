import React from 'react';
import { Link } from 'react-scroll';

const Footer = () => {
  return (
    <div className="bg-backgroundColor text-white rounded-t-3xl mt-8 md:mt-0">
        <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
            <div className="w-full md:w-1/4">
                <h1 className=" font-semibold text-xl pb-4">GoHealth</h1>
                <p className="text-sm">Somos un equipo de dedicados doctores, nuestra mision 
                    es darle lo mejor a cada paciente, contamos con
                    distintos profesionales cardiologos, pediatria,
                    ginecologica, medicina general y mas.
                </p>
            </div>
            <div>
                <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0">Sobre Nosotros</h1>
                <nav className=" flex flex-col gap-2">
                    <Link to='nosotros' spy={true} smooth={true} duration={500} className=' hover:text-hoverColor transition-all cursor-pointer'>Sobre Nosotros</Link>
                    <Link to='servicios' spy={true} smooth={true} duration={500} className=' hover:text-hoverColor transition-all cursor-pointer'>Servicios</Link>
                    <Link to='doctores' spy={true} smooth={true} duration={500} className='hover:text-hoverColor transition-all cursor-pointer'>Doctores</Link>
                </nav>
            </div>
            <div>
                <h1 className="font-medium text-xl pb-4 pt-5 md:pt-0" >Servicios</h1>
                <nav className=" flex flex-col gap-2">
                <Link to='servicios' spy={true} smooth={true} duration={500} className=' hover:text-hoverColor transition-all cursor-pointer'>Chequeos Medicos</Link>
                <Link to='servicios' spy={true} smooth={true} duration={500} className=' hover:text-hoverColor transition-all cursor-pointer'>Medicamentos</Link>
                <Link to='servicios' spy={true} smooth={true} duration={500} className=' hover:text-hoverColor transition-all cursor-pointer'>Laboratorio</Link>
                </nav>
            </div>
            <div className="w-full md:w-1/4">
            <h1 className='font-medium text-xl pb-4 pt-5 md:pt-0' >Contactenos</h1>
            <nav className=" flex flex-col gap-2">
            <Link to='/' spy={true} smooth={true} duration={500} className='transition-all cursor-pointer'>Autopista Prospero Fernandez, San Jose, Escazu </Link>
            <Link to='/' spy={true} smooth={true} duration={500} className=' transition-all cursor-pointer'>GoHealth@gmail.com </Link>
            <Link to='/' spy={true} smooth={true} duration={500} className=' transition-all cursor-pointer'>+506 8490-9877 </Link>
            </nav>
            </div>
        </div>
        <div>
            <p className='text-center py-4'>@Copyright desarrollado por 
                <span className='text-hoverColor'> GoHealth </span> | Todos los derechos reservados
                </p>
        </div>
    </div>
  )
}

export default Footer