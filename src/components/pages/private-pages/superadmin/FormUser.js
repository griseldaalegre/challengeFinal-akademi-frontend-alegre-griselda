import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  addUser,
  editUser,
} from "../../../../redux/store/superadmin/superAdminActions";
import { registerValidator } from "../../../../utils/validators/registerValidator";

const FormUser = ({ users, currentUser, addUser, editUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (id) {
      const userToEdit = users.find((u) => u._id === id);
      if (userToEdit) {
        setValue("name", userToEdit.name);
        setValue("email", userToEdit.email);
        setValue("dni", userToEdit.dni);
        setValue("role", userToEdit.role);
      }
    }
  }, [id, users, setValue]);

  const onSubmit = (data) => {
    if (!currentUser || currentUser.role !== "superadmin") {
      delete data.role; // Elimina rol del form si el logueado no es superadmin
    }

    if (id) {
      editUser(id, data);
    } else {
      addUser(data);
    }

    navigate("/superadmin/users");
  };

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
        <div className={`field ${errors.name ? "error" : ""}`}>
          <label>Nombre</label>
          <input {...register("name", registerValidator.name)} />
          {errors.name && (
            <div className="ui pointing red basic label">
              {errors.name.message}
            </div>
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
            <div className="ui pointing red basic label">
              {errors.dni.message}
            </div>
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
            <div className="ui pointing red basic label">
              {errors.email.message}
            </div>
          )}
        </div>

        {!id && (
          <div className={`field ${errors.password ? "error" : ""}`}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              {...register("password", registerValidator.password)}
            />
            {errors.password && (
              <div className="ui pointing red basic label">
                {errors.password.message}
              </div>
            )}
          </div>
        )}

        {currentUser && currentUser.role === "superadmin" && (
          <div className={`field ${errors.role ? "error" : ""}`}>
            <label>Rol</label>
            <select
              {...register("role", { required: "Seleccioná un rol" })}
              className="ui dropdown"
            >
              <option value="">Seleccionar</option>
              <option value="superadmin">Super Admin</option>
              <option value="professor">Professor</option>
              <option value="student">Student</option>
            </select>
            {errors.role && (
              <div className="ui pointing red basic label">
                {errors.role.message}
              </div>
            )}
          </div>
        )}

        <div className="ui buttons">
          <button className="ui button" type="button">
            Cancelar
          </button>
          <div className="or"></div>
          <button className="ui primary button" type="submit">
            {id ? "Editar usuario" : "Crear usuario"}
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.superadmin.users,
  currentUser: state.auth.user, 
});

export default connect(mapStateToProps, { addUser, editUser })(FormUser);
