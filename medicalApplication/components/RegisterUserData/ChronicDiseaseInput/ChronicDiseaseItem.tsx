import React, { useState } from "react";
import { View, Alert, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

interface ChronicDiseaseItemProps {
  index: number;
  diseaseData: {
    disease: string;
    doctorEmail: string;
    medicalCenter: string;
    medicalTreatmentUser: { medication: string; dosage: string }[];
  };
  onUpdate: (index: number, field: string, value: string) => void;
  onDelete: (index: number) => void;
}

const ChronicDiseaseItem: React.FC<ChronicDiseaseItemProps> = ({
  index,
  diseaseData,
  onUpdate,
  onDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDelete = () => {
    Alert.alert(
      "Eliminar Enfermedad",
      "¿Estás seguro de que deseas eliminar esta enfermedad?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: () => onDelete(index),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View>
      {/* Botón para expandir/cerrar */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={styles.title}>{diseaseData.disease}</Text>
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={20}
          color="white"
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.box}>
          <Input
            label="Enfermedad"
            value={diseaseData.disease}
            onChangeText={(value) => onUpdate(index, "disease", value)}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <Input
            label="Correo del Doctor"
            value={diseaseData.doctorEmail}
            onChangeText={(value) => onUpdate(index, "doctorEmail", value)}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <Input
            label="Centro Médico"
            value={diseaseData.medicalCenter}
            onChangeText={(value) => onUpdate(index, "medicalCenter", value)}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <Input
            label="Medicamento"
            value={diseaseData.medicalTreatmentUser[0].medication}
            onChangeText={(value) => onUpdate(index, "medication", value)}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <Input
            label="Dosis"
            value={diseaseData.medicalTreatmentUser[0].dosage}
            onChangeText={(value) => onUpdate(index, "dosage", value)}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />

          {/* Botón de eliminación */}
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Ionicons name="trash-bin-outline" size={20} color="white" />
            <Text style={styles.deleteText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  box: {
    marginTop: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    color: "#333",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteText: {
    color: "white",
    fontSize: 16,
    marginLeft: 5,
  },
});

export default ChronicDiseaseItem;
