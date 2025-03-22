import React, { useState } from "react";
import Sidebar from "../components/sidebar";

const initialMedicos = [
  { nombre: "Dra. Kris Jenner", especialidad: "Pediatría", correo: "kris.jenner@gohealth.com" },
  { nombre: "Dra. Kim Kardashian", especialidad: "Cardiología", correo: "kim.kardashian@gohealth.com" },
  { nombre: "Dr. Keylor Antonio Navas", especialidad: "Ortopedista", correo: "keylor.navas@gohealth.com" },
  { nombre: "Dr. Pedro Pascal", especialidad: "Medicina General", correo: "pedro.pascal@gohealth.com" },
  { nombre: "Dr. Bryan Ruiz", especialidad: "Neumología", correo: "bryan.ruiz@gohealth.com" },
  { nombre: "Dr. Kanye West", especialidad: "Ginecología", correo: "kanye.west@gohealth.com" },
];

const initialPacientes = [
  { nombre: "Leonardo Ramos", correo: "leonardo.ramos@example.com", rol: "Paciente" },
  { nombre: "Daniel Leyva", correo: "daniel.leyva@example.com", rol: "Paciente" },
  { nombre: "Ana María López", correo: "ana.lopez@example.com", rol: "Paciente" },
  { nombre: "Carlos Fernández", correo: "carlos.fernandez@example.com", rol: "Paciente" },
  { nombre: "Sofía Rodríguez", correo: "sofia.rodriguez@example.com", rol: "Paciente" },
  { nombre: "María González", correo: "maria.gonzalez@example.com", rol: "Paciente" },
];

const Usuarios = () => {
  const [busqueda, setBusqueda] = useState("");
  const [usuarios, setUsuarios] = useState([
    ...initialPacientes.map((p) => ({ ...p, rol: "Paciente" })),
    ...initialMedicos.map((m) => ({ ...m, rol: "Médico" })),
  ]);

  const handleEliminar = (index) => {
    const actualizados = usuarios.filter((_, i) => i !== index);
    setUsuarios(actualizados);
  };

  const filtrados = usuarios.filter((u) =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.correo.toLowerCase().includes(busqueda.toLowerCase()) ||
    (u.especialidad && u.especialidad.toLowerCase().includes(busqueda.toLowerCase()))
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Usuarios</h1>

        <input
          type="text"
          placeholder="Buscar por nombre, correo o especialidad"
          className="border p-2 rounded mb-4 w-1/3"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Correo</th>
              <th className="border p-2">Rol</th>
              <th className="border p-2">Especialidad</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((u, i) => (
              <tr key={i}>
                <td className="border p-2">{u.nombre}</td>
                <td className="border p-2">{u.correo}</td>
                <td className="border p-2">{u.rol}</td>
                <td className="border p-2">{u.especialidad || "-"}</td>
                <td className="border p-2">
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
      </div>
    </div>
  );
};

export default Usuarios;
