import * as Yup from "yup";

export const initialValues = {
  username: "", // DNI como nombre de usuario
  password: "",
};

export const schemaValidation = Yup.object({
  username: Yup.string()
    .matches(/^\d+$/, "El DNI solo puede contener números") // Solo números
    .min(7, "El DNI debe tener al menos 7 dígitos") // Ajusta según tu país
    .max(10, "El DNI no puede tener más de 10 dígitos") // Ajusta según tu país
    .required("El DNI es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
});
