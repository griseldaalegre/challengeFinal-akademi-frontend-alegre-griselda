import {
  SEND_RECOVERY_EMAIL_PASS_REQUEST,
  SEND_RECOVERY_EMAIL_PASS_SUCCESS,
  SEND_RECOVERY_EMAIL_PASS_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  CLEAR_ALL_MESSAGES
} from "./types";

const initialState = {
  loading: false,
  error: null,
  recoveryMessage: null, 
};

const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_RECOVERY_EMAIL_PASS_REQUEST:
      return {
        loading: true,
        error: null,
        recoveryMessage: null,
      };

    case SEND_RECOVERY_EMAIL_PASS_SUCCESS:
      return {
        loading: false,
        error: null,
        recoveryMessage: action.payload.message,
      };
    case SEND_RECOVERY_EMAIL_PASS_FAILURE:
      return {
        loading: false,
        error: action.payload.error,
        recoveryMessage: null,
      };

    case RESET_PASSWORD_REQUEST:
      return {
        loading: true,
        error: null,
        recoveryMessage: null,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        recoveryMessage: action.payload.message, 
      };

    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.message, 
      };

    case CLEAR_ALL_MESSAGES:
      return {
        ...state,
        error: null,
        recoveryMessage: null,
      };

    default:
      return state;
  }
};

export default forgotPasswordReducer;
