import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getCourses } from "../../../../redux/store/superadmin/superAdminActions";
import { clearAllMessages } from "../../../../redux/store/shared/clearMessagesActions";

import ListIems from "../../../ListIems";
import RenderCourses from "../../../RenderCourse"; // ruta correcta según dónde esté
import Loading from "../../../Loading";
import Pagination from "../../../Pagination";
import GridItems from "../../../RenderGrid";

const CoursesPage = ({
  courses,
  page,
  pages,
  getCourses,
  loading,
  clearAllMessages,
}) => {
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");

    const openModal = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCourse(null);
  };
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);


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
      {loading ? (
        <Loading />
      ) : (
        <>
     

          <GridItems
            items={courses}
            renderItem={RenderCourses}
          />

          {pages > 1 && (
            <Pagination
              totalPages={pages}
              currentPage={page}
              onPageChange={(newPage) => getCourses(newPage)}
            />
          )}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  courses: state.superadmin.courses,
  page: state.superadmin.page,
  pages: state.superadmin.pages,
  deleteMessage: state.superadmin.deleteUserMessage,
  loading: state.superadmin.loading,
});

const mapDispatchToProps = {
  getCourses,
  clearAllMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
