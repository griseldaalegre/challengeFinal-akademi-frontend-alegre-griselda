import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getStatesGeneral } from "../../../../redux/store/superadmin/superAdminActions";
import Loading from "../../../Loading";
import { Link } from "react-router-dom";

const Dashboard = ({ getStatesGeneral, states, loading }) => {

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
    <div className="ui ">
      {/* Título separado del grid */}
      <h1 className="ui header">
        <i className="chart bar icon"></i>
        <div className="content">
          Panel de Control
          <div className="sub header">Resumen general del sistema</div>
        </div>
      </h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="ui stackable three column grid">
          {statFields.map((field) => (
            <div className="column" key={field.key}>
              <div className="ui center aligned segment">
                <div className="ui header">{field.title}</div>
                <div className="ui teal huge header">
                  {states[field.key] ?? "-"}
                </div>
              </div>
            </div>
          ))}
          <div>
            <div className="ui center aligned container">
              <Link to="/superadmin/users" className="huge ui button">
                Usuarios
              </Link>
              <Link to="/superadmin/courses" className="huge ui button">
                Cursos
              </Link>
            </div>
          </div>
        </div>
      )}
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
