import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { Icon } from "react-native-elements"; // Asegúrate de importar el componente Icon
import ChronicDiseaseItem from "./ChronicDiseaseItem";

interface ChronicDiseaseInputProps {
  newDisease: string;
  doctorEmail: string;
  medicalCenter: string;
  medication: string;
  dosage: string;
  onChangeDisease: (value: string) => void;
  onChangeDoctorEmail: (value: string) => void;
  onChangeMedicalCenter: (value: string) => void;
  onChangeMedication: (value: string) => void;
  onChangeDosage: (value: string) => void;
  onAddChronicDisease: () => void;
  chronicDiseases: {
    disease: string;
    doctorEmail: string;
    medicalCenter: string;
    medicalTreatmentUser: { medication: string; dosage: string }[];
  }[];
  onUpdateChronicDisease: (index: number, field: string, value: string) => void;
}

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
  // Función para validar que "dosis" sea un número
  const handleDosageChange = (value: string) => {
    // Aceptar solo números
    if (/^\d*\.?\d+$/.test(value) || value === "") {
      onChangeDosage(value);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Agregar Enfermedad Crónica</Text>

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
        onChangeText={handleDosageChange} // Validación de dosis
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        keyboardType="numeric" // Solo números
      />

      <Button
        title="Agregar Enfermedad"
        onPress={onAddChronicDisease}
        buttonStyle={styles.button}
        icon={
          <Icon
            name="plus"
            type="feather"
            color="white"
            style={{
              marginLeft: 5,
            }}
          />
        } // Aquí agregamos el icono
        iconPosition="right" // El icono estará a la izquierda del texto
      />

      {/* Lista de enfermedades crónicas ya agregadas con opción a editar */}
      <View style={styles.diseasesList}>
        {chronicDiseases.map((item, index) => (
          <View key={index} style={styles.diseaseItemContainer}>
            <ChronicDiseaseItem
              index={index}
              diseaseData={item}
              onUpdate={onUpdateChronicDisease}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#007BFF", // Azul vibrante
    paddingVertical: 10,
    borderRadius: 5,
  },
  diseasesList: {
    marginTop: 20,
  },
  diseaseItemContainer: {
    marginBottom: 15, // Espacio entre cada contenedor de enfermedad
    borderRadius: 8, // Bordes redondeados
    backgroundColor: "#fff", // Fondo blanco para cada contenedor
    shadowColor: "#000", // Sombra negra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.1, // Opacidad de la sombra
    shadowRadius: 6, // Radio de difuminado de la sombra
    elevation: 5, // Elevación para dispositivos Android (sombra)
    padding: 10, // Relleno dentro del contenedor
  },
});

export default ChronicDiseaseInput;
