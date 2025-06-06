import React, { useState } from "react";
import { Link } from "react-router-dom";
import userImage from "../../src/assets/user.JPG";
import PopUpDelete from "../components/popups/PopUpDelete";

const ListUsers = ({
  users = [],
  deleteUser,
  sendEmailRecoveryPassword,
  editBasePath = "/superadmin",
}) => {
  const [userToDelete, setUserToDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmDelete = (id) => {
    setUserToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    deleteUser(userToDelete);
    setShowConfirm(false);
    setUserToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setUserToDelete(null);
  };

  return (
    <div className="ui middle aligned divided list">
      {users.map((user) => (
        <div key={user._id} className="item">
          <div className="right floated content">
            <div
              className="ui button"
              onClick={() => handleConfirmDelete(user._id)}
            >
              Eliminar
            </div>
          </div>
          <Link
            to={`${editBasePath}/${user._id}`}
            className="right floated content"
          >
            <div className="ui button">Editar</div>
          </Link>
          <div className="right floated content">
            <div
              className="ui button"
              onClick={() => sendEmailRecoveryPassword({ email: user.email })}
            >
              Enviar Email Recupero
            </div>
          </div>
          <a className="ui image label">
            <img
              className="ui avatar image"
              src={userImage}
              alt="Foto de usuario"
            />
          </a>
          <div className="content">
            <div>
              <strong>Nombre:</strong> {user.name}
            </div>
            <div>
              <strong>Rol:</strong> {user.role}
            </div>
          </div>
        </div>
      ))}
      <PopUpDelete
        show={showConfirm}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        message={"¿Seguro que querés eliminar este usuario?"}
      />

    </div>
  );
};

export default ListUsers;
