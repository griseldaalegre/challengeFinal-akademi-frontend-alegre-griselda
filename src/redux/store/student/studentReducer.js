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
  ENROLL_COURSE_REQUEST,
  ENROLL_COURSE_SUCCESS,
  ENROLL_COURSE_FAILURE,
  CANCEL_ENROLLMENTS_REQUEST,
  CANCEL_ENROLLMENTS_SUCCESS,
  CANCEL_ENROLLMENTS_FAILURE,
  GET_GRADES_REQUEST,
  GET_GRADES_SUCCESS,
  GET_GRADES_FAILURE,
} from "./types";

const initialState = {
  courses: [], // ✅ Añadido campo separado para los cursos
  courseDetail: null, // 👉 Agregado
  enrollments: [],
  grades: [],
  total: 0,
  page: 1,
  pages: 1,
  loading: false,
  successMessage: null,
  error: null,
};
export default function studentReducer(state = initialState, action) {
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
    case GET_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
        courseDetail: null,
      };

    case GET_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        courseDetail: action.payload,
        error: null,
      };

    case GET_COURSE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
        courseDetail: null,
      };

    case GET_ENROLLMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
        courseDetail: null,
      };

    case GET_ENROLLMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        enrollments: action.payload.data,
        page: action.payload.page,
        pages: action.payload.pages,
        total: action.payload.total,
        error: null,
        successMessage: action.payload.message,
      };

    case GET_ENROLLMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
        courseDetail: null,
      };
    case ENROLL_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };

    case ENROLL_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        enrollments: [...state.enrollments, action.payload.enrollment], // ✅ actualiza la lista
        successMessage: action.message,
        error: null,
      };

    case ENROLL_COURSE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
        successMessage: null,
      };

    case CANCEL_ENROLLMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };

    case CANCEL_ENROLLMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        enrollments: state.enrollments.filter((e) => e._id !== action.payload), // 🛠️ corregido
        successMessage: action.message,
        error: null,
      };
    case CANCEL_ENROLLMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.message,
        successMessage: null,
      };

    // ✅ Manejo de calificaciones
    case GET_GRADES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };

    case GET_GRADES_SUCCESS:
      return {
        ...state,
        loading: false,
        grades: action.payload.data,
        page: action.payload.page,
        pages: action.payload.pages,
        total: action.payload.total,
        successMessage: action.payload.message,
        error: null,
      };

    case GET_GRADES_FAILURE:
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
