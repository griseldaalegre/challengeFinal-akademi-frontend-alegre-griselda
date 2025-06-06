import React from "react";

const RenderCourse = ({ title, category, professor, price }) => {
  return (
    <div className="ui large card">
      <div className="content">
        <h3 className="header">{title}</h3>
        <p><strong>Categoría:</strong> {category}</p>
        <p><strong>Profesor:</strong> {professor?.name ?? "sdasdsad"}</p>
        <p><strong>Precio:</strong> ${price}</p>
      </div>
    </div>
  );
};

export default RenderCourse;

