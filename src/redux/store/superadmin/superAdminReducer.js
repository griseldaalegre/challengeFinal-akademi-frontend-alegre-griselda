import {
  GET_STATES_GENERAL_REQUEST,
  GET_STATES_GENERAL_SUCCESS,
  GET_STATES_GENERAL_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  GET_COURSES_REQUEST,
  GET_COURSES_SUCCESS,
  GET_COURSES_FAILURE,
} from "./types";

const initialState = {
  users: [],
  courses: [], // ✅ Añadido campo separado para los cursos

  total: 0,
  page: 1,
  pages: 1,
  states: {},
  loading: false,
  successMessage: null,
  error: null,
};

//cambiar nombre abtes era stareReducer
export default function superAdminReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STATES_GENERAL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };

    case GET_STATES_GENERAL_SUCCESS:
      return {
        ...state,
        loading: false,
        states: action.payload.data,
        error: null,
        successMessage: action.payload.message,
      };

    case GET_STATES_GENERAL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
        successMessage: null,
      };

    case GET_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };

    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.data, // ✅ acá van los usuarios
        page: action.payload.page,
        pages: action.payload.pages,
        total: action.payload.total,
        error: null,
        successMessage: action.payload.message,
      };

    case GET_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
        successMessage: null,
      };

    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user._id !== action.payload),
        successMessage: action.message,
      };

    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ADD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };

    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload],
        successMessage: action.payload.message,
      };

    case ADD_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case GET_COURSES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };

      case GET_COURSES_SUCCESS:
        return {
          ...state,
          loading: false,
          courses: action.payload.data, // ✅ Guardar cursos acá, NO en users
          page: action.payload.page,
          pages: action.payload.pages,
          total: action.payload.total,
          error: null,
          successMessage: action.payload.message,
        };
      

    case GET_COURSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
        successMessage: null,
      };
    default:
      return state;
  }
}
