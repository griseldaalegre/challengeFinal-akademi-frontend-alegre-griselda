import React, { useState } from "react";
import { Link } from "react-router-dom";
import PopUpDelete from "./popups/PopUpDelete";

const List = ({
  items = [],
  deleteItem,
  editBasePath = "/",
  renderItem, 
  message,
  textBtnDelete = "Eliminar",
}) => {
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmDelete = (id) => {
    setItemToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    deleteItem(itemToDelete);
    setShowConfirm(false);
    setItemToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setItemToDelete(null);
  };

  return (
    <div className="ui middle aligned divided list">
      {items.map((item) => (
        <div key={item._id} className="item">
          <div className="right floated content">
            <div className="right floated content">
              <div
                className="ui button"
                onClick={() => handleConfirmDelete(item._id)}
              >
                {textBtnDelete}
              </div>
            </div>
            <Link
              to={`${editBasePath}/${item._id}`}
              className="right floated content"
            >
              <div className="ui button">Editar</div>
            </Link>
            <Link
              to={`${editBasePath}/detail/${item._id}`}
              className="right floated content"
            >
              <div className="ui button">Ver Detalle</div>
            </Link>
          </div>

          {renderItem(item)}
        </div>
      ))}

      <PopUpDelete
        show={showConfirm}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        message={message}
      />

    
    
    </div>
  );
};

export default List;
