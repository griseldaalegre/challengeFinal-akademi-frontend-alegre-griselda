import React, { useState, useEffect } from "react";

const RenderEnrollment = ({ enrollment, onSubmitGrade }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [scoreValue, setScoreValue] = useState("");

  useEffect(() => {
    if (isEditing && enrollment.grade) {
      setScoreValue(enrollment.grade.score.toString());
    }
  }, [isEditing, enrollment.grade]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const score = parseFloat(scoreValue);
    onSubmitGrade(enrollment.student._id, score);
    setIsEditing(false);
  };

  return (
    <div className="ui card segment">
      <div className="ui header">
      

        Alumno: {enrollment.student.name}
        <div className="sub header">Curso: {enrollment.course.title}</div>
      </div>
      {enrollment.grade && !isEditing ? (
        <>
          <p>
          
           
            <strong>Nota actual:</strong> {enrollment.grade.score}
          </p>
          <button className="ui blue button" onClick={() => setIsEditing(true)}>
            Editar nota
          </button>
        </>
      ) : (
        <form className="ui form" onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="number"
              name="score"
              placeholder="Nota"
              min="1"
              max="10"
              value={scoreValue}
              onChange={(e) => setScoreValue(e.target.value)}
            />
          </div>
          <button type="submit" className="ui primary button">
            {enrollment.grade ? "Actualizar nota" : "Cargar nota"}
          </button>
          {enrollment.grade && (
            <button
              type="button"
              className="ui button"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </button>
          )}
        </form>
      )}
    </div>
  );
};

export default RenderEnrollment;
