import api from "../../../api/api";

import {
  GET_COURSES_REQUEST,
  GET_COURSES_SUCCESS,
  GET_COURSES_FAILURE,
  GET_COURSE_REQUEST,
  GET_COURSE_SUCCESS,
  GET_COURSE_FAILURE,
  GET_ENROLLMENTS_REQUEST,
  GET_ENROLLMENTS_SUCCESS,
  GET_ENROLLMENTS_FAILURE,
  CANCEL_ENROLLMENTS_REQUEST,
  CANCEL_ENROLLMENTS_SUCCESS,
  CANCEL_ENROLLMENTS_FAILURE,
  GET_GRADES_REQUEST,
  GET_GRADES_SUCCESS,
  GET_GRADES_FAILURE,
  ENROLL_COURSE_REQUEST,
  ENROLL_COURSE_SUCCESS,
  ENROLL_COURSE_FAILURE
} from "./types";

export const getCourses =
  (page = 1, filters = {}) =>
  async (dispatch) => {
    dispatch({ type: GET_COURSES_REQUEST });

    try {
      const query = new URLSearchParams({ page, ...filters }).toString();
      const response = await api.get(`/courses?${query}`);
      dispatch({
        type: GET_COURSES_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_COURSES_FAILURE,
        message: error.response?.data?.message || "Error al obtener los cursos",
      });
    }
  };

export const getCourse = (id) => async (dispatch) => {
  dispatch({ type: GET_COURSE_REQUEST });

  try {
    const response = await api.get(`/courses/${id}`);

    dispatch({
      type: GET_COURSE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_COURSE_FAILURE,
      message: error.response?.data?.message || "Error al obtener el curso",
    });
  }
};

export const getEnrollments =
  (studentId, page = 1, filters = {}) =>
  async (dispatch) => {
    dispatch({ type: GET_ENROLLMENTS_REQUEST });

    try {
      const query = new URLSearchParams({ page, ...filters }).toString();
      const response = await api.get(`/enrollments/student/${studentId}?${query}`);

      dispatch({
        type: GET_ENROLLMENTS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_ENROLLMENTS_FAILURE,
        message:
          error.response?.data?.message || "Error al obtener las inscripciones",
      });
    }
  };

export const getGrades =
  (studentId, page = 1, filters = {}) =>
  async (dispatch) => {
    dispatch({ type: GET_GRADES_REQUEST });

    try {
      const query = new URLSearchParams({ page, ...filters }).toString();
      const response = await api.get(`/grades/student/${studentId}?${query}`);

      dispatch({
        type: GET_GRADES_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_GRADES_FAILURE,
        message:
          error.response?.data?.message ||
          "Error al obtener las calificaciones",
      });
    }
  };

// POST ENROLLMENT - Inscribirse a un curso
// POST ENROLLMENT - Inscribirse a un curso
export const enrollInCourse = (courseId, studentId) => async (dispatch) => {
  dispatch({ type: ENROLL_COURSE_REQUEST });

  try {
    const response = await api.post(`/enrollments`, {
      course: courseId,
      student: studentId,
    });

    dispatch({
      type: ENROLL_COURSE_SUCCESS,
      payload: response.data,
      message: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: ENROLL_COURSE_FAILURE,
      message:
        error.response?.data?.message || "Error al inscribirse en el curso",
    });
  }
};


export const cancelEnrollment = (enrollmentId) => async (dispatch) => {
  dispatch({ type: CANCEL_ENROLLMENTS_REQUEST });

  try {
    const response = await api.delete(`/enrollments/${enrollmentId}`);


    dispatch({
      type: CANCEL_ENROLLMENTS_SUCCESS,
      payload: enrollmentId,
      message: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: CANCEL_ENROLLMENTS_FAILURE,
      message:
        error.response?.data?.message || "Error al eliminar la inscripción",
    });
  }
};
