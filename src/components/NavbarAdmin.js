import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <>
      <Link to="/users" className="item">
        Usuarios
      </Link>
      <Link to="/users" className="item">
        Inscripciones
      </Link>
      <Link to="/courses" className="item">
        Cursos
      </Link>
      <Link to="/users" className="item">
        Calificaciones
      </Link>
    </>
  );
};

export default AdminNavbar;
