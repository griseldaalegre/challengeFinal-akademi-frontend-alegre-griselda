import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import { loadUserFromToken } from "../redux/store/auth/authActions";

import PrivateRoute from "../components/PrivateRoute";
//imports del rutas publicas
import FomrRegisterStudent from "./pages/public-pages/FomrRegisterStudent";
import Login from "./pages/public-pages/Login";
import FormSendEmail from "./pages/public-pages/FormSendEmail";
import FormResetPassword from "./pages/public-pages/FormResetPassword";
//imports del admin
import Dashboard from "./pages/private-pages/superadmin/Dashboard";
import UserListPage from "./pages/private-pages/superadmin/UserListPage";
import FormUser from "./pages/private-pages/superadmin/FormUser";
import CoursesPage from "./pages/private-pages/superadmin/CoursesPage";
//imports del profe
import DashboadProfessor from "./pages/private-pages/professor/DashboadProfessor";
import FormCourse from "./FormCourse";
import CourseDetailPage from "./pages/private-pages/professor/CourseDetailPage";
import CourseStudentDetailPage from "./pages/private-pages/student/CourseStudentDetailPage";

//import CoursesPageProfessor from "./pages/private-pages/professor/CoursesPage";
import DashboadStudent from "../components/pages/private-pages/student/DashboardStudent";
import MyCoursePage from "../components/pages/private-pages/student/MyCoursePage";
import GradesStudentPage from "../components/pages/private-pages/student/GradesStudentPage";

const App = ({ loadUserFromToken, loading, authChecked }) => {
  useEffect(() => {
    loadUserFromToken();
  }, [loadUserFromToken]);

  if (!authChecked) {
    return (
      <div className="ui inverted active dimmer" style={{ height: "100vh" }}>
        <div className="ui large text loader">Cargando aplicación...</div>
      </div>
    );
  }

  return (
    <div className="ui container custom-container">
      <BrowserRouter>
        <NavBar />
        <Routes>
          {/* publicas */}

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<FomrRegisterStudent />} />
          <Route path="/recover-password" element={<FormSendEmail />} />
          <Route
            path="/reset-password/:token"
            element={<FormResetPassword />}
          />

          {/* protegidas solo para admin */}
          <Route
            path="/superadmin"
            element={<PrivateRoute allowedRoles={["superadmin"]} />}
          >
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UserListPage />} />
            <Route path="users/:id" element={<FormUser />} />
            <Route path="users/add" element={<FormUser />} />
            <Route path="courses" element={<CoursesPage />} />
          </Route>

          {/* protegidas solo para profesores */}
          <Route
            path="/professor"
            element={<PrivateRoute allowedRoles={["professor"]} />}
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboadProfessor />} />
            <Route path="courses" element={<DashboadProfessor />} />
            <Route path="courses/add" element={<FormCourse />} />
            <Route path="courses/:id" element={<FormCourse />} />
            <Route
              path="courses/detail/:id"
              element={<CourseDetailPage />}
            />
          </Route>

          <Route
            path="/student"
            element={<PrivateRoute allowedRoles={["student"]} />}
          >
            <Route index element={<Navigate to="courses" replace />} />

            <Route path="courses" element={<DashboadStudent />} />
            <Route path="courses/detail/:id" element={<CourseStudentDetailPage />} />
            <Route path="mycourses" element={<MyCoursePage />} />
            <Route path="grades" element={<GradesStudentPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  authChecked: state.auth.authChecked,
});

export default connect(mapStateToProps, { loadUserFromToken })(App);
