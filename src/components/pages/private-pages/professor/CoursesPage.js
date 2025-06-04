import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getCourses,deleteCourse } from "../../../../redux/store/professor/professorActions";
import { clearAllMessages } from "../../../../redux/store/shared/clearMessagesActions";

import List from "../../../List";
import RenderCourses from "../../../RenderCourse"; // ruta correcta según dónde esté

import Pagination from "../../../Pagination";

const CoursesPage = ({
  courses,
  page,
  pages,
  getCourses,
  deleteCourse,
  clearAllMessages,
}) => {
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    clearAllMessages();

    const filters = {};
    if (category) filters.category = category;
    if (level) filters.level = level;
    if (price) filters.price = price;

    getCourses(page, filters);
  }, [getCourses, clearAllMessages, page, category, level, price]);

  return (
    <div>
      <div className="ui grid">
        <div className="row">
          <div className="eight wide column left aligned">
            <h2>Listado de Cursos</h2>
          </div>
          <div className="eight wide column right aligned">
            {/* fitro por categoria */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Categoría</option>
              <option value="web">Desarrollo Web</option>
              <option value="cyber">Ciberseguridad</option>
            </select>
          </div>

          <div className="eight wide column right aligned">
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="">Nivel</option>
              <option value="beginner">Principiante</option>
              <option value="intermediate">Medio</option>
              <option value="advanced">Avanzado</option>
            </select>
          </div>

          <div className="eight wide column right aligned">
            {/* fitro por precio */}
            <select value={price} onChange={(e) => setPrice(e.target.value)}>
              <option value="">Precio</option>
              <option value="0">Gratuito</option>
              <option value="100">Pago</option>
            </select>
          </div>
        </div>
      </div>
      <List
        items={courses}
        deleteItem={deleteCourse}
        renderItem={RenderCourses}
        editBasePath="/courses"
      />

      {pages > 1 && (
        <Pagination
          totalPages={pages}
          currentPage={page}
          onPageChange={(newPage) => getCourses(newPage)}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  courses: state.professor.courses,
  page: state.professor.page,
  pages: state.professor.pages,
  deleteMessage: state.professor.deleteUserMessage,
});

const mapDispatchToProps = {
  getCourses,
  clearAllMessages,
  deleteCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
