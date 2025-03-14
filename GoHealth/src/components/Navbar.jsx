import React, { useState } from 'react';
import { Link } from "react-scroll";
import { FaLaptopMedical } from "react-icons/fa";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import ModalContacto from '../models/ModalContacto';
import { useNavigate } from "react-router-dom";


//NavBar (parte de arriba de la pagina)
const Navbar = () => {

    const navigate = useNavigate();

    const [menu, setMenu] = useState(false);
    const [showForm, setShowForm] = useState(false);


    const handleChange = () => {
        setMenu(!menu);

    }


    const closeMenu = () => {
        setMenu(false);
    }

    const openForm = () => {
        setShowForm(true);
        setMenu(false);
    }

    const closeForm = () => {
        setShowForm(false);
    }



    return (
        <div className=' fixed w-full z-10 text-white'>
            <div>
                <div className=' flex flex-row justify-between p-5 md:px-32 px-5 bg-backgroundColor shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] '>
                    <div className='flex flex-row items-center cursor-pointer'>
                        <Link to='home' spy={true} smooth={true} duration={500}>
                            <h1 className="text-2xl font-semibold flex items-center gap-2">
                                <FaLaptopMedical/> GoHealth
                            </h1>           
                            </Link>
                    </div>

                   <nav className=' lg:flex flex-row items-center text-lg font-medium gap-8'>
                   <Link to='inicio' spy={true} smooth={true} duration={500} className='hover:text-hoverColor transition-all cursor-pointer' onClick={closeMenu}>Inicio</Link>
                    <Link to='nosotros' spy={true} smooth={true} duration={500} className=' hover:text-hoverColor transition-all cursor-pointer'onClick={closeMenu}>Sobre Nosotros</Link>
                    <Link to='servicios' spy={true} smooth={true} duration={500} className=' hover:text-hoverColor transition-all cursor-pointer'onClick={closeMenu}>Servicios</Link>
                    <Link to='doctores' spy={true} smooth={true} duration={500} className='hover:text-hoverColor transition-all cursor-pointer'onClick={closeMenu}>Doctores</Link>
</nav>
                    <div className="hidden lg:flex">
                        <button
                            className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out"
                            onClick={() => navigate("/LogIn")}
                         >
                             Registrate
                        </button>
                </div>

                    {showForm && <ModalContacto closeForm={closeForm} />}
                    <div className='lg:hidden flex items-center'>
                        {menu ? (
                            <AiOutlineClose size={28} onClick={handleChange} />
                        ) : (
                            <AiOutlineMenu size={28} onClick={handleChange} />
                        )}
                    </div>
                </div>

                <div className={`${menu ? "translate-x-0" : "-translate-x-full"} lg:hidden flex flex-col absolute bg-backgroundColor text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb4 gap-8 w-full h-fit transition-transform duration-300`}>
                    <Link to='inicio' spy={true} smooth={true} duration={500} className='hover:text-hoverColor transition-all cursor-pointer' onClick={closeMenu}>Inicio</Link>
                    <Link to='nosotros' spy={true} smooth={true} duration={500} className=' hover:text-hoverColor transition-all cursor-pointer'onClick={closeMenu}>Sobre Nosotros</Link>
                    <Link to='servicios' spy={true} smooth={true} duration={500} className=' hover:text-hoverColor transition-all cursor-pointer'onClick={closeMenu}>Servicios</Link>
                    <Link to='doctores' spy={true} smooth={true} duration={500} className='hover:text-hoverColor transition-all cursor-pointer'onClick={closeMenu}>Doctores</Link>

                    <div className='lg:hidden'>
                    <button
                            className="bg-brightColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out"
                            onClick={() => navigate("/LogIn")}
                         >
                             Registrate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar