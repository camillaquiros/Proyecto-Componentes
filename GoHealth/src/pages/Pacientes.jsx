import React, { useState } from "react";
import Sidebar from "../components/sidebar";

const initialPacientes = [
  {
    nombre: "Leonardo Ramos",
    correo: "leonardo.ramos@example.com",
    telefono: "88889999",
    nacimiento: "1990-05-10",
  },
  {
    nombre: "Daniel Leyva",
    correo: "daniel.leyva@example.com",
    telefono: "88881111",
    nacimiento: "1985-11-02",
  },
  {
    nombre: "Ana María López",
    correo: "ana.lopez@example.com",
    telefono: "88882222",
    nacimiento: "1992-03-20",
  },
  {
    nombre: "Carlos Fernández",
    correo: "carlos.fernandez@example.com",
    telefono: "88883333",
    nacimiento: "1988-07-15",
  },
  {
    nombre: "Sofía Rodríguez",
    correo: "sofia.rodriguez@example.com",
    telefono: "88884444",
    nacimiento: "1995-09-25",
  },
  {
    nombre: "María González",
    correo: "maria.gonzalez@example.com",
    telefono: "88885555",
    nacimiento: "1991-12-30",
  },
];

const Pacientes = () => {
  const [pacientes, setPacientes] = useState(initialPacientes);
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    nacimiento: "",
  });

  const [search, setSearch] = useState("");

  const handleEditar = (index) => {
    setEditIndex(index);
    setEditForm({ ...pacientes[index] });
  };

  const handleEliminar = (index) => {
    const nuevos = pacientes.filter((_, i) => i !== index);
    setPacientes(nuevos);
    setEditIndex(null);
  };

  const handleGuardar = () => {
    const nuevos = [...pacientes];
    nuevos[editIndex] = { ...editForm };
    setPacientes(nuevos);
    setEditIndex(null);
  };

  const filteredPacientes = pacientes.filter((p) => {
    const s = search.toLowerCase();
    return (
      p.nombre.toLowerCase().includes(s) ||
      p.correo.toLowerCase().includes(s) ||
      p.telefono.includes(s)
    );
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Pacientes</h1>

        {/* Filtro */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por nombre, correo o teléfono"
            className="border p-2 rounded w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Tabla */}
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Correo</th>
              <th className="border p-2">Teléfono</th>
              <th className="border p-2">Nacimiento</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPacientes.map((p, i) => (
              <tr key={i}>
                <td className="border p-2">{p.nombre}</td>
                <td className="border p-2">{p.correo}</td>
                <td className="border p-2">{p.telefono}</td>
                <td className="border p-2">{p.nacimiento}</td>
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
            <h2 className="text-xl font-semibold mb-4">Editar Paciente</h2>
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
                placeholder="Correo"
                value={editForm.correo}
                onChange={(e) =>
                  setEditForm({ ...editForm, correo: e.target.value })
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
                type="date"
                className="border p-2 rounded w-1/4"
                value={editForm.nacimiento}
                onChange={(e) =>
                  setEditForm({ ...editForm, nacimiento: e.target.value })
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

export default Pacientes;
