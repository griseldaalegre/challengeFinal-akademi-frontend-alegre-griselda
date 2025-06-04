/*profesor:
 · Miscursos creados
 · Total de alumnos inscriptos
 · Botón"Crear Nuevo Curso"
 · Calificaciones*/
 import React, { useEffect, useState } from "react";
 import { connect } from "react-redux";
 import { Link } from "react-router-dom";
 import {
   getCourses,
   deleteCourse,
 } from "../../../../redux/store/professor/professorActions";
 
 import List from "../../../List";
 import RenderCourses from "../../../RenderCourse"; // ruta correcta según dónde esté
 import Pagination from "../../../Pagination";
 
 const DashboadProfessor = ({
   professorAuth,
   courses,
   page,
   pages,
   getCourses,
   deleteCourse,
   clearAllMessages,
 }) => {
   const idProfessor = professorAuth._id;
 
   const [category, setCategory] = useState("");
   const [level, setLevel] = useState("");
   const [price, setPrice] = useState("");
 
   // ✅ Función auxiliar para armar filtros actuales
   const getCurrentFilters = () => {
     const f = {};
     if (category) f.category = category;
     if (level) f.level = level;
     if (price) f.price = price;
     return f;
   };
   console.log(courses)
   useEffect(() => {
     if (idProfessor) {
       getCourses(idProfessor, page, getCurrentFilters());
     }
   }, [idProfessor, page, category, level, price, getCourses]);
   return (
    <div className="ui container">
      <h2 className="ui dividing header">Listado de Cursos</h2>

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

          <div className="field">
            <label>&nbsp;</label>
            <Link to="/professor/courses/add" className="ui primary button">
              Crear Curso
            </Link>
          </div>
        </div>
      </div>

      <List
        items={courses}
        deleteItem={deleteCourse}
        editBasePath="/professor/courses/enrollment"
        renderItem={RenderCourses}
      />

      {pages > 1 && (
        <Pagination
          totalPages={pages}
          currentPage={page}
          onPageChange={(newPage) =>
            getCourses(idProfessor, newPage, getCurrentFilters())
          }
        />
      )}
    </div>
  );
};
 
 const mapStateToProps = (state) => ({
   professorAuth: state.auth.user,
   courses: state.professor.courses,
   loading: state.professor.loading,
   errorMessage: state.professor.error,
   successMessage: state.professor.successMessage,
   page: state.professor.page,
   pages: state.professor.pages,
 });
 
 const mapDispatchToProps = {
   getCourses,
   deleteCourse,
 };
 
 export default connect(mapStateToProps, mapDispatchToProps)(DashboadProfessor);
 