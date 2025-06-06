import React from "react";
import { Link } from "react-router-dom";

const NavbarStudent = () => {
  return (
    <>
      <Link to="student/courses" className="item">
        Cursos
      </Link>
      <Link to="student/mycourses" className="item">
        Mis cursos
      </Link>
      <Link to="student/grades" className="item">
        Calificaciones
      </Link>
    </>
  );
};

export default NavbarStudent;
