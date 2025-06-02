import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_ALL_MESSAGES
} from "../actions/types";

const initialState = {
  loading: false,
  user: null,
  error: null, 
  successMessage: null,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        successMessage: action.payload.message,
      };

      case REGISTER_FAILURE:
        return {
          ...state,
          loading: false,
          successMessage: null,
          error: action.payload.message,
        };
      
      case CLEAR_ALL_MESSAGES:
        return {
          ...state,
          loading: false,
          error: null,
          successMessage: null,
        };
    default:
      return state;
  }
};

export default registerReducer;
