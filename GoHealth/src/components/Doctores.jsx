import React, { useRef } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Doctores = () => {

    const data = [
      {
        img: "/src/assets/img/DocJenner.jpeg",
        name: "Dra. Kris Jenner",
        especialidad: "Pediatría",
      },
      {
        img: "/src/assets/img/DocKardashian.jpeg",
        name: "Dra. Kim Kardashian",
        especialidad: "Cardióloga",
      },
      {
        img: "/src/assets/img/DocNavas.jpeg",
        name: "Dr. Keylor Antonio Navas",
        especialidad: "Ortopedista",
      },
      {
        img: "/src/assets/img/DocPascal.jpeg",
        name: "Dr. Pedro Pascal",
        especialidad: "Medicina General",
      },
      {
        img: "/src/assets/img/DocRuiz.jpeg",
        name: "Dr. Bryan Ruiz",
        especialidad: "Neumología",
      },
      {
        img: "/src/assets/img/DocWest.jpeg",
        name: "Dr. Kanye West",
        especialidad: "Ginecología",
      },
    ];

    const slider = useRef(null);

    const settings = {
        accessibility: true,
        dots: true,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1023,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 2
            },
          },
        ]
    };

  return (
    <div id = 'doctores' className="bg-[#f5f5f5] flex flex-col justify-center lg:px-32 px-5 pt-20 lg:pt-16 pb-16">
        <div className="flex flex-col items-center lg:flex-row justify-between mb-8 lg:mb-6">
            <div>
                <h1 className="text-4xl font-semibold text-center lg:text-start">Nuestros Doctores</h1>
                <p className="mt-2 text-center lg:text-start">
                    Conoce a nuestros médicos especialistas en diversas áreas de la salud.
                </p>
            </div>
            <div className="flex gap-5 mt-4 lg:mt-0">
                <button className='bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]'
                onClick={() => slider.current.slickPrev()}>
                    <FaArrowLeft size={25}/>
                </button>
                <button className='bg-[#d5f2ec] text-backgroundColor px-4 py-2 rounded-lg active:bg-[#ade9dc]'
                onClick={() => slider.current.slickNext()}>
                    <FaArrowRight size={25}/>
                </button>
            </div>
        </div>

        <div className="mt-5">
          <Slider ref={slider} {...settings}>
            {data.map((e , index) => (
              <div className="h-[380px] text-black rounded-xl shadow-lg mb-2 cursor-pointer"
              key={index}>
                <div>
                  <img src={e.img} alt={e.name} className="h-50 rounded-t-xl w-full"/>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <h1 className="font-semibold text-xl pt-4">{e.name}</h1>
                  <h3 className="pt-2">{e.especialidad}</h3>
                </div>
              </div>
            ))}
          </Slider>
        </div>
    </div>
  )
}

export default Doctores;
