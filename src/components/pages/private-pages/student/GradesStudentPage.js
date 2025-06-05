/* · Alumno:
 · Miscursos inscritos
 · Catálogo de cursos disponibles
 · Visualización de calificaciones*/
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getGrades } from "../../../../redux/store/student/studentActions.js";

import ListaCursoEstudiante from "../../../ListaCursoEstudiante.js";
import RenderGrades from "../../../RenderGrades.js";
import Pagination from "../../../Pagination";
import ListItems from "../../../ListIems.js";

const MyCoursePage = ({
  studentAuth,
  grades,
  page,
  pages,
  getGrades,
  deleteCourse,
  clearAllMessages,
}) => {
  const studentId = studentAuth._id;
  console.log("siejrfwejriewjiew");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");

  const getCurrentFilters = () => {
    const f = {};
    if (category) f.category = category;
    if (level) f.level = level;
    if (price) f.price = price;
    return f;
  };

  useEffect(() => {
    if (studentId) {
      getGrades(studentId, page, getCurrentFilters());
    }
  }, [studentId, page, category, level, price, getGrades]);

  return (
    <div className="ui container">
      <h2 className="ui dividing header">Listado de Notas</h2>

      <div className="ui form">
        <div className="fields">
          <div className="field">
            <label>Categoría</label>
            <select
              className="ui dropdown"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Categoría</option>
              <option value="web">Desarrollo Web</option>
              <option value="cyber">Ciberseguridad</option>
            </select>
          </div>

          <div className="field">
            <label>Nivel</label>
            <select
              className="ui dropdown"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="">Nivel</option>
              <option value="beginner">Principiante</option>
              <option value="intermediate">Medio</option>
              <option value="advanced">Avanzado</option>
            </select>
          </div>

          <div className="field">
            <label>Precio</label>
            <select
              className="ui dropdown"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="">Precio</option>
              <option value="0">Gratuito</option>
              <option value="100">Pago</option>
            </select>
          </div>
        </div>
      </div>

      <ListItems
        items={grades} // O grades si así se llama en tu store
        renderItem={(item) => <RenderGrades item={item} />}
      />

      {pages > 1 && (
        <Pagination
          totalPages={pages}
          currentPage={page}
          onPageChange={(newPage) => getGrades(newPage, getCurrentFilters())}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  studentAuth: state.auth.user,
  grades: state.student.grades,
  loading: state.student.loading,
  errorMessage: state.student.error,
  successMessage: state.student.successMessage,
  page: state.student.page,
  pages: state.student.pages,
});

const mapDispatchToProps = {
  getGrades,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCoursePage);
