import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCourses,
  deleteCourse,
} from "../../../redux/store/superadmin/superAdminActions";
import { clearAllMessages } from "../../../redux/store/shared/clearMessagesActions";

import ListIems from "../../ListIems";
import RenderCourses from "../../RenderCourse";

import Pagination from "../../Pagination";

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

  const onResetFilter = () => {
    setCategory("");
    setLevel("");
    setPrice("");
    page = 1;
  };

  return (
    <div>
      <div className="ui grid">
        <div className="row">
          <div className="eight wide column left aligned">
            <h2>Listado de Usuarios</h2>
          </div>

          <div className="field container-btn">
            <button className="ui grey button" onClick={onResetFilter}>
              Restaurar filtros
            </button>
          </div>

          <div className="eight wide column  aligned">


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
              <option value=">0">Pago</option>
            </select>
          </div>
        </div>
      </div>
      <Link to={"/course/add"} className="right floated content">
        <div className="ui button">Crear Curso</div>
      </Link>
      <ListIems
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
  courses: state.superadmin.courses,
  page: state.superadmin.page,
  pages: state.superadmin.pages,
  deleteMessage: state.superadmin.deleteUserMessage,
});

const mapDispatchToProps = {
  getCourses,
  deleteCourse,
  clearAllMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
