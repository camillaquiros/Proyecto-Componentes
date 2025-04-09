import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/sidebar";
import Inicio from "./components/Inicio";
import Nosotros from "./components/Nosotros";
import Servicios from "./components/Servicios";
import Doctores from "./components/Doctores";
import LogIn from "./LogIn";
import Registro from "./Registro";
import Citas from "./pages/Citas";
import Pacientes from "./pages/Pacientes";
import Medicos from "./pages/Medicos";
import AreasMedicas from "./pages/AreasMedicas";
import Usuarios from "./pages/Usuarios"; 

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/LogIn" || location.pathname === "/Registro" || location.pathname === "/citas" || location.pathname === "/pacientes" || location.pathname === "/medicos"
  || location.pathname === "/areas-medicas" || location.pathname === "/usuarios";
  

  return (
    <>
      {!isAuthPage && <Navbar />}
      <main>{children}</main>
      {!isAuthPage && <Footer />}
    </>
  );
};

const HomePage = () => (
  <>
    <Inicio />
    <Nosotros />
    <Servicios />
    <Doctores />
  </>
);

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/doctores" element={<Doctores />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/citas" element={<Citas />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/medicos" element={<Medicos />} />
          <Route path="/areas-medicas" element={<AreasMedicas />} />
          <Route path="/usuarios" element={<Usuarios />} /> 
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
