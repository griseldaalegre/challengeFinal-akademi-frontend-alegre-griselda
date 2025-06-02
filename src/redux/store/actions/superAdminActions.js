import api from "../../../api/api";
import {
  GET_STATES_GENERAL_REQUEST,
  GET_STATES_GENERAL_SUCCESS,
  GET_STATES_GENERAL_FAILURE,
} from "../actions/types";

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
