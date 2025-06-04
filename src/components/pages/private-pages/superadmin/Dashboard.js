import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getStatesGeneral } from "../../../../redux/store/superadmin/superAdminActions";

const Dashboard = ({ getStatesGeneral, states }) => {
  useEffect(() => {
    getStatesGeneral();
  }, [getStatesGeneral]);

  const statFields = [
    { key: "totalUsers", title: "Usuarios" },
    { key: "students", title: "Estudiantes" },
    { key: "professors", title: "Profesores" },
    { key: "superadmins", title: "Superadmins" },
    { key: "totalCourses", title: "Cursos" },
    { key: "totalEnrollments", title: "Inscripciones" },
  ];

  return (
    <div className="ui stackable three column grid">
      {statFields.map((field) => (
        <div className="column" key={field.key}>
          <div className="ui card centered">
            <div className="content">
              <div className="center aligned header">{field.title}</div>
            </div>
            <div className="content">
              <h2 className="ui center aligned teal header">
                {states[field.key] ?? "-"}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  errorMessage: state.superadmin.error,
  loading: state.superadmin.loading,
  successMessage: state.superadmin.successMessage,
  states: state.superadmin.states,
});

export default connect(mapStateToProps, { getStatesGeneral })(Dashboard);
