import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PopUpMessage from "../PopUpMessage";
import Pagination from "../Pagination";

const ListUsers = ({
  users = [],
  getUsers,
  deleteUser,
  sendEmailRecoveryPassword,
  recoveryMessage,
  deleteUserMessage,
  clearAllMessages,
  page = 1,
  pages = 1,
  editBasePath = "/users",
  displayField = "email",
  avatar = () => "./",
}) => {
  useEffect(() => {
    clearAllMessages?.();
    getUsers?.(page);
  }, [getUsers, page, clearAllMessages]);

  return (
    <div className="ui middle aligned divided list">
      {users.map((user) => (
        <div key={user._id} className="item">
          <div className="right floated content">
            <div className="ui button" onClick={() => deleteUser(user._id)}>
              Remove
            </div>
          </div>

          <Link
            to={`${editBasePath}/${user._id}`}
            className="right floated content"
          >
            <div className="ui button">Edit</div>
          </Link>

          <div className="right floated content">
            <div
              className="ui button"
              onClick={() => sendEmailRecoveryPassword({ email: user.email })}
            >
              Reset Password
            </div>
          </div>

          <img className="ui avatar image" src={avatar(user)} alt={user.name} />
          <div className="content">{user[displayField]}</div>
        </div>
      ))}

      {recoveryMessage && <PopUpMessage message={recoveryMessage} />}
      {deleteUserMessage && <PopUpMessage message={deleteUserMessage} />}

      {pages > 1 && (
        <Pagination
          totalPages={pages}
          currentPage={page}
          onPageChange={(newPage) => getUsers(newPage)}
        />
      )}
    </div>
  );
};

export default ListUsers;
