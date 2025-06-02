import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../actions/types";

const initialState = {
  user: null,
  loading: false,
  error: null,
  successMessage: null,
  authChecked: false, 
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null, successMessage: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        successMessage: action.payload.message,
        authChecked: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        user: null,
        loading: false,
        successMessage: null,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
        successMessage: null,
        authChecked: true, 
      };

    default:
      return state;
  }
};

export default authReducer;
