import React from 'react';
import ServicioCard from '../layouts/ServicioCard';
import { FaHeartbeat, FaPills, FaUserMd } from 'react-icons/fa';

const Servicios = () => {
    return (
        <div id="servicios" className="bg-[#f5f5f5] flex flex-col justify-center lg:px-32 px-5 pt-24 lg:pt-20 pb-20">
            <div className='flex flex-col items-center lg:flex-row justify-between mb-8 lg:mb-6'>
                <div>
                    <h1 className='text-4xl font-semibold text-center lg:text-start'>Nuestros Servicios</h1> 
                    <p className='mt-2 text-center'>
                        En GoHealth, ofrecemos servicios médicos de calidad, diseñados para brindar bienestar y atención personalizada a cada paciente.
                    </p>
                </div>
                
            </div>
            <div className='flex flex-col lg:flex-row gap-5 pt-8'>
                <ServicioCard 
                    icon={<FaHeartbeat size={35} className="text-backgroundColor"/>} 
                    title="Chequeos Médicos" 
                    description="Realizamos chequeos médicos completos para prevenir y detectar enfermedades a tiempo. Tu salud es nuestra prioridad." 
                />
                <ServicioCard 
                    icon={<FaPills size={35} className="text-backgroundColor"/>} 
                    title="Medicamentos" 
                    description="Ofrecemos una amplia variedad de medicamentos de calidad, con asesoramiento profesional para garantizar su uso seguro y efectivo." 
                />
                <ServicioCard 
                    icon={<FaUserMd size={35} className="text-backgroundColor"/>} 
                    title="Laboratorio" 
                    description="Contamos con tecnología avanzada para análisis clínicos precisos, brindando resultados confiables y oportunos para el cuidado de tu salud." 
                />
            </div>
        </div>
    );
};

export default Servicios;
