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
import RoleFilterButtons from "../../../buttons/RolesFilterButtons";
import MessageModal from "../../../modals/MessageModal";
const UserListPage = ({
  users,
  page,
  pages,
  deleteUserMessage,
  getUsers,
  deleteUser,
  sendEmailRecoveryPassword,
  clearAllMessages,
  recoveryMessage,
  successMessage,
}) => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);


  useEffect(() => {
    clearAllMessages();
    const filters = {};
    if (search) filters.name = search;
    if (role) filters.role = role;
    getUsers(page, filters);
  }, [getUsers, clearAllMessages, page, search, role]);

  useEffect(() => {


    if (successMessage) {
      setModalMessage(successMessage);
      setIsSuccess(true); 
      setModalOpen(true);
    }
  
    if (recoveryMessage) {
      setModalMessage(recoveryMessage);
      setIsSuccess(true);
      setModalOpen(true);
    }
  }, [successMessage, recoveryMessage]);
  



  const handleSearchChange = (value) => {
    setSearch(value);
  };

  return (
    <div>
      <div className="ui grid">
        <div className="row middle aligned">
          <div className="eight wide column left aligned">
            <h2 className="ui header">Listado de Usuarios</h2>
          </div>
          <div className="eight wide column right aligned">
            <Search value={search} onChange={handleSearchChange} />
          </div>
        </div>

        <div className="row">
        <Link
              to={"/superadmin/users/add"}
              className="right floated content"
            >
              <div className="ui button">Crear usuario</div>
            </Link>
          <div className="sixteen wide column center aligned">
            <RoleFilterButtons selectedRole={role} onChange={setRole} />

          </div>
          
        </div>
        
      </div>

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

      <>
        <MessageModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            clearAllMessages();
          }}
          message={modalMessage}
          success={isSuccess}
        />
      </>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.superadmin.users,
  page: state.superadmin.page,
  pages: state.superadmin.pages,
  successMessage: state.superadmin.successMessage,
  recoveryMessage: state.recoverPassword.recoveryMessage,
});

const mapDispatchToProps = {
  getUsers,
  deleteUser,
  sendEmailRecoveryPassword,
  clearAllMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListPage);
