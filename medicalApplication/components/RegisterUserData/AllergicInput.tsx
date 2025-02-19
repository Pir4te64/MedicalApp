import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de instalar esta librería para el ícono

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
              onAddAllergy(allergy.trim());
              setAllergy(""); // Limpiar input al agregar
            }
          }}
        />

        {/* Botón de agregar */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            if (allergy.trim() !== "") {
              onAddAllergy(allergy.trim());
              setAllergy(""); // Limpiar input al agregar
            }
          }}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

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
});

export default AllergyInput;
