import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Inicio from "./components/Inicio";
import Nosotros from "./components/Nosotros";
import Servicios from "./components/Servicios";
import Doctores from "./components/Doctores";
import LogIn from "./LogIn"; // Importa correctamente

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/LogIn"; // Detecta si estamos en /login

  return (
    <>
      {!isLoginPage && <Navbar />} {/* Oculta Navbar en /login */}
      <main>{children}</main>
      {!isLoginPage && <Footer />} {/* Oculta Footer en /login */}
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
          <Route path="/" element={<HomePage/>} />
          <Route path="/nosotros" element={<Nosotros/>} />
          <Route path="/servicios" element={<Servicios/>} />
          <Route path="/doctores" element={<Doctores/>} />
          <Route path="/login" element={<LogIn/>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
