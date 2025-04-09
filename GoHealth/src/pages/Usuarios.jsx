import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";

const Usuarios = () => {
  const [busqueda, setBusqueda] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/usuarios/")
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleEliminar = (cedula) => {
    axios.delete(`http://127.0.0.1:8000/usuarios/${cedula}`)
      .then(() => {
        setUsuarios(usuarios.filter((u) => u.cedula !== cedula));
      })
      .catch((err) => console.error(err));
  };

  const filtrados = usuarios.filter((u) =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.email.toLowerCase().includes(busqueda.toLowerCase()) ||
    (u.rol && u.rol.toLowerCase().includes(busqueda.toLowerCase()))
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Usuarios</h1>

        <input
          type="text"
          placeholder="Buscar por nombre, correo o rol"
          className="border p-2 rounded mb-4 w-1/3"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Apellido</th>
              <th className="border p-2">Correo</th>
              <th className="border p-2">Rol</th>
              <th className="border p-2">Teléfono</th>
              <th className="border p-2">Cédula</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((u, i) => (
              <tr key={i}>
                <td className="border p-2">{u.nombre}</td>
                <td className="border p-2">{u.apellido}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">{u.rol}</td>
                <td className="border p-2">{u.telefono || "-"}</td>
                <td className="border p-2">{u.cedula}</td>
                <td className="border p-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEliminar(u.cedula)}
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
