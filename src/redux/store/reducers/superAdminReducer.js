import {
  GET_STATES_GENERAL_REQUEST,
  GET_STATES_GENERAL_SUCCESS,
  GET_STATES_GENERAL_FAILURE,
} from "../actions/types";

const initialState = {
  loading: false,
  states: {},
  successMessage: null,
  error: null,
};

export default function statesReducer(state = initialState, action) {
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

    default:
      return state;
  }
}
