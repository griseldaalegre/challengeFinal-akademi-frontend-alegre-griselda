import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import PrivateRoute from "../components/PrivateRoute";
import Login from "./pages/public-pages/Login";
import FormRegister from "./pages/public-pages/FormRegister";
import FormSendEmail from "./pages/public-pages/FormSendEmail";
import FormResetPassword from "./pages/public-pages/FormResetPassword";
import Dashboard from "./pages/private-pages/Dashboard";
import { loadUserFromToken } from "../redux/store/actions/authActions";

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
          <Route path="/register" element={<FormRegister />} />
          <Route path="/recover-password" element={<FormSendEmail />} />
          <Route
            path="/reset-password/:token"
            element={<FormResetPassword />}
          />

          {/* protegidas solo para admin */}
          <Route element={<PrivateRoute allowedRoles={["superadmin"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
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
