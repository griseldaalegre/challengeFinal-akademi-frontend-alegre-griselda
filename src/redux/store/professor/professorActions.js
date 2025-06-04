import api from "../../../api/api";
import {
  GET_COURSES_REQUEST,
  GET_COURSES_SUCCESS,
  GET_COURSES_FAILURE,
  DELETE_COURSE_REQUEST,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAILURE,
  UPDATE_COURSE_REQUEST,
  UPDATE_COURSE_SUCCESS,
  UPDATE_COURSE_FAILURE,
  ADD_COURSE_REQUEST,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAILURE,
  GET_ENROLLMENTS_BY_COURSE_REQUEST,
  GET_ENROLLMENTS_BY_COURSE_SUCCESS,
  GET_ENROLLMENTS_BY_COURSE_FAILURE,
  GET_GRADE_REQUEST,
  GET_GRADE_SUCCESS,
  GET_GRADE_FAILURE,
  ADD_GRADE_REQUEST,
  ADD_GRADE_SUCCESS,
  ADD_GRADE_FAILURE,
} from "./type";

export const getCourses =
  (id, page = 1, filters = {}) =>
  async (dispatch) => {
    dispatch({ type: GET_COURSES_REQUEST });
    try {
      const query = new URLSearchParams({ page, ...filters }).toString();
      const response = await api.get(`/courses/professor/${id}?${query}`);
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

export const deleteCourse = (id) => async (dispatch) => {
  dispatch({ type: DELETE_COURSE_REQUEST });

  try {
    const response = await api.delete(`/courses/${id}`);
    dispatch({
      type: DELETE_COURSE_SUCCESS,
      payload: {
        id,
        message: response.data.message || "Curso eliminado con éxito",
      },
    });
  } catch (error) {
    dispatch({
      type: DELETE_COURSE_FAILURE,
      payload: error.response?.data?.message || "Error al eliminar el curso",
    });
  }
};

export const editCourse = (id, updatedData) => async (dispatch) => {
  dispatch({ type: UPDATE_COURSE_REQUEST });
  try {
    const response = await api.patch(`/courses/${id}`, updatedData);

    dispatch({
      type: UPDATE_COURSE_SUCCESS,
      payload: { id, updatedData: response.data },
    });
  } catch (error) {
    dispatch({
      type: UPDATE_COURSE_FAILURE,
      message: error.response?.data?.message || "Error actualizar curso",
    });
  }
};

export const addCourse = (userData) => async (dispatch) => {
  dispatch({ type: ADD_COURSE_REQUEST });

  try {
    const response = await api.post("/courses", {
      ...userData,
    });

    dispatch({
      type: ADD_COURSE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_COURSE_FAILURE,
      error: error.response?.data?.message || "Error al agregar curso", // mensaje de error
    });
  }
};

export const getEnrollmentsByCourse =
  (courseId, page = 1) =>
  async (dispatch) => {
    dispatch({ type: GET_ENROLLMENTS_BY_COURSE_REQUEST });

    try {
      const response = await api.get(
        `/enrollments/course/${courseId}?page=${page}`
      );
      dispatch({
        type: GET_ENROLLMENTS_BY_COURSE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_ENROLLMENTS_BY_COURSE_FAILURE,
        payload:
          error.response?.data?.message || "Error al obtener inscripciones",
      });
    }
  };

  export const getGradesByCourse = (courseId) => async (dispatch) => {
    dispatch({ type: GET_GRADE_REQUEST });
  
    try {
      const response = await api.get(`/grades/courses/${courseId}`); // ← corregido
      dispatch({
        type: GET_GRADE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_GRADE_FAILURE,
        payload:
          error.response?.data?.message || "Error al obtener calificaciones",
      });
    }
  };
  
  

export const addGrade = (gradeData) => async (dispatch) => {
  dispatch({ type: ADD_GRADE_REQUEST });

  try {
    const response = await api.post("/grades", gradeData);
    dispatch({
      type: ADD_GRADE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_GRADE_FAILURE,
      payload: error.response?.data?.message || "Error al cargar calificación",
    });
  }
};
