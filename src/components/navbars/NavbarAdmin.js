import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <>
      <Link to="superadmin/users" className="item">
        Usuarios
      </Link>
      <Link to="superadmin/courses" className="item">
        Cursos
      </Link>

    </>
  );
};

export default AdminNavbar;
