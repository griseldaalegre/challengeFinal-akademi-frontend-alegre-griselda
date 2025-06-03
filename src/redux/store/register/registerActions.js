import api from "../../../api/api";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
}from "./types";

export const registerUser = (studentData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const response = await api.post("/auth/register", {
      ...studentData,
    });

    dispatch({
      type: REGISTER_SUCCESS,
      payload: {
        user: response.data.user,        
        message: response.data.message,  
      },
    });
    
  } catch (e) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: {
        message: e.response?.data?.message || "Error al registrar usuario", 
      },
    });
  }
};
