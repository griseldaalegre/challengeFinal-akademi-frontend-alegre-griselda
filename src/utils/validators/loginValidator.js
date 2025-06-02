export const loginValidator = {
  email: {
    required: "El email es requerido",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Formato de email inválido",
    },
  },
  password: {
    required: "La contraseña es requerida",
    minLength: {
      value: 6,
      message: "Debe tener al menos 6 caracteres",
    },
  },
};
