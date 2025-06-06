import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  addCourse,
  editCourse,
} from "../redux/store/professor/professorActions";
import { courseValidator } from "../utils/validators/courseValidator";

const FormCourse = ({ courses, addCourse, editCourse, profesorAuth }) => {
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
      }
    }
  }, [id, courses, setValue]);

  const onSubmit = async (data) => {
    if (!id) {
      data.professor = profesorAuth._id;
    }

    // ✅ Forzamos conversión de tipos
    data.price = Number(data.price);
    data.capacity = Number(data.capacity);

    console.log("DATA A ENVIAR:", data);

    if (id) {
      await editCourse(id, data);
    } else {
      await addCourse(data);
    }

    navigate("/professor/dashboard");
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

        <div className="ui buttons">
          <button
            className="ui button"
            type="button"
            onClick={() => navigate("/professor")}
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
  profesorAuth: state.auth.user,
  courses: state.professor.courses, // Ajustá si lo tenés en otro lugar
});

const mapDispatchToProps = {
  addCourse,
  editCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormCourse);
