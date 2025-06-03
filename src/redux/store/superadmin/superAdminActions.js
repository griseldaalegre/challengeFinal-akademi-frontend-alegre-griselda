import api from "../../../api/api";
import {
  GET_STATES_GENERAL_REQUEST,
  GET_STATES_GENERAL_SUCCESS,
  GET_STATES_GENERAL_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  GET_COURSES_REQUEST,
  GET_COURSES_FAILURE,
  GET_COURSES_SUCCESS,
  UPDATE_COURSE_REQUEST,
  UPDATE_COURSE_FAILURE,
  UPDATE_COURSE_SUCCESS,
  ADD_COURSE_REQUEST,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_FAILURE,
} from "./types";

export const getStatesGeneral = () => async (dispatch) => {
  dispatch({ type: GET_STATES_GENERAL_REQUEST });

  try {
    const response = await api.get("users/stats/general");

    dispatch({
      type: GET_STATES_GENERAL_SUCCESS,
      payload: {
        data: response.data,
      },
    });
  } catch (error) {
    dispatch({
      type: GET_STATES_GENERAL_FAILURE,
      message: error.message,
    });
  }
};

export const getUsers =
  (page = 1, filters = {}) =>
  async (dispatch) => {
    dispatch({ type: GET_USERS_REQUEST });

    try {
      // Convertimos los filtros a query params
      const query = new URLSearchParams({ page, ...filters }).toString();
      const response = await api.get(`/users?${query}`);

      dispatch({
        type: GET_USERS_SUCCESS,
        payload: response.data, // debe incluir data, page, pages, total
      });
    } catch (error) {
      dispatch({
        type: GET_USERS_FAILURE,
        message: error.response?.data?.message || "Error al obtener usuarios",
      });
    }
  };

export const editUser = (id, updatedData) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    const response = await api.patch(`/users/${id}`, updatedData);

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: { id, updatedData: response.data },
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAILURE,
      message: error.response?.data?.message || "Error al obtener usuarios",
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST });

  try {
    const response = await api.delete(`/users/${id}`);

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: id,
      message: response.data.message, // mensaje de éxito
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAILURE,
      error: error.response?.data?.message || "Error al eliminar usuario", // mensaje de error
    });
  }
};

export const addUser = (userData) => async (dispatch) => {
  dispatch({ type: ADD_USER_REQUEST });

  try {
    const response = await api.post("/users", {
      ...userData,
    });

    dispatch({
      type: ADD_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_USER_FAILURE,
      error: error.response?.data?.message || "Error al agregar usuario", // mensaje de error
    });
  }
};

//CURSOS

export const getCourses =
  (page = 1, filters = {}) =>
  async (dispatch) => {
    dispatch({ type: GET_COURSES_REQUEST });

    try {
      // Convertimos los filtros a query params
      const query = new URLSearchParams({ page, ...filters }).toString();
      const response = await api.get(`/courses?${query}`);

      dispatch({
        type: GET_COURSES_SUCCESS,
        payload: response.data, // debe incluir data, page, pages, total
      });
    } catch (error) {
      dispatch({
        type: GET_COURSES_FAILURE,
        message: error.response?.data?.message || "Error al obtener los cursos",
      });
    }
  };

//revisar
export const deleteCourse = (id) => async (dispatch) => {
  dispatch({ type: DELETE_USER_REQUEST });

  try {
    const response = await api.delete(`/users/${id}`);

    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: id,
      message: response.data.message, // mensaje de éxito
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAILURE,
      error: error.response?.data?.message || "Error al eliminar usuario", // mensaje de error
    });
  }
};

//ibas haciendo esto
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
    const response = await api.post("/users", {
      ...userData,
    });

    dispatch({
      type: ADD_COURSE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_COURSE_FAILURE,
      error: error.response?.data?.message || "Error al agregar usuario", // mensaje de error
    });
  }
};
