import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";

const Medicos = () => {
  const [medicos, setMedicos] = useState([]);
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    cedula: "",
    nombre: "",
    especialidad: "",
    telefono: "",
    correo: "",
  });

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/medicos/")
      .then((res) => setMedicos(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleEditar = (index) => {
    setEditIndex(index);
    setEditForm({ ...medicos[index] });
  };

  const handleEliminar = (cedula) => {
    axios.delete(`http://127.0.0.1:8000/medicos/${cedula}`)
      .then(() => setMedicos(medicos.filter((m) => m.cedula !== cedula)))
      .catch((err) => console.error(err));
  };

  const handleGuardar = () => {
    axios.put(`http://127.0.0.1:8000/medicos/${editForm.cedula}?especialidad=${editForm.especialidad}`)
      .then(() => {
        const actualizados = [...medicos];
        actualizados[editIndex] = { ...editForm };
        setMedicos(actualizados);
        setEditIndex(null);
      })
      .catch((err) => console.error(err));
  };

  const filtrados = medicos.filter((m) => {
    const q = search.toLowerCase();
    return (
      m.nombre.toLowerCase().includes(q) ||
      m.especialidad.toLowerCase().includes(q) ||
      m.cedula.includes(q) ||
      m.apellido.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Médicos</h1>

        <input
          type="text"
          placeholder="Buscar por nombre, especialidad, cédula"
          className="border p-2 rounded w-full mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Cédula</th>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Apellido</th>
              <th className="border p-2">Especialidad</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((m, i) => (
              <tr key={i}>
                <td className="border p-2">{m.cedula}</td>
                <td className="border p-2">{m.nombre}</td>
                <td className="border p-2">{m.apellido}</td>
                <td className="border p-2">{m.especialidad}</td>
                <td className="border p-2 flex gap-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEditar(i)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEliminar(m.cedula)}
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
            <h2 className="text-xl font-semibold mb-4">Editar Médico</h2>
            <div className="flex gap-3 mb-3">
              <input
                className="border p-2 rounded w-1/2"
                placeholder="Especialidad"
                value={editForm.especialidad}
                onChange={(e) =>
                  setEditForm({ ...editForm, especialidad: e.target.value })
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
