import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/sidebar"; // Importar Sidebar
import Inicio from "./components/Inicio";
import Nosotros from "./components/Nosotros";
import Servicios from "./components/Servicios";
import Doctores from "./components/Doctores";
import LogIn from "./LogIn"; 
import Registro from "./Registro"; 
import Citas from "./pages/Citas"; // Importar la página de Citas

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/LogIn" || location.pathname === "/Registro";
  const isCitasPage = location.pathname === "/citas"; // Verifica si está en citas

  return (
    <>
      {!isAuthPage && !isCitasPage && <Navbar />} {/* Oculta Navbar en Citas */}
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
          <Route path="/citas" element={<Citas />} /> {/* Nueva ruta para Citas */}
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

