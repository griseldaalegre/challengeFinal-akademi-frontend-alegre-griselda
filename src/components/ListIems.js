import React, { useState } from "react";
import PopUpSucess from "./popups/PopUpSucess";
import PopUpFailure from "./popups/PopUpFailure";
import PopUpDelete from "./popups/PopUpDelete";

const ListItems = ({
  items = [],
  deleteItem,
  clearAllMessages,
  editBasePath = "/",
  renderItem, //enntidad a dibujar
  recoveryMessage,
  deleteUserMessage,
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
            <button className="ui button" onClick={() => handleConfirmDelete(item._id)}>
              Eliminar
            </button>
            <a href={`${editBasePath}/${item._id}`} className="ui button">
              Editar
            </a>
          </div>
          {renderItem(item)}
        </div>
      ))}

      <PopUpDelete
        show={showConfirm}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        message={"¿Seguro que querés eliminar este elemento?"}
      />

      {recoveryMessage && <PopUpSucess message={recoveryMessage} />}
      {deleteUserMessage && <PopUpFailure message={deleteUserMessage} />}
    </div>
  );
};

export default ListItems;
