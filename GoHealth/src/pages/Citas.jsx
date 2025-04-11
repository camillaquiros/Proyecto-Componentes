import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";

const Citas = () => {
  const [citas, setCitas] = useState([]);
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    fecha_hora: "",
    estado: "",
    notas: "",
  });
  const [crearForm, setCrearForm] = useState({
    id_paciente: "",
    id_medico: "",
    fecha_hora: "",
    estado: "Pendiente",
    notas: ""
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [pacientesDisponibles, setPacientesDisponibles] = useState([]);
  const [medicosDisponibles, setMedicosDisponibles] = useState([]);

  const fetchCitas = () => {
    axios.get("http://127.0.0.1:8000/citas/")
      .then((res) => setCitas(res.data))
      .catch((err) => console.error("Error al obtener citas:", err));
  };

  useEffect(() => {
    fetchCitas();

    axios.get("http://127.0.0.1:8000/pacientes/")
      .then((res) => setPacientesDisponibles(res.data))
      .catch((err) => console.error("Error al obtener pacientes:", err));

    axios.get("http://127.0.0.1:8000/medicos/")
      .then((res) => setMedicosDisponibles(res.data))
      .catch((err) => console.error("Error al obtener médicos:", err));
  }, []);

  const handleEliminar = (id_cita) => {
    axios.delete(`http://127.0.0.1:8000/citas/${id_cita}`)
      .then(() => fetchCitas())
      .catch((err) => console.error(err));
  };

  const handleEditar = (index) => {
    setEditIndex(index);
    const cita = citas[index];
    setEditForm({
      fecha_hora: cita.fecha_hora.slice(0, 16),
      estado: cita.estado,
      notas: cita.notas || "",
    });
  };

  const handleGuardar = () => {
    const cita = citas[editIndex];
    axios.put(`http://127.0.0.1:8000/citas/${cita.id_cita}`, editForm)
      .then(() => {
        fetchCitas();
        setEditIndex(null);
      })
      .catch((err) => console.error(err));
  };

  const handleCrear = () => {
    const paciente = pacientesDisponibles.find(p => p.id_paciente == crearForm.id_paciente);
    const medico = medicosDisponibles.find(m => m.id_medico == crearForm.id_medico);
    const cedulaPaciente = paciente?.cedula;
    const cedulaMedico = medico?.cedula;

    if (!cedulaPaciente || !cedulaMedico) {
      alert("Error: Cédula del paciente o médico no encontrada.");
      return;
    }

    const fechaFormateada = crearForm.fecha_hora.replace("T", " ") + ":00";

    axios.post(`http://127.0.0.1:8000/citas/${cedulaPaciente}/${cedulaMedico}`, {
      fecha_hora: fechaFormateada,
      estado: crearForm.estado,
      notas: crearForm.notas
    })
      .then(() => {
        fetchCitas();
        setCrearForm({
          id_paciente: "",
          id_medico: "",
          fecha_hora: "",
          estado: "Pendiente",
          notas: ""
        });
        setMostrarFormulario(false);
      })
      .catch((err) => console.error("Error al crear cita:", err));
  };

  const filtradas = citas.filter((c) => {
    const s = search.toLowerCase();
    return (
      c.nombre_paciente.toLowerCase().includes(s) ||
      c.nombre_medico.toLowerCase().includes(s) ||
      c.estado.toLowerCase().includes(s)
    );
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Citas</h1>

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Buscar por paciente, médico o estado"
            className="border p-2 rounded w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
          >
            {mostrarFormulario ? "Cancelar" : "Crear Cita"}
          </button>
        </div>

        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Paciente</th>
              <th className="border p-2">Médico</th>
              <th className="border p-2">Fecha</th>
              <th className="border p-2">Estado</th>
              <th className="border p-2">Notas</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtradas.map((cita, i) => (
              <tr key={i}>
                <td className="border p-2">{cita.nombre_paciente}</td>
                <td className="border p-2">{cita.nombre_medico}</td>
                <td className="border p-2">{cita.fecha_hora}</td>
                <td className="border p-2">{cita.estado}</td>
                <td className="border p-2">{cita.notas || "-"}</td>
                <td className="border p-2 flex gap-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEditar(i)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEliminar(cita.id_cita)}
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
            <h2 className="text-xl font-semibold mb-4">Editar Cita</h2>
            <div className="flex gap-3 mb-3">
              <input
                type="datetime-local"
                className="border p-2 rounded w-1/3"
                value={editForm.fecha_hora}
                onChange={(e) =>
                  setEditForm({ ...editForm, fecha_hora: e.target.value })
                }
              />
              <select
                className="border p-2 rounded w-1/4"
                value={editForm.estado}
                onChange={(e) =>
                  setEditForm({ ...editForm, estado: e.target.value })
                }
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Confirmada">Confirmada</option>
                <option value="Cancelada">Cancelada</option>
                <option value="Completada">Completada</option>
              </select>
              <input
                type="text"
                className="border p-2 rounded w-1/3"
                placeholder="Notas"
                value={editForm.notas}
                onChange={(e) =>
                  setEditForm({ ...editForm, notas: e.target.value })
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

        {mostrarFormulario && (
          <div className="mt-6 border p-4 rounded bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">Crear Nueva Cita</h2>
            <div className="flex gap-3 mb-3">
              <select
                className="border p-2 rounded w-1/4"
                value={crearForm.id_paciente}
                onChange={(e) =>
                  setCrearForm({ ...crearForm, id_paciente: e.target.value })
                }
              >
                <option value="">Seleccione paciente</option>
                {pacientesDisponibles.map((p) => (
                  <option key={p.id_paciente} value={p.id_paciente}>
                    {p.nombre} {p.apellido}
                  </option>
                ))}
              </select>

              <select
                className="border p-2 rounded w-1/4"
                value={crearForm.id_medico}
                onChange={(e) =>
                  setCrearForm({ ...crearForm, id_medico: e.target.value })
                }
              >
                <option value="">Seleccione médico</option>
                {medicosDisponibles.map((m) => (
                  <option key={m.id_medico} value={m.id_medico}>
                    {m.nombre} {m.apellido}
                  </option>
                ))}
              </select>

              <input
                type="datetime-local"
                className="border p-2 rounded w-1/4"
                value={crearForm.fecha_hora}
                onChange={(e) =>
                  setCrearForm({ ...crearForm, fecha_hora: e.target.value })
                }
              />
              <select
                className="border p-2 rounded w-1/4"
                value={crearForm.estado}
                onChange={(e) =>
                  setCrearForm({ ...crearForm, estado: e.target.value })
                }
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Confirmada">Confirmada</option>
                <option value="Cancelada">Cancelada</option>
                <option value="Completada">Completada</option>
              </select>
            </div>
            <input
              type="text"
              className="border p-2 rounded w-full mb-3"
              placeholder="Notas"
              value={crearForm.notas}
              onChange={(e) =>
                setCrearForm({ ...crearForm, notas: e.target.value })
              }
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handleCrear}
            >
              Crear Cita
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Citas;
