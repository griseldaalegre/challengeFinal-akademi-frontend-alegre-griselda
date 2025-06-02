import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <>
      <Link to="/users" className="item">
        Super Admins
      </Link>
      <Link to="/users" className="item">
        Estudiantes
      </Link>
      <Link to="/users" className="item">
        Profesores
      </Link>
      <Link to="/users" className="item">
        Inscripciones
      </Link>
      <Link to="/users" className="item">
        Cursos
      </Link>
    </>
  );
};

export default AdminNavbar;
