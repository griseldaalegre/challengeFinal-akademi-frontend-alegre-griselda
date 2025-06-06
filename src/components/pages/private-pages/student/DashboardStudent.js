import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCourses } from "../../../../redux/store/student/studentActions.js";

import ListaCursoEstudiante from "../../../ListaCursoEstudiante.js";
import RenderCourses from "../../../RenderCourse";
import Pagination from "../../../Pagination";
import Loading from "../../../Loading.js";
const DashboardStudent = ({
  professorAuth,
  courses,
  page,
  pages,
  getCourses,
  deleteCourse,
  clearAllMessages,
  loading
}) => {
  const idProfessor = professorAuth._id;

  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const getCurrentFilters = () => {
    const f = {};
    if (category) f.category = category;
    if (level) f.level = level;
    if (price) f.price = price;
    return f;
  };

  useEffect(() => {
    getCourses(page, getCurrentFilters());
  }, [, page, category, level, price, getCourses]);
 return (
    <div className="ui container">
      <h2 className="ui dividing header">Listado de Cursos</h2>
      <>
        {loading ? (
          <Loading />
        ) : (
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
        )}

        <ListaCursoEstudiante
          items={courses}
          renderItem={RenderCourses}
        />

        {pages > 1 && (
          <Pagination
            totalPages={pages}
            currentPage={page}
            onPageChange={(newPage) => getCourses(newPage, getCurrentFilters())}
          />
        )}
      </>
    </div>
  );
};

const mapStateToProps = (state) => ({
  professorAuth: state.auth.user,
  courses: state.student.courses,
  loading: state.student.loading,
  errorMessage: state.student.error,
  successMessage: state.student.successMessage,
  page: state.student.page,
  pages: state.student.pages,
});

const mapDispatchToProps = {
  getCourses,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardStudent);
