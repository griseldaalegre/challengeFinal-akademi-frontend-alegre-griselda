import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  addGrade,
  getEnrollmentsByCourse,
  getGradesByCourse,
  editGrade,
} from "../../../../redux/store/professor/professorActions";
import ListItems from "../../../ListIems";
import RenderEnrollment from "../../../RenderEnrollment";
import Loading from"../../../Loading";
const CourseDetailPage = ({
  enrollments,
  grades,
  loading,
  successMessage,
  error,
  getEnrollmentsByCourse,
  getGradesByCourse,
  addGrade,
  editGrade,
}) => {
  const { id: paramId } = useParams();

  useEffect(() => {
    getEnrollmentsByCourse(paramId);
    getGradesByCourse(paramId);
  }, [paramId, getEnrollmentsByCourse, getGradesByCourse]);
  

 
  
  const handleSubmitGrade = (studentId, score) => {
    // Buscar la nota correspondiente en la lista de notas
    const gradeOfStudent = grades.find(
      (g) => g.student === studentId && g.course === paramId
    );
  
    if (gradeOfStudent) {
      // Si ya hay nota, la actualizo
      editGrade(gradeOfStudent._id, { score });
    } else {
      // Si no hay nota, la creo
      addGrade({ student: studentId, course: paramId, score });
    }
  };
  
  const enrollmentsWithGrades = enrollments.map((enrollment) => {
    const grade = grades.find(
      (g) => g.student === enrollment.student._id && g.course === paramId
    );
    return {
      ...enrollment,
      grade: grade || null,
    };
  });

  const renderItem = (enrollment) => (
    <RenderEnrollment
      enrollment={enrollment}
      onSubmitGrade={handleSubmitGrade}
      onEditGrade={editGrade}
    />
  );

  return (
    <div className="ui container">
      <h2 className="ui dividing header">Alumnos inscriptos</h2>
      {loading ? (
       <Loading/>
      ) : (
        <ListItems items={enrollmentsWithGrades} renderItem={renderItem} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  enrollments: state.professor.enrollments,
  grades: state.professor.grades,
  loading: state.professor.loading,
  successMessage: state.professor.successMessage,
  error: state.professor.error,
});

const mapDispatchToProps = {
  getEnrollmentsByCourse,
  getGradesByCourse,
  addGrade,
  editGrade,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetailPage);
