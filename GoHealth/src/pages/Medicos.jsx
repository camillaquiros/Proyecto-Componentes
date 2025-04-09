import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router-dom"; 

const initialMedicos = [
  {
    nombre: "Dra. Kris Jenner",
    especialidad: "Pediatría",
    telefono: "88880001",
    correo: "kris.jenner@example.com",
  },
  {
    nombre: "Dra. Kim Kardashian",
    especialidad: "Cardiología",
    telefono: "88880002",
    correo: "kim.kardashian@example.com",
  },
  {
    nombre: "Dr. Keylor Antonio Navas",
    especialidad: "Ortopedista",
    telefono: "88880003",
    correo: "keylor.navas@example.com",
  },
  {
    nombre: "Dr. Pedro Pascal",
    especialidad: "Medicina General",
    telefono: "88880004",
    correo: "pedro.pascal@example.com",
  },
  {
    nombre: "Dr. Bryan Ruiz",
    especialidad: "Neumología",
    telefono: "88880005",
    correo: "bryan.ruiz@example.com",
  },
  {
    nombre: "Dr. Kanye West",
    especialidad: "Ginecología",
    telefono: "88880006",
    correo: "kanye.west@example.com",
  },
];

const Medicos = () => {
  const [medicos, setMedicos] = useState(initialMedicos);
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    nombre: "",
    especialidad: "",
    telefono: "",
    correo: "",
  });

  const handleEditar = (index) => {
    setEditIndex(index);
    setEditForm({ ...medicos[index] });
  };

  const handleEliminar = (index) => {
    const nuevos = medicos.filter((_, i) => i !== index);
    setMedicos(nuevos);
    setEditIndex(null);
  };

  const handleGuardar = () => {
    const nuevos = [...medicos];
    nuevos[editIndex] = { ...editForm };
    setMedicos(nuevos);
    setEditIndex(null);
  };

  const filtrados = medicos.filter((m) => {
    const query = search.toLowerCase();
    return (
      m.nombre.toLowerCase().includes(query) ||
      m.especialidad.toLowerCase().includes(query) ||
      m.telefono.includes(query) ||
      m.correo.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Médicos</h1>

        <input
          type="text"
          placeholder="Buscar por nombre, especialidad, teléfono o correo"
          className="border p-2 rounded w-full mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Especialidad</th>
              <th className="border p-2">Teléfono</th>
              <th className="border p-2">Correo</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((m, i) => (
              <tr key={i}>
                <td className="border p-2">{m.nombre}</td>
                <td className="border p-2">{m.especialidad}</td>
                <td className="border p-2">{m.telefono}</td>
                <td className="border p-2">{m.correo}</td>
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

        {/* Formulario de edición */}
        {editIndex !== null && (
          <div className="mt-6 border p-4 rounded bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">Editar Médico</h2>
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
                className="border p-2 rounded w-1/4"
                placeholder="Especialidad"
                value={editForm.especialidad}
                onChange={(e) =>
                  setEditForm({ ...editForm, especialidad: e.target.value })
                }
              />
              <input
                className="border p-2 rounded w-1/4"
                placeholder="Teléfono"
                value={editForm.telefono}
                onChange={(e) =>
                  setEditForm({ ...editForm, telefono: e.target.value })
                }
              />
              <input
                className="border p-2 rounded w-1/4"
                placeholder="Correo"
                value={editForm.correo}
                onChange={(e) =>
                  setEditForm({ ...editForm, correo: e.target.value })
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
    </div>
  );
};

export default Medicos;
