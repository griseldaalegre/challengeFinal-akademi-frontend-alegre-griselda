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
import Loading from "../../../Loading";
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

  useEffect(() => console.log(grades))

  const handleSubmitGrade = (studentId, score) => {
    const gradeOfStudent = grades.find(
      (g) => String(g.student) === String(studentId) && String(g.course) === String(paramId)
    );
    

    if (gradeOfStudent) {
      editGrade(gradeOfStudent._id, { score });
    } else {
      addGrade({ student: studentId, course: paramId, score });
    }

  };

  const enrollmentsWithGrades = enrollments
  .filter((enrollment) => enrollment.student && enrollment.student._id)
  .map((enrollment) => {
    const grade = grades.find(
      (g) =>
        String(g.student) === String(enrollment.student._id) &&
        String(g.course) === String(paramId)
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
        <Loading />
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
