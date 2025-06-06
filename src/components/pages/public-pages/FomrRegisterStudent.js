import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../.././../redux/store/register/registerActions.js";
import { clearAllMessages } from "../../../redux/store/shared/clearMessagesActions.js";

import { registerValidator } from "../../../utils/validators/registerValidator.js";
import PopUpSuccess from "../../popups/PopUpSucess.js";
import PopUpFailure from "../../popups/PopUpFailure.js";

const FomrRegisterStudent = ({
  registerUser,
  errorMessage,
  loading,
  successMessage,
  clearAllMessages,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();

  const onSubmit = (dataNewUser) => {
    registerUser(dataNewUser);
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        clearAllMessages();
        navigate("/login");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate, clearAllMessages]);

  return (
    <div className="ui placeholder segment">
      <div className="ui two column very relaxed stackable grid">
        <div className="column">
          <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
            <div className={`field ${errors.email ? "error" : ""}`}>
              <label>Nombre </label>
              <input
                type="text"
                name="name"
                {...register("name", registerValidator.name)}
              />
              {errors.name && (
                <p className="ui pointing red basic label">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className={`field ${errors.dni ? "error" : ""}`}>
              <label>DNI</label>
              <input
                type="text"
                name="dni"
                {...register("dni", registerValidator.dni)}
              />
              {errors.dni && (
                <p className="ui pointing red basic label">
                  {errors.dni.message}
                </p>
              )}
            </div>

            <div className={`field ${errors.email ? "error" : ""}`}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                {...register("email", registerValidator.email)}
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
                type="password"
                name="password"
                {...register("password", registerValidator.password)}
              />
              {errors.password && (
                <p className="ui pointing red basic label">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="field">
              <div className="ui buttons">
                <button className="ui button" type="button">
                  Cancelar
                </button>
                <div className="or"></div>
                <button className="ui primary button" type="submit">
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
        <>
          {!loading && successMessage && (
            <PopUpSuccess
              header={successMessage}
              message="Ya puede loguearse"
            />
          )}

          {!loading && errorMessage && (
            <PopUpFailure
              message={errorMessage}
              header="Error al enviar email"
            />
          )}
        </>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.register.user,
  errorMessage: state.register.error,
  loading: state.register.loading,
  successMessage: state.register.successMessage,
});

const mapDispatchToProps = {
  registerUser,
  clearAllMessages,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FomrRegisterStudent);
