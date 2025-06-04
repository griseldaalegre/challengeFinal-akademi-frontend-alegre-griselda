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

const initialState = {
  courses: [], // ✅ Añadido campo separado para los cursos
  enrollments: [],
  grades: [],
  total: 0,
  page: 1,
  pages: 1,
  loading: false,
  successMessage: null,
  error: null,
};

export default function statesReducer(state = initialState, action) {
  switch (action.type) {
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

    // 🚨 NUEVO CASO: Eliminación de curso
    case DELETE_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };

    case DELETE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        courses: state.courses.filter(
          (course) => course._id !== action.payload.id
        ),
        successMessage: action.payload.message,
        error: null,
      };

    case DELETE_COURSE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // asumimos que `payload` es el mensaje de error
        successMessage: null,
      };

    case UPDATE_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };

    case UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        courses: state.courses.map((course) =>
          course._id === action.payload.id
            ? { ...course, ...action.payload.updatedData }
            : course
        ),
        successMessage: "Curso actualizado con éxito",
        error: null,
      };

    case UPDATE_COURSE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
        successMessage: null,
      };
    case ADD_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };
    case ADD_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        courses: [...state.courses, action.payload],
        successMessage: "Curso agregado con éxito",
        error: null,
      };

    case ADD_COURSE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        successMessage: null,
      };
    case GET_ENROLLMENTS_BY_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };

    case GET_ENROLLMENTS_BY_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        enrollments: action.payload.data,
        page: action.payload.page,
        pages: action.payload.pages,
        total: action.payload.total,
        successMessage: action.payload.message,
        error: null,
      };

    case GET_ENROLLMENTS_BY_COURSE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        successMessage: null,
      };

    case GET_GRADE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };

    case GET_GRADE_SUCCESS:
      return {
        ...state,
        loading: false,
        grades: action.payload.data, // o simplemente action.payload si no viene anidado
        successMessage:
          action.payload.message || "Notas cargadas correctamente",
        error: null,
      };

    case GET_GRADE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        successMessage: null,
      };

    case ADD_GRADE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };

    case ADD_GRADE_SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: action.payload.message,
        error: null,
      };

    case ADD_GRADE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        successMessage: null,
      };

    default:
      return state;
  }
}
