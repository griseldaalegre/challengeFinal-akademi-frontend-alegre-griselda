


const RenderCourse = (course) => (
  <div className="content">
    <div>
      <strong>Título:</strong> {course.title}
    </div>
    <div>
      <strong>Categoría:</strong> {course.category}
    </div>
    <div>
      <strong>Profesor:</strong> {course.professor?.name ?? "N/A"}
    </div>
    <div>
      <strong>Precio:</strong> {course.price}
    </div>

  </div>
);

export default RenderCourse;

