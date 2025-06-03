export const courseValidator = {
    title: {
      required: "El título es obligatorio",
      minLength: {
        value: 3,
        message: "El título debe tener al menos 3 caracteres",
      },
    },
    description: {
      maxLength: {
        value: 1000,
        message: "La descripción no puede superar los 1000 caracteres",
      },
    },
    category: {
      required: "La categoría es obligatoria",
      validate: (value) =>
        ["web", "cyber"].includes(value) || "Categoría inválida",
    },
    level: {
      required: "El nivel es obligatorio",
      validate: (value) =>
        ["beginner", "intermediate", "advanced"].includes(value) ||
        "Nivel inválido",
    },
    price: {
      required: "El precio es obligatorio",
      min: {
        value: 0,
        message: "El precio debe ser un número positivo",
      },
    },
    capacity: {
      required: "La capacidad es obligatoria",
      min: {
        value: 1,
        message: "La capacidad debe ser al menos 1",
      },
    },
    professor: {
      required: "El profesor es obligatorio",
    },
  };
  