import api from "../../../api/api";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../actions/types";
import { jwtDecode } from "jwt-decode";

export const login = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { data } = await api.post("/auth/login", credentials);

    localStorage.setItem("token", data.token);
    const decoded = jwtDecode(data.token);

    const user = {
      ...data.user,
      role: decoded.role,
      _id: decoded._id,
    };

    dispatch({
      type: LOGIN_SUCCESS,
      payload: user,
      message: data.message || "Login exitoso",
    });
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Error de login";
    dispatch({ type: LOGIN_FAILURE, payload: errorMsg });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await api.post("/auth/logout", {});

    localStorage.removeItem("token");
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.error("Error cerrando sesión:", error);
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT });
  }
};

export const loadUserFromToken = () => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const user = {
        _id: decoded._id,
        role: decoded.role, 
        name: decoded.name,
        email: decoded.email,
      };

      dispatch({ type: LOGIN_SUCCESS, payload: user });
    } catch (error) {
      console.error("Token inválido", error);
      dispatch({ type: LOGOUT });
    }
  } else {
    dispatch({ type: LOGOUT });
  }
};
