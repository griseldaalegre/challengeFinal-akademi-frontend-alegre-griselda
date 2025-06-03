import React from "react";
import { connect } from "react-redux";
import { getUsers } from "../../../redux/store/actions/superAdminActions";
import { recoveryMessage } from "../../../redux/store/actions/forgotPasswordActions";
import { clearMessages } from "../../../redux/store/actions/clearMessagesActions";

import ListUsers from "../../components/users/ListUsers";

const StudentListPage = ({
  students,
  page,
  pages,

  deleteUserMessage,
  sendRecoveryEmail,
  recoveryMessage,
  clearMessages,
}) => {
  return (
    <div>
      <h2>Listado de Estudiantes</h2>
      <ListUsers
        users={students}
        getUsers={getStudents}
        deleteUser={deleteStudent}
        sendEmailRecoveryPassword={sendRecoveryEmail}
        clearAllMessages={clearMessages}
        page={page}
        pages={pages}
        editBasePath="/students"
        displayField="name"
        avatar={(user) => user.avatar || "/default-avatar.png"}
        recoveryMessage={recoveryMessage}
        deleteUserMessage={deleteUserMessage}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  students: state.students.users,
  page: state.students.page,
  pages: state.students.pages,
  deleteUserMessage: state.superadmin.deleteUserMessage,
  recoveryMessage: state.recoverPassword.recoveryMessage,
});

export default connect(mapStateToProps, {
  getStudents,
  deleteStudent,
  sendStudentRecoveryEmail,
  clearStudentMessages,
})(StudentListPage);
