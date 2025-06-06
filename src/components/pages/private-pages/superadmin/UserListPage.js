import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getUsers,
  deleteUser,
} from "../../../../redux/store/superadmin/superAdminActions";
import { sendEmailRecoveryPassword } from "../../../../redux/store/recover-password-email/forgotPasswordActions";
import { clearAllMessages } from "../../../../redux/store/shared/clearMessagesActions";

import ListUsers from "../../../ListUsers";
import Pagination from "../../../Pagination";
import Search from "../../../Search";

const UserListPage = ({
  users,
  page,
  pages,
  deleteUserMessage,
  recoveryMessage,
  getUsers,
  deleteUser,
  sendEmailRecoveryPassword,
  clearAllMessages,
}) => {
  const [search, setSearch] = useState(""); 
  const [role, setRole] = useState(""); 

  useEffect(() => {
    clearAllMessages();

    const filters = {};
    if (search) filters.name = search; 
    if (role) filters.role = role; 

    getUsers(page, filters); 
  }, [getUsers, clearAllMessages, page, search, role]); 

  const handleSearchChange = (value) => {
    setSearch(value); 
  };

  return (
    <div>
      <div className="ui grid">
        <div className="row">
          <div className="eight wide column left aligned">
            <h2>Listado de Usuarios</h2>
          </div>
          <div className="eight wide column right aligned">
            <Search value={search} onChange={handleSearchChange} />

            <select
              className="ui dropdown"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ marginLeft: "1rem" }}
            >
              <option value="">Todos los roles</option>
              <option value="superadmin">Super Admin</option>
              <option value="student">Student</option>
              <option value="professor">Professor</option>
            </select>
          </div>
        </div>
      </div>
      <Link
            to={"/superadmin/users/add"}
            className="right floated content"
          >
            <div className="ui button">Crear usuario</div>
          </Link>
      <ListUsers
        users={users}
        deleteUser={deleteUser}
        sendEmailRecoveryPassword={sendEmailRecoveryPassword}
        recoveryMessage={recoveryMessage}
        deleteUserMessage={deleteUserMessage}
        clearAllMessages={clearAllMessages}
        editBasePath="/superadmin/users"
      />

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

const mapStateToProps = (state) => ({
  users: state.superadmin.users,
  page: state.superadmin.page,
  pages: state.superadmin.pages,
  deleteUserMessage: state.superadmin.deleteUserMessage,
  recoveryMessage: state.recoverPassword.recoveryMessage,
});

const mapDispatchToProps = {
  getUsers,
  deleteUser,
  sendEmailRecoveryPassword,
  clearAllMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListPage);
