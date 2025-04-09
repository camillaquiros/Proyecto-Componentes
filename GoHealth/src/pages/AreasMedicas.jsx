import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router-dom"; 

const initialAreas = [
  { nombre: "Cardiología", descripcion: "Diagnóstico y tratamiento de enfermedades del corazón." },
  { nombre: "Pediatría", descripcion: "Atención médica para niños y adolescentes." },
  { nombre: "Ginecología", descripcion: "Salud del sistema reproductor femenino." },
  { nombre: "Medicina General", descripcion: "Atención médica integral básica." },
  { nombre: "Neumología", descripcion: "Tratamiento de enfermedades respiratorias." },
  { nombre: "Ortopedia", descripcion: "Lesiones y trastornos del sistema músculo-esquelético." },
];

const AreasMedicas = () => {
  const [areas, setAreas] = useState(initialAreas);
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({ nombre: "", descripcion: "" });

  const navigate = useNavigate(); // ✅ Aquí se define

  const handleEditar = (index) => {
    setEditIndex(index);
    setEditForm({ ...areas[index] });
  };

  const handleEliminar = (index) => {
    const nuevasAreas = areas.filter((_, i) => i !== index);
    setAreas(nuevasAreas);
    setEditIndex(null);
  };

  const handleGuardar = () => {
    const nuevas = [...areas];
    nuevas[editIndex] = { ...editForm };
    setAreas(nuevas);
    setEditIndex(null);
  };

  const areasFiltradas = areas.filter(
    (a) =>
      a.nombre.toLowerCase().includes(search.toLowerCase()) ||
      a.descripcion.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex relative min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Áreas Médicas</h1>

        <input
          type="text"
          placeholder="Buscar área o descripción"
          className="border p-2 rounded mb-4 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Descripción</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {areasFiltradas.map((a, i) => (
              <tr key={i}>
                <td className="border p-2">{a.nombre}</td>
                <td className="border p-2">{a.descripcion}</td>
                <td className="border p-2 flex gap-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEditar(i)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEliminar(i)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editIndex !== null && (
          <div className="mt-6 border p-4 rounded bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">Editar Área Médica</h2>
            <div className="flex gap-3 mb-3">
              <input
                className="border p-2 rounded w-1/4"
                placeholder="Nombre"
                value={editForm.nombre}
                onChange={(e) =>
                  setEditForm({ ...editForm, nombre: e.target.value })
                }
              />
              <input
                className="border p-2 rounded w-3/4"
                placeholder="Descripción"
                value={editForm.descripcion}
                onChange={(e) =>
                  setEditForm({ ...editForm, descripcion: e.target.value })
                }
              />
            </div>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={handleGuardar}
            >
              Guardar Cambios
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded ml-2"
              onClick={() => setEditIndex(null)}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      {/* Botón "Regresar" abajo a la izquierda */}
      <button 
        className="absolute bottom-4 left-4 bg-hoverColor text-white px-4 py-2 rounded-md shadow-md
                   hover:bg-gray-600 transition duration-300 ease-in-out"
        onClick={() => navigate("/LogIn")}
      >
        ← Regresar
      </button>
    </div>
  );
};

export default AreasMedicas;
