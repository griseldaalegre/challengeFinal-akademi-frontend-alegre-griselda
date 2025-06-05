import React from "react";

const ModalDetail = ({
  title = "Detalle",
  details = {},
  onClose,
  onDelete,
  showDelete = false,
  showCancel = true,
}) => {
  if (!details) return null;

  return (
    <div className="ui modal active">
      <div className="header">{title}</div>
      <div className="content">
        {Object.entries(details).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {value}
          </p>
        ))}
      </div>
      <div className="actions">
        {showCancel && (
          <button className="ui button" onClick={onClose}>
            Cerrar
          </button>
        )}
        {showDelete && (
          <button className="ui red button" onClick={onDelete}>
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default ModalDetail;
