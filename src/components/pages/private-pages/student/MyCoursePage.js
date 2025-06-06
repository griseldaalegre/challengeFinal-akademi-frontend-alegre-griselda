import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getEnrollments } from "../../../../redux/store/student/studentActions.js";

import ListaCursoEstudiante from "../../../ListaCursoEstudiante.js";
import RenderCourses from "../../../RenderCourse";
import Pagination from "../../../Pagination";
import Loading from "../../../Loading.js";
const MyCoursePage = ({
  studentAuth,
  enrollments,
  page,
  pages,
  getEnrollments,
  deleteCourse,
  clearAllMessages,
  loading,
}) => {
  const studentId = studentAuth._id;
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
    if (studentId) {
      getEnrollments(studentId, page, getCurrentFilters());
    }
  }, [studentId, page, category, level, price, getEnrollments]);
  const renderEnrollment = (enrollment) => {
    const course = enrollment.course;
    return (
      <RenderCourses
        title={course.title}
        category={course.category}
        professor={course.professor}
        price={course.price}
      />
    );
  };

  return (
    <div className="ui container">
      <h2 className="ui dividing header">Listado de Cursos</h2>

      {loading ? (
        <Loading />
      ) : (
        <>
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
          <ListaCursoEstudiante
            items={enrollments}
            renderItem={renderEnrollment}
            showButton={false}
          />
          {pages > 1 && (
            <Pagination
              totalPages={pages}
              currentPage={page}
              onPageChange={(newPage) =>
                getEnrollments(newPage, getCurrentFilters())
              }
            />
          )}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  studentAuth: state.auth.user,
  enrollments: state.student.enrollments,
  loading: state.student.loading,
  errorMessage: state.student.error,
  successMessage: state.student.successMessage,
  page: state.student.page,
  pages: state.student.pages,
});

const mapDispatchToProps = {
  getEnrollments,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCoursePage);
