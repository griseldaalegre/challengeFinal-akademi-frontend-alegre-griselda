import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import {getUsers} from "../redux/store/superadmin/superAdminActions";
import {
  addCourse,
  editCourse,
} from "../redux/store/superadmin/superAdminActions";
import { courseValidator } from "../utils/validators/courseValidator";

const FormCourse = ({ courses,getUsers , professors, addCourse, editCourse }) => {
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
      const courseToEdit = courses.find((c) => c._id === id);
      if (courseToEdit) {
        setValue("title", courseToEdit.title);
        setValue("description", courseToEdit.description);
        setValue("category", courseToEdit.category);
        setValue("level", courseToEdit.level);
        setValue("price", courseToEdit.price);
        setValue("capacity", courseToEdit.capacity);
        setValue("professor", courseToEdit.professor);
      }
    }
  }, [id, courses, setValue]);

  useEffect(() => {
    if (professors.length === 0) {
      getUsers(); 
    }
  }, [professors, getUsers]);

  const onSubmit = (data) => {
    if (id) {
      editCourse(id, data);
    } else {
      addCourse(data);
    }
    navigate("/courses");
  };

  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
        <div className={`field ${errors.title ? "error" : ""}`}>
          <label>Título</label>
          <input {...register("title", courseValidator.title)} />
          {errors.title && (
            <div className="ui pointing red basic label">
              {errors.title.message}
            </div>
          )}
        </div>

        <div className={`field ${errors.description ? "error" : ""}`}>
          <label>Descripción</label>
          <textarea {...register("description", courseValidator.description)} />
          {errors.description && (
            <div className="ui pointing red basic label">
              {errors.description.message}
            </div>
          )}
        </div>

        <div className={`field ${errors.category ? "error" : ""}`}>
          <label>Categoría</label>
          <select
            {...register("category", courseValidator.category)}
            className="ui dropdown"
          >
            <option value="">Seleccionar</option>
            <option value="web">Desarrollo Web</option>
            <option value="cyber">Ciberseguridad</option>
          </select>
          {errors.category && (
            <div className="ui pointing red basic label">
              {errors.category.message}
            </div>
          )}
        </div>

        <div className={`field ${errors.level ? "error" : ""}`}>
          <label>Nivel</label>
          <select
            {...register("level", courseValidator.level)}
            className="ui dropdown"
          >
            <option value="">Seleccionar</option>
            <option value="beginner">Principiante</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
          </select>
          {errors.level && (
            <div className="ui pointing red basic label">
              {errors.level.message}
            </div>
          )}
        </div>

        <div className={`field ${errors.price ? "error" : ""}`}>
          <label>Precio</label>
          <input type="number" {...register("price", courseValidator.price)} />
          {errors.price && (
            <div className="ui pointing red basic label">
              {errors.price.message}
            </div>
          )}
        </div>

        <div className={`field ${errors.capacity ? "error" : ""}`}>
          <label>Capacidad</label>
          <input
            type="number"
            {...register("capacity", courseValidator.capacity)}
          />
          {errors.capacity && (
            <div className="ui pointing red basic label">
              {errors.capacity.message}
            </div>
          )}
        </div>

        <div className={`field ${errors.professor ? "error" : ""}`}>
          <label>Profesor</label>
          <select
            {...register("professor", courseValidator.professor)}
            className="ui dropdown"
          >
            <option value="">Seleccionar profesor</option>
            {professors.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
          {errors.professor && (
            <div className="ui pointing red basic label">
              {errors.professor.message}
            </div>
          )}
        </div>

        <div className="ui buttons">
          <button
            className="ui button"
            type="button"
            onClick={() => navigate("/courses")}
          >
            Cancelar
          </button>
          <div className="or"></div>
          <button className="ui primary button" type="submit">
            {id ? "Editar curso" : "Crear curso"}
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  courses: state.superadmin.courses,
  professors: state.superadmin.users.filter((u) => u.role === "professor"), // asumiendo que los profes están ahí
});

const mapDispatchToProps = {
  getUsers,
  addCourse,
  editCourse,
};


export default connect(mapStateToProps, mapDispatchToProps)(FormCourse);
