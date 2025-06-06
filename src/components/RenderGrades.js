import React from "react";

const RenderGrades = ({ item }) => {

  return (
    
    <div className="ui middle aligned divided list">
      <p> Curso:  {item.course.title}</p>
      <p> Estudiante: {item.student.name}</p>
      <p> Nota: {item.score}</p>
    </div>
  );
};

export default RenderGrades;
