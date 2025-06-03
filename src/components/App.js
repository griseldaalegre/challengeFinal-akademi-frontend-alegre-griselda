import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import { loadUserFromToken } from "../redux/store/auth/authActions";

import PrivateRoute from "../components/PrivateRoute";
import FomrRegisterStudent from "./pages/public-pages/FomrRegisterStudent";

import Login from "./pages/public-pages/Login";
import FormSendEmail from "./pages/public-pages/FormSendEmail";
import FormResetPassword from "./pages/public-pages/FormResetPassword";
import Dashboard from "./pages/private-pages/Dashboard";
import UserListPage from "./pages/private-pages/UserListPage";
import FormUser from "./pages/private-pages/FormUser";
import CoursesPage from "./pages/private-pages/CoursesPage";
import FormCourse from "./FormCourse";

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
          <Route element={<PrivateRoute allowedRoles={["superadmin"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UserListPage />} />
            <Route path="/users/:id" element={<FormUser />} />
            <Route path="/users/add" element={<FormUser />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<FormCourse />} />
            <Route path="/courses/add" element={<FormCourse />} />
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
