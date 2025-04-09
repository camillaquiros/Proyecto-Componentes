import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    nacimiento: "",
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/pacientes/")
      .then((res) => {
        const data = res.data.map(p => ({
          nombre: p.nombre,
          correo: p.email,
          telefono: p.telefono || "",
          nacimiento: p.fecha_nacimiento,
          cedula: p.cedula
        }));
        setPacientes(data);
      })
      .catch((err) => {
        console.error("Error al obtener pacientes:", err);
      });
  }, []);

  const handleEditar = (index) => {
    setEditIndex(index);
    setEditForm({ ...pacientes[index] });
  };

  const handleEliminar = (index) => {
    const cedula = pacientes[index].cedula;
    axios.delete(`http://127.0.0.1:8000/pacientes/${cedula}`)
      .then(() => {
        const nuevos = pacientes.filter((_, i) => i !== index);
        setPacientes(nuevos);
        setEditIndex(null);
      })
      .catch((err) => console.error("Error eliminando paciente:", err));
  };

  const handleGuardar = () => {
    const { cedula, nacimiento, historial_medico } = editForm;
    axios.put(`http://127.0.0.1:8000/pacientes/${cedula}`, {
      fecha_nacimiento: nacimiento,
      historial_medico: historial_medico || ""
    }).then(() => {
      const nuevos = [...pacientes];
      nuevos[editIndex] = { ...editForm };
      setPacientes(nuevos);
      setEditIndex(null);
    }).catch((err) => console.error("Error actualizando paciente:", err));
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

        <input
          type="text"
          placeholder="Buscar por nombre, correo o teléfono"
          className="border p-2 rounded w-1/3 mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

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

        {editIndex !== null && (
          <div className="mt-6 border p-4 rounded bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">Editar Paciente</h2>
            <div className="flex gap-3 mb-3">
              <input
                className="border p-2 rounded w-1/4"
                placeholder="Nombre"
                value={editForm.nombre}
                disabled
              />
              <input
                className="border p-2 rounded w-1/4"
                placeholder="Correo"
                value={editForm.correo}
                disabled
              />
              <input
                className="border p-2 rounded w-1/4"
                placeholder="Teléfono"
                value={editForm.telefono}
                disabled
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
