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
      payload: {
        id,
        updatedData: response.data.user, // o como venga tu user actualizado
        message: response.data.message,  // 👈 asegurate que el back lo mande
      },
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
      payload: {
        id,
        message: response.data.message,
      },
    });
    
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAILURE,
      message: error.response?.data?.message || "Error al eliminar usuario", // mensaje de error
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
      error: error.response?.data?.message || "Error al agregar usuario", 
    });
  }
};

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


