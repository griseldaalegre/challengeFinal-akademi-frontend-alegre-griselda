import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { login } from "../../../redux/store/actions/authActions";
import { useNavigate, Link } from "react-router-dom";
import { loginValidator } from "../../../utils/validators/loginValidator";

const LoginForm = ({ user, error, login, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  const onSubmit = (credentials) => {
    login(credentials);
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="ui inverted active dimmer" style={{ height: "100vh" }}>
        <div className="ui large white text loader">Iniciando sesión...</div>
      </div>
    );
  }

  return (
    <div className="ui placeholder segment">
      <div className="ui two column very relaxed stackable grid">
        <div className="column">
          <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
            <div className={`field ${errors.email ? "error" : ""}`}>
              <label>Email</label>
              <input
                {...register("email", loginValidator.email)}
                type="email"
                name="email"
              />
              {errors.email && (
                <p className="ui pointing red basic label">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className={`field ${errors.password ? "error" : ""}`}>
              <label>Password</label>
              <input
                {...register("password", loginValidator.password)}
                type="password"
                name="password"
              />
              {errors.password && (
                <p className="ui pointing red basic label">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="field">
              <div className="ui">
                <Link to="/recover-password" className="ui basic blue">
                  Olvidé mi contraseña
                </Link>
              </div>

              <div className="ui buttons">
                <button className="ui button" type="button">
                  Cancelar
                </button>
                <div className="or"></div>
                <button className="ui primary button" type="submit">
                  Login
                </button>
              </div>
            </div>

            {error && <div className="ui red message">{error}</div>}
          </form>
        </div>

        <div className="middle aligned column">
          <div className="ui big button">
            <Link to="/register" className="ui big primary button">
              <i className="signup icon"></i>
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      <div className="ui vertical divider">Or</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  messageSucess: state.auth.successMessage,
  user: state.auth.user, 
});

export default connect(mapStateToProps, { login })(LoginForm);
