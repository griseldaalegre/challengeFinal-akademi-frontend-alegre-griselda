// src/components/RenderEnrollment.js
import React from "react";

const RenderEnrollment = ({ enrollment, onSubmitGrade }) => {


  return (
    <div>
      <p><strong>{enrollment.student.name}</strong></p>
      <p><strong>{enrollment.course.title}</strong></p>
      {enrollment.grade ? (
        <p>Nota actual: {enrollment.grade.score}</p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const score = e.target.score.value;
            onSubmitGrade(enrollment.student._id, score);
          }}
        >
          <input type="number" name="score" placeholder="Nota" />
          <button type="submit">Cargar nota</button>
        </form>
      )}
    </div>
  );
};

export default RenderEnrollment;
