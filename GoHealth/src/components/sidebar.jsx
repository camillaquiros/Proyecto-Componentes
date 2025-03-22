import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaUserInjured, FaUserMd, FaHospital, FaUsers, FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`h-screen bg-[#004949] text-white flex flex-col transition-all duration-300 ${isOpen ? "w-64" : "w-20"}`}>
      <div className="flex justify-between items-center px-4 py-5">
        <h1 className={`text-xl font-bold ${!isOpen && "hidden"}`}>GoHealth</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <nav className="flex flex-col gap-4 px-4">
        <SidebarItem to="/Home" icon={<FaHome />} text="Inicio" isOpen={isOpen} />
        <SidebarItem to="/citas" icon={<FaCalendarAlt />} text="Citas" isOpen={isOpen} />
        <SidebarItem to="/pacientes" icon={<FaUserInjured />} text="Pacientes" isOpen={isOpen} />
        <SidebarItem to="/medicos" icon={<FaUserMd />} text="Médicos" isOpen={isOpen} />
        <SidebarItem to="/areas-medicas" icon={<FaHospital />} text="Áreas Médicas" isOpen={isOpen} />
        <SidebarItem to="/usuarios" icon={<FaUsers />} text="Usuarios" isOpen={isOpen} />
      </nav>
    </div>
  );
};

const SidebarItem = ({ to, icon, text, isOpen }) => (
  <Link to={to} className="flex items-center gap-4 px-4 py-3 rounded-md hover:bg-[#007575] transition">
    <span className="text-xl">{icon}</span>
    <span className={`${!isOpen && "hidden"}`}>{text}</span>
  </Link>
);

export default Sidebar;

