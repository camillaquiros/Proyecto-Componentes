import React from 'react'
import { Button } from 'react-scroll'

const ModalContacto = ({closeForm}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='popup-form absolute mt-12 text-black'>
            <form className='w-80 md:w-96 space-y-5 bg-white p-5 rounded-xl'>
                <h1 className='text-4xl font-semibold text-center text-backgroundColor'>Agenda Ahora</h1>
                <div className='flex flex-col'>
                    <input type="text" name="nombreUsuario" id="nombreUsuario" placeholder='Nombre' className='py-3 px-2 bg-[#d5f2ec] rounded-lg'/>
                </div>

                <div className='flex flex-col'>
                    <input type="text" name="apellidoUsuario" id="apellidoUsuario" placeholder='Apellido' className='py-3 px-2 bg-[#d5f2ec] rounded-lg'/>
                </div>

                <div className='flex flex-col'>
                    <input type="email" name="emailUsuario" id="emailUsuario" placeholder='Email' className='py-3 px-2 bg-[#d5f2ec] rounded-lg'/>
                </div>

                <div className='flex flex-col'>
                    <input type="number" name="numeroUsuario" id="numeroUsuario" placeholder='Numero Telefonico' className='py-3 px-2 bg-[#d5f2ec] rounded-lg'/>
                </div>

                <div className='flex gap-5'>
                    <button className='background bg-green-600 text-white px-12 py-2 rounded-lg active:bg-green-800 hover:bg-green-800'>Agendar</button>
                    <button className='background bg-red-600 text-white px-12 py-2 rounded-lg active:bg-red-800 hover:bg-red-800' onClick={closeForm}>Cerrar</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ModalContacto