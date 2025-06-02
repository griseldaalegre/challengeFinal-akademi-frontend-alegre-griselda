export const registerValidator = {
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
    name: {
      required: "El nombre es requerido",
    },
    dni: {
      required: "El DNI es requerido",
    },
    role: {
      validate: (value) => value === "student" || "Solo se puede registrar alumnos",
    },
  };
  