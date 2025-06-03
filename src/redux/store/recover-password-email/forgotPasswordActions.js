import api from "../../../api/api";

import {
  SEND_RECOVERY_EMAIL_PASS_REQUEST,
  SEND_RECOVERY_EMAIL_PASS_SUCCESS,
  SEND_RECOVERY_EMAIL_PASS_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "./types";

export const sendEmailRecoveryPassword = (emailUser) => async (dispatch) => {
  dispatch({ type: SEND_RECOVERY_EMAIL_PASS_REQUEST });

  try {
    const response = await api.post("/auth/forgot-password", emailUser);

    dispatch({
      type: SEND_RECOVERY_EMAIL_PASS_SUCCESS,
      payload: {
        message: response.data.message,
        email: emailUser.email,
      },
    });
  } catch (error) {
    dispatch({
      type: SEND_RECOVERY_EMAIL_PASS_FAILURE,
      payload: {
        error:
          error.response?.data?.message || "Error al enviar email de recupero",
      },
    });
  }
};

export const resetPassword = (token, newPassword) => async (dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });

  try {
    const response = await api.post(`/auth/reset-password`, {
      token,
      password: newPassword,
    });

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: { message: response.data.message },
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAILURE,
      payload: {
        message: error.response?.data?.message || "Error desconocido",
      },
    });
  }
};
