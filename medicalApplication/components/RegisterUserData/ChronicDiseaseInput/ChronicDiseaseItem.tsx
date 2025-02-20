import React from "react";
import { View, Alert, StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons"; // Importamos Ionicons de Expo

interface ChronicDiseaseItemProps {
  index: number;
  diseaseData: {
    disease: string;
    doctorEmail: string;
    medicalCenter: string;
    medicalTreatmentUser: { medication: string; dosage: string }[];
  };
  onUpdate: (index: number, field: string, value: string) => void;
  onDelete: (index: number) => void; // Función para manejar la eliminación
}

const ChronicDiseaseItem: React.FC<ChronicDiseaseItemProps> = ({
  index,
  diseaseData,
  onUpdate,
  onDelete,
}) => {
  const handleDelete = () => {
    Alert.alert(
      "Eliminar Enfermedad",
      "¿Estás seguro de que deseas eliminar esta enfermedad?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            //onDelete(index); // Llamar a la función de eliminación pasada como prop
            console.log("Enfermedad eliminada");
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.diseaseContainer}>
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

      {/* Icono de eliminación flotante */}
      <Ionicons
        name="trash-bin-outline"
        size={20}
        color="red"
        style={styles.deleteIcon}
        onPress={handleDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  diseaseContainer: {
    marginBottom: 10, // Reduce el espacio entre cada item de enfermedad
    position: "relative", // Establecer para contener el icono flotante
  },
  inputContainer: {
    marginBottom: 5, // Reduce el espacio entre los inputs
  },
  input: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 5,
  },
  deleteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50, // Hacer el icono redondo
  },
});

export default ChronicDiseaseItem;
