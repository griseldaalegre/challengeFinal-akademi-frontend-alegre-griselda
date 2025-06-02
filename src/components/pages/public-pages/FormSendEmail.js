import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { sendEmailRecoveryPassword } from "../../../redux/store/actions/forgotPasswordActions.js";
import { clearAllMessages } from '../../../redux/store/actions/clearMessagesActions.js';
import { loginValidator } from "../../../utils/validators/loginValidator.js"; 
import PopUpSuccess from "../../popups/PopUpSucess.js";
import PopUpFailure from "../../popups/PopUpFailure.js";

const FormSendEmail = ({
  sendEmailRecoveryPassword,
  clearAllMessages,
  successMessage,
  errorMessage,
  loading,
}) => {


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    console.log(errorMessage);
    sendEmailRecoveryPassword({ email: data.email });
  };

  useEffect(() => {
    console.log(errorMessage);
    if (isSubmitSuccessful && successMessage) {
      const timer = setTimeout(() => {
        clearAllMessages();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitSuccessful, successMessage, clearAllMessages, errorMessage]);
  

  return (
    <div
      className="ui container"
      style={{ maxWidth: "450px", marginTop: "5em" }}
    >
      <form className="ui form segment" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="ui header center aligned">Recuperar Contraseña</h2>

        <div className={`field ${errors.email ? "error" : ""}`}>
          <label>Correo electrónico</label>
          <input
            type="email"
            placeholder="tucorreo@ejemplo.com"
            {...register("email", loginValidator.email)}
          />
          {errors.email && (
            <p className="ui pointing red basic label">
              {errors.email.message}
            </p>
          )}
        </div>

        <button className="ui primary fluid button" type="submit">
          Enviar enlace de recuperación
        </button>
      </form>
      <>
        {!loading && successMessage && (
          <PopUpSuccess
            message={successMessage}
            header="Email de recuperacion enviado"
          />
        )}

        {!loading && errorMessage && (
          <PopUpFailure message={errorMessage} header="Error al enviar email" />
        )}
      </>
    </div>
  );
};

const mapStateToProps = (state) => ({
  successMessage: state.recoverPassword.recoveryMessage,
  errorMessage: state.recoverPassword.error,
  loading: state.recoverPassword.loading,
});

export default connect(mapStateToProps, { sendEmailRecoveryPassword, clearAllMessages })(
  FormSendEmail
);
