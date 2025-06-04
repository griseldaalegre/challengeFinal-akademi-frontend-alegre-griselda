import React from "react";
import { Link } from "react-router-dom";

const NavbarProfessor = () => {
  return (
    <>
      <Link to="professor/courses" className="item">
        Cursos
      </Link>
      <Link to="professor/grades" className="item">
        Calificaciones
      </Link>
    </>
  );
};

export default NavbarProfessor;
