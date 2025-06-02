import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import {  useParams } from "react-router-dom";
import { resetPassword } from "../../../redux/store/actions/forgotPasswordActions";
import { loginValidator } from "../../../utils/validators/loginValidator";
import PopUpSuccess from "../../popups/PopUpSucess";
import PopUpFailure from "../../popups/PopUpFailure";

const FormResetPassword = ({
  resetPassword,
  errorMessage,
  successMessage,
  loading,
}) => {

  const { token } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      return;
    }

    if (token) {
      resetPassword(token, data.password);
      console.log(errorMessage);
      console.log(successMessage);
      // setPopupVisible(true);
      // navigate("/login");
    } else {
      alert("Token inválido");
    }
  };

  return (
    <div className="ui centered grid">
      <div className="eight wide column">
        <h1 className="ui header center aligned">Cambiar contraseña</h1>
        <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
          <label>Password</label>
          <input
            {...register("password", loginValidator.password)}
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <p className="ui pointing red basic label">
              {errors.password.message}
            </p>
          )}

          <label>Repetir Password</label>
          <input
            {...register("confirmPassword", loginValidator.password)}
            type="password"
            placeholder="Repetir Password"
          />
          {errors.confirmPassword && (
            <p className="ui pointing red basic label">
              {errors.confirmPassword.message}
            </p>
          )}

          <div className="ui buttons">
            <button type="button" className="ui button">
              Cancelar
            </button>
            <div className="or"></div>
            <button className="ui primary button" type="submit">
              Cambiar Password
            </button>
          </div>
        </form>

        <>
          {!loading && successMessage && (
            <PopUpSuccess
              message={successMessage}
              header="Contraseña actualizada"
            />
          )}
     

       
          {!loading && errorMessage && (
            <PopUpFailure message={errorMessage} header="Error al actualizar" />
          )}
        </>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  successMessage: state.recoverPassword.recoveryMessage, 
  errorMessage: state.recoverPassword.error,             
  loading: state.recoverPassword.loading,
});


export default connect(mapStateToProps, { resetPassword })(FormResetPassword);
