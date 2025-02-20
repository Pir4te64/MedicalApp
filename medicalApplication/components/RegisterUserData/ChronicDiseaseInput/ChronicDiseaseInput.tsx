import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import { Icon } from "react-native-elements";
import ChronicDiseaseItem from "./ChronicDiseaseItem";
import { ChronicDiseaseInputProps } from "./ChornicDiseaseInterface";

const ChronicDiseaseInput: React.FC<ChronicDiseaseInputProps> = ({
  newDisease,
  doctorEmail,
  medicalCenter,
  medication,
  dosage,
  onChangeDisease,
  onChangeDoctorEmail,
  onChangeMedicalCenter,
  onChangeMedication,
  onChangeDosage,
  onAddChronicDisease,
  chronicDiseases,
  onUpdateChronicDisease,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // obtener el ID para pasarle al usuario
  return (
    <View style={styles.container}>
      {/* Botón para expandir o colapsar */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={styles.title}>Agregar Enfermedad Crónica</Text>
        <Icon
          name={isExpanded ? "chevron-up" : "chevron-down"}
          type="feather"
          color="white"
        />
      </TouchableOpacity>

      {/* Contenedor que se despliega */}
      {isExpanded && (
        <View style={styles.box}>
          <Input
            label="Enfermedad"
            placeholder="Ej: Diabetes"
            value={newDisease}
            onChangeText={onChangeDisease}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <Input
            label="Correo del Doctor"
            placeholder="Ej: doctor@email.com"
            value={doctorEmail}
            onChangeText={onChangeDoctorEmail}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <Input
            label="Centro Médico"
            placeholder="Ej: Hospital Central"
            value={medicalCenter}
            onChangeText={onChangeMedicalCenter}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <Input
            label="Medicamento"
            placeholder="Ej: Insulina"
            value={medication}
            onChangeText={onChangeMedication}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <Input
            label="Dosis"
            placeholder="Ej: 10mg"
            value={dosage}
            onChangeText={onChangeDosage}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            keyboardType="numeric"
          />

          <Button
            title="Agregar Enfermedad"
            onPress={onAddChronicDisease}
            buttonStyle={styles.button}
            icon={<Icon name="plus" type="feather" color="white" />}
            iconPosition="right"
          />
        </View>
      )}

      {/* Lista de enfermedades agregadas */}
      <View style={styles.diseasesList}>
        {chronicDiseases.map((item, index) => (
          <View key={index} style={styles.diseaseItemContainer}>
            <ChronicDiseaseItem
              index={index}
              diseaseData={item}
              onUpdate={onUpdateChronicDisease}
              onDelete={() => console.log("Enfermedad eliminada")}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
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
    fontSize: 18,
    fontWeight: "600",
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
    marginBottom: 15,
  },
  input: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 5,
  },
  diseasesList: {
    marginTop: 20,
  },
  diseaseItemContainer: {
    marginBottom: 15,
    borderRadius: 8,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    padding: 10,
  },
});

export default ChronicDiseaseInput;
