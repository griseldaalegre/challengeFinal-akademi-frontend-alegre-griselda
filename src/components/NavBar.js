import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/store/auth/authActions";
import AdminNavbar from "./NavbarAdmin";
const Navbar = ({ user, logout }) => {
  return (
    <div
      className="ui menu borderless"
      style={{ borderBottom: "1px solid #ddd", padding: "1rem 0" }}
    >
      <div className="ui container">
        <Link to="/" className="header item">
          <i
            className="home icon"
            style={{ marginRight: "0.5rem", color: "#4183c4" }}
          ></i>
          Inicio
        </Link>

        {user && (
          <>
            <Link to="/dashboard" className="item">
              Dashboard
            </Link>

            {user.role === "superadmin" && <AdminNavbar />}
          </>
        )}

        <div className="right menu">
          {!user ? (
            <div className="item">
              <Link to="/login" className="ui blue button">
                <i className="sign-in icon"></i> Login
              </Link>
            </div>
          ) : (
            <>
              <div className="item">
                <span style={{ fontWeight: "500" }}>Hola, {user.name}</span>
              </div>
              <div className="item">
                <button onClick={logout} className="ui button">
                  <i className="sign-out icon"></i> Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
