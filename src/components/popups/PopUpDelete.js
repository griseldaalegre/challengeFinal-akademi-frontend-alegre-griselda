import React from "react";

const PopUpDelete = ({ show, onCancel, onConfirm, message }) => {
  if (!show) return null;

  return (
    <div className="ui centered grid dimmer modals visible active  ">
      <div className="ui modal visible active ">
        <div className="header">¿Estás seguro?</div>
        <div className="content">
          <p>{message}</p>
        </div>
        <div className="actions">
          <div className="ui negative button" onClick={onCancel}>
            Cancelar
          </div>
          <div className="ui positive button" onClick={onConfirm}>
            Eliminar
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpDelete;
