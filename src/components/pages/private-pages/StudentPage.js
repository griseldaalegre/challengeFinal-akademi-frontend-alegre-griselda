import React from "react";
import { connect } from "react-redux";
import {
  getStudents,
  deleteStudent,
  sendStudentRecoveryEmail,
  clearStudentMessages,
} from "../../store/actions/studentActions";
import ListUsers from "../../components/users/ListUsers";

const StudentListPage = ({
  students,
  page,
  pages,
  recoveryMessage,
  deleteUserMessage,
  getStudents,
  deleteStudent,
  sendStudentRecoveryEmail,
  clearStudentMessages,
}) => {
  return (
    <div>
      <h2>Listado de Estudiantes</h2>
      <ListUsers
        users={students}
        getUsers={getStudents}
        deleteUser={deleteStudent}
        sendEmailRecoveryPassword={sendStudentRecoveryEmail}
        clearAllMessages={clearStudentMessages}
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
  deleteUserMessage: state.students.deleteUserMessage,
  recoveryMessage: state.recoverPassword.recoveryMessage,

});

export default connect(mapStateToProps, {
  getStudents,
  deleteStudent,
  sendStudentRecoveryEmail,
  clearStudentMessages,
})(StudentListPage);
