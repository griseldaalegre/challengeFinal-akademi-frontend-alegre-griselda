/*import React from "react";
import { Link } from "react-router-dom";

const ButtonsStudent = ({ courseId, isEnrolled, onEnroll, onUnenroll }) => {
  return (
    <div className="ui buttons">
      <Link to={`/courses/detail/${courseId}`} className="ui button blue">
        Ver detalle
      </Link>

      {isEnrolled ? (
        <button
          className="ui button red"
          onClick={() => onUnenroll(courseId)}
        >
          Eliminar inscripción
        </button>
      ) : (
        <button
          className="ui button green"
          onClick={() => onEnroll(courseId)}
        >
          Inscribirme
        </button>
      )}
    </div>
  );
};

export default ButtonsStudent;
*/