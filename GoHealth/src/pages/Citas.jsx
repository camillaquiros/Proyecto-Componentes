import React from "react";
import Sidebar from "../components/sidebar";

const Citas = () => {
  return (
    <div className="flex">
      {/* Sidebar a la izquierda */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Citas</h1>

        {/* Filtros de búsqueda */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="text"
            placeholder="Palabra clave"
            className="border p-2 rounded w-1/4"
          />
          <select className="border p-2 rounded">
            <option>Paciente</option>
          </select>
          <select className="border p-2 rounded">
            <option>Médico</option>
          </select>
          <input type="date" className="border p-2 rounded" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Buscar
          </button>
        </div>

        {/* Tabla de citas */}
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Asunto</th>
              <th className="border p-2">Paciente</th>
              <th className="border p-2">Médico</th>
              <th className="border p-2">Fecha</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Cardiología</td>
              <td className="border p-2">Leonardo Ramos</td>
              <td className="border p-2">Dra. Kim Kardashian</td>
              <td className="border p-2">2025-08-11 10:00</td>
              <td className="border p-2 flex gap-2">
                <button className="bg-yellow-500 text-white px-3 py-1 rounded">Editar</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded">Eliminar</button>
              </td>
            </tr>
            <tr>
              <td className="border p-2">Pediatría</td>
              <td className="border p-2">Daniel Leyva</td>
              <td className="border p-2">Dra. Kris Jenner</td>
              <td className="border p-2">2025-08-11 10:00</td>
              <td className="border p-2 flex gap-2">
                <button className="bg-yellow-500 text-white px-3 py-1 rounded">Editar</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Citas;

