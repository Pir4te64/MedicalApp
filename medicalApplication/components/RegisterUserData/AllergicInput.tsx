import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Yup from "yup"; // Importamos Yup

interface AllergyInputProps {
  title: string;
  placeholder: string;
  allergies: { allergy: string }[];
  onAddAllergy: (allergy: string) => void;
}

const AllergyInput: React.FC<AllergyInputProps> = ({
  title,
  placeholder,
  allergies,
  onAddAllergy,
}) => {
  const [allergy, setAllergy] = useState("");
  const [errors, setErrors] = useState<any>({});

  // Definir el esquema de validación con Yup
  const validationSchema = Yup.string()
    .max(100, "El nombre de la alergia debe tener menos de 100 caracteres")
    .matches(/^[a-zA-Z\s]*$/, "Solo se permiten letras y espacios en blanco");

  const validateInput = () => {
    validationSchema
      .validate(allergy, { abortEarly: false })
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
    <View>
      <Text style={styles.subtitle}>{title}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={allergy}
          onChangeText={setAllergy}
          onSubmitEditing={() => {
            if (allergy.trim() !== "") {
              validateInput();
              if (!errors.allergy) {
                onAddAllergy(allergy.trim());
                setAllergy(""); // Limpiar input al agregar
              }
            }
          }}
          onBlur={validateInput} // Valida cuando el input pierde foco
        />

        {/* Botón de agregar */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            if (allergy.trim() !== "") {
              validateInput();
              if (!errors.allergy) {
                onAddAllergy(allergy.trim());
                setAllergy(""); // Limpiar input al agregar
              }
            }
          }}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Mostrar el error si existe */}
      {errors.allergy && <Text style={styles.errorText}>{errors.allergy}</Text>}

      {/* Lista de alergias con punto */}
      <View style={styles.allergiesList}>
        {allergies.map((item, index) => (
          <View key={index} style={styles.allergyItem}>
            <Text style={styles.allergyText}>
              {/* Punto antes del texto */}• {item.allergy}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: "#333",
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: "#007BFF", // Azul vibrante
    padding: 5,
    marginLeft: 10,
    borderRadius: 50,
  },
  allergiesList: {
    marginTop: 10,
  },
  allergyItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  allergyText: {
    fontSize: 16, // Tamaño de fuente ajustado
    color: "#333",
    marginLeft: 5, // Para separar el punto del texto
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});

export default AllergyInput;
