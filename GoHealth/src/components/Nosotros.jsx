import React from 'react'
import img from "../assets/img/si.jpg"

const Nosotros = () => {
  return (
    <div id = 'nosotros'  className="bg-[#f5f5f5] flex flex-col lg:flex-row justify-between items-center lg:px-32 px-5 pt-24 lg:pt-20 gap-10 pb-20">
        <div className='w-full lg:w-3/4 space-y-6'>
            <h1 className="text-4xl font-semibold text-center lg:text-start">Sobre Nosotros</h1>
            <p className="text-justify lg:text-start">
            En GoHealth, nuestra misión es priorizar la salud y el bienestar de nuestros pacientes, ofreciendo
            servicios médicos accesibles y de alta calidad. Contamos con un equipo de profesionales
            comprometidos y tecnología avanzada para garantizar una atención eficiente y personalizada.
            </p>
            <p className="text-justify lg:text-start">
            Nos diferenciamos por brindar un enfoque integral, combinando innovación y calidez humana en cada
            consulta. Creemos que el acceso a la salud debe ser rápido, confiable y centrado en las necesidades de
            cada persona, asegurando diagnósticos precisos y tratamientos efectivos.
            </p>
            <p className="text-justify lg:text-start">
            En GoHealth, no solo cuidamos la salud, sino que también promovemos la prevención y el bienestar.
            Nuestro compromiso es mejorar la calidad de vida de nuestros pacientes con atención de excelencia y
            un servicio basado en confianza y empatía.
            </p>
        </div>
        <div className="w-full lg:w-3/4">
            <img src={img} alt="Nosotros" className="rounded-lg"/>
        </div>
    </div>
  )
}

export default Nosotros
