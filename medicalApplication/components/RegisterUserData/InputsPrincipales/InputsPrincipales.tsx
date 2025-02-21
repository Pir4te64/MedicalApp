import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import * as Yup from "yup"; // Importamos Yup

interface InputsPrincipalesProps {
  formData: {
    weight: string;
    height: string;
    bloodType: string;
  };
  handleChange: (field: string, value: string) => void;
}

const InputsPrincipales: React.FC<InputsPrincipalesProps> = ({
  formData,
  handleChange,
}) => {
  const [errors, setErrors] = useState<any>({});

  // Definir el esquema de validación con Yup
  const validationSchema = Yup.object().shape({
    weight: Yup.number()
      .positive("El peso debe ser un número positivo")
      .required("El peso es obligatorio"),
    height: Yup.number()
      .positive("La altura debe ser un número positivo")
      .required("La altura es obligatoria"),
    bloodType: Yup.string()
      .oneOf(
        ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        "Tipo de sangre inválido"
      )
      .required("El tipo de sangre es obligatorio"),
  });

  const validateForm = () => {
    validationSchema
      .validate(formData, { abortEarly: false }) // Evita que se pare al primer error
      .then(() => {
        setErrors({});
      })
      .catch((err) => {
        const errorObj: any = {};
        err.inner.forEach((e: any) => {
          errorObj[e.path] = e.message;
        });
        setErrors(errorObj);
      });
  };

  return (
    <View style={styles.inputWrapper}>
      <Input
        label="Peso"
        placeholder="Ingrese su peso en kg"
        value={formData.weight}
        onChangeText={(value) => handleChange("weight", value)}
        errorMessage={errors.weight} // Muestra el error si existe
        onBlur={validateForm} // Valida cuando el input pierde foco
        keyboardType="numeric" // Acepta solo números
      />
      <Input
        label="Altura"
        placeholder="Ingrese su altura en cm"
        value={formData.height}
        onChangeText={(value) => handleChange("height", value)}
        errorMessage={errors.height} // Muestra el error si existe
        onBlur={validateForm} // Valida cuando el input pierde foco
        keyboardType="numeric" // Acepta solo números
      />
      <Input
        label="Tipo de Sangre"
        placeholder="A+, A-, B+, B-, AB+, AB-, O+, O-"
        value={formData.bloodType}
        onChangeText={(value) => handleChange("bloodType", value)}
        errorMessage={errors.bloodType} // Muestra el error si existe
        onBlur={validateForm} // Valida cuando el input pierde foco
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Para Android
    marginVertical: 10,
  },
});

export default InputsPrincipales;
