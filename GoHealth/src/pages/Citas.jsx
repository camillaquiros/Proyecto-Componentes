import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";

const doctors = [
  { name: "Dra. Kris Jenner", especialidad: "Pediatría" },
  { name: "Dra. Kim Kardashian", especialidad: "Cardiología" },
  { name: "Dr. Keylor Antonio Navas", especialidad: "Ortopedista" },
  { name: "Dr. Pedro Pascal", especialidad: "Medicina General" },
  { name: "Dr. Bryan Ruiz", especialidad: "Neumología" },
  { name: "Dr. Kanye West", especialidad: "Ginecología" },
];

const patients = [
  "Leonardo Ramos",
  "Daniel Leyva",
  "Ana María López",
  "Carlos Fernández",
  "Sofía Rodríguez",
  "María González",
];

const initialCitas = [
  {
    asunto: "Cardiología",
    paciente: "Leonardo Ramos",
    medico: "Dra. Kim Kardashian",
    fecha: "2025-08-11 10:00",
  },
  {
    asunto: "Pediatría",
    paciente: "Daniel Leyva",
    medico: "Dra. Kris Jenner",
    fecha: "2025-08-11 10:00",
  },
  {
    asunto: "Ortopedia",
    paciente: "María González",
    medico: "Dr. Keylor Antonio Navas",
    fecha: "2025-09-15 14:30",
  },
];

const Citas = () => {
  const [citas, setCitas] = useState(initialCitas);
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredCitas, setFilteredCitas] = useState(initialCitas);
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    asunto: "",
    paciente: "",
    medico: "",
    fecha: "",
  });

  const handleBuscar = () => {
    const searchLower = search.toLowerCase().trim();

    const filtradas = citas.filter((cita) => {
      const coincidePalabra =
        searchLower === "" ||
        cita.asunto.toLowerCase().includes(searchLower) ||
        cita.paciente.toLowerCase().includes(searchLower) ||
        cita.medico.toLowerCase().includes(searchLower);

      const coincidePaciente =
        selectedPatient === "" || cita.paciente === selectedPatient;

      const coincideDoctor =
        selectedDoctor === "" || cita.medico === selectedDoctor;

      const coincideFecha =
        selectedDate === "" || cita.fecha.startsWith(selectedDate);

      return coincidePalabra && coincidePaciente && coincideDoctor && coincideFecha;
    });

    setFilteredCitas(filtradas);
  };

  const handleEliminar = (index) => {
    const nuevasCitas = citas.filter((_, i) => i !== index);
    setCitas(nuevasCitas);
    setFilteredCitas(nuevasCitas);
    setEditIndex(null);
  };

  const handleEditar = (index) => {
    const cita = filteredCitas[index];
    setEditIndex(index);
    setEditForm({ ...cita });
  };

  useEffect(() => {
    if (editForm.medico) {
      const doctor = doctors.find((d) => d.name === editForm.medico);
      if (doctor) {
        setEditForm((prev) => ({ ...prev, asunto: doctor.especialidad }));
      }
    }
  }, [editForm.medico]);

  const handleGuardarEdicion = () => {
    const nuevasCitas = [...citas];
    const realIndex = citas.findIndex(
      (c) =>
        c.asunto === filteredCitas[editIndex].asunto &&
        c.paciente === filteredCitas[editIndex].paciente &&
        c.medico === filteredCitas[editIndex].medico &&
        c.fecha === filteredCitas[editIndex].fecha
    );
    nuevasCitas[realIndex] = { ...editForm };
    setCitas(nuevasCitas);
    setFilteredCitas(nuevasCitas);
    setEditIndex(null);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Citas</h1>

        {/* Filtros */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="text"
            placeholder="Palabra clave"
            className="border p-2 rounded w-1/4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border p-2 rounded"
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
          >
            <option value="">Seleccionar Paciente</option>
            {patients.map((p, i) => (
              <option key={i} value={p}>
                {p}
              </option>
            ))}
          </select>
          <select
            className="border p-2 rounded"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
          >
            <option value="">Seleccionar Médico</option>
            {doctors.map((d, i) => (
              <option key={i} value={d.name}>
                {d.name} - {d.especialidad}
              </option>
            ))}
          </select>
          <input
            type="date"
            className="border p-2 rounded"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleBuscar}
          >
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
            {filteredCitas.length > 0 ? (
              filteredCitas.map((cita, index) => (
                <tr key={index}>
                  <td className="border p-2">{cita.asunto}</td>
                  <td className="border p-2">{cita.paciente}</td>
                  <td className="border p-2">{cita.medico}</td>
                  <td className="border p-2">{cita.fecha}</td>
                  <td className="border p-2 flex gap-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                      onClick={() => handleEditar(index)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleEliminar(index)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border p-2 text-center" colSpan={5}>
                  No hay citas que coincidan con los filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Formulario de edición */}
        {editIndex !== null && (
          <div className="mt-6 border p-4 rounded bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">Editar Cita</h2>
            <div className="flex gap-3 mb-3">
              <input
                className="border p-2 rounded w-1/4 bg-gray-200"
                value={editForm.asunto}
                disabled
              />
              <select
                className="border p-2 rounded w-1/4"
                value={editForm.paciente}
                onChange={(e) =>
                  setEditForm({ ...editForm, paciente: e.target.value })
                }
              >
                {patients.map((p, i) => (
                  <option key={i} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <select
                className="border p-2 rounded w-1/4"
                value={editForm.medico}
                onChange={(e) =>
                  setEditForm({ ...editForm, medico: e.target.value })
                }
              >
                {doctors.map((d, i) => (
                  <option key={i} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
              <input
                type="datetime-local"
                className="border p-2 rounded w-1/4"
                value={editForm.fecha}
                onChange={(e) =>
                  setEditForm({ ...editForm, fecha: e.target.value })
                }
              />
            </div>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={handleGuardarEdicion}
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

export default Citas;
