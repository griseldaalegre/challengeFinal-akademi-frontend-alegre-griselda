import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCourse,
  getEnrollments,
  enrollInCourse,
  cancelEnrollment,
} from "../../../../redux/store/student/studentActions";

const CourseStudentDetailPage = ({
  course,
  loading,
  getCourse,
  getEnrollments,
  enrollInCourse,
  cancelEnrollment,
  enrollments,
  userId,
}) => {
  const { id: paramId } = useParams();

  useEffect(() => {
    if (paramId) {
      getCourse(paramId);
    }
  }, [paramId, getCourse]);
  
  useEffect(() => {
    if (userId) {
      getEnrollments(userId);
    }
  }, [userId, getEnrollments]);
  
  useEffect(() => {
    if (paramId) {
      getCourse(paramId);
    }
  }, [enrollments.length, paramId, getCourse]);
  

  const isEnrolled = enrollments.find(
    (e) => e.course === paramId && e.student === userId
  );
  


  const handleEnroll = () => {
    if (paramId && userId) enrollInCourse(paramId, userId);
  };
  
  const handleUnenroll = () => {
    if (isEnrolled?._id) {
      cancelEnrollment(isEnrolled._id); 
    }
  };
  
  

  return (
    <div className="ui container">
      <h2 className="ui dividing header">Detalles de curso</h2>

      {loading ? (
        <p>Cargando...</p>
      ) : course ? (
        <div className="ui card">
          <div className="content">
            <div className="header">{course.course.title}</div>
            <div className="meta">{course.course.level}</div>
            <div className="description">{course.course.description}</div>
          </div>
          <div className="extra content">
            <div className="ui two buttons">
              {isEnrolled ? (
                <div className="ui red basic button" onClick={handleUnenroll}>
                  Eliminar inscripción
                </div>
              ) : (
                <div className="ui green basic button" onClick={handleEnroll}>
                  Inscribirme
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>No se encontró el curso</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  course: state.student.courseDetail,
  loading: state.student.loading,
  successMessage: state.student.successMessage,
  error: state.student.error,
  enrollments: state.student.enrollments,
  userId: state.auth.user._id,
});

const mapDispatchToProps = {
  getCourse,
  getEnrollments,
  enrollInCourse,
  cancelEnrollment,
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseStudentDetailPage);
