import React from "react";
import { Link } from "react-router-dom";

const RenderCourses = ({ course, handleEnroll }) => {
  return (
    <div className="content">
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      
      <Link to={`/cursos/${course._id}`} className="ui primary button">
        Ver más
      </Link>

      <button onClick={() => handleEnroll(course._id)} className="ui button">
        Inscribirme
      </button>
    </div>
  );
};

export default RenderCourses;
