// src/validators/gradesValidator.js
export const gradesValidator = {
    score: {
      required: "La calificación es obligatoria",
      min: 0,
      max: 10,
      message: "La calificación debe estar entre 0 y 10",
    },
  };
  