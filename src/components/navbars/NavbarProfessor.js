import React from "react";
import { Link } from "react-router-dom";

const NavbarProfessor = () => {
  return (
    <>
      <Link to="professor/dashboard" className="item">
        Dashboard
      </Link>
      {/*

      <Link to="professor/grades" className="item">
        Calificaciones
      </Link>
      */ 

      }
    </>
  );
};

export default NavbarProfessor;
