import React, { useState } from "react";
import {
  Text,
  ScrollView,
  View,
  TextInput,
  Button,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./InformacionStyles.styles";
import { Input } from "react-native-elements";
import { handleSubmit } from "./Register.data";

interface Afiliado {
  id: number;
}

interface RegisterDataFormProps {
  afiliado: Afiliado;
}

const RegisterDataForm: React.FC<RegisterDataFormProps> = ({ afiliado }) => {
  const [birthDate, setBirthDate] = useState(new Date());
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bloodType, setBloodType] = useState("");

  const [medicationAllergies, setMedicationAllergies] = useState<
    { allergy: string }[]
  >([]);
  const [otherAllergies, setOtherAllergies] = useState<{ allergy: string }[]>(
    []
  );
  const [chronicDiseases, setChronicDiseases] = useState<
    {
      disease: string;
      doctorEmail: string;
      medicalCenter: string;
      medicalTreatmentUser: { medication: string; dosage: string }[];
    }[]
  >([]);

  const [newDisease, setNewDisease] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [medicalCenter, setMedicalCenter] = useState("");
  const [medication, setMedication] = useState("");
  const [dosage, setDosage] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false); // 🔹 Ocultar el picker al seleccionar
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
  };

  const addMedicationAllergy = (allergy: string) => {
    if (allergy.trim() !== "") {
      setMedicationAllergies([...medicationAllergies, { allergy }]);
    }
  };

  const addOtherAllergy = (allergy: string) => {
    if (allergy.trim() !== "") {
      setOtherAllergies([...otherAllergies, { allergy }]);
    }
  };

  const addChronicDisease = () => {
    if (
      newDisease.trim() !== "" &&
      doctorEmail.trim() !== "" &&
      medicalCenter.trim() !== "" &&
      medication.trim() !== "" &&
      dosage.trim() !== ""
    ) {
      setChronicDiseases([
        ...chronicDiseases,
        {
          disease: newDisease,
          doctorEmail,
          medicalCenter,
          medicalTreatmentUser: [{ medication, dosage }],
        },
      ]);
      // Limpiar inputs después de agregar
      setNewDisease("");
      setDoctorEmail("");
      setMedicalCenter("");
      setMedication("");
      setDosage("");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>Fecha de Nacimiento</Text>

      <Button
        title="Seleccionar Fecha"
        onPress={() => setShowDatePicker(true)}
      />
      <Text style={styles.dateText}>
        {birthDate.toLocaleDateString()}{" "}
        {/* 📌 Muestra la fecha seleccionada */}
      </Text>

      {showDatePicker && (
        <DateTimePicker
          value={birthDate}
          mode="date"
          display={Platform.OS === "android" ? "calendar" : "spinner"} // 📌 Ajuste para Android
          onChange={handleDateChange}
        />
      )}

      <Input
        label="Peso"
        placeholder="Ingrese su peso"
        value={weight}
        onChangeText={setWeight}
        inputStyle={styles.input}
      />
      <Input
        label="Altura"
        placeholder="Ingrese su altura"
        value={height}
        onChangeText={setHeight}
        inputStyle={styles.input}
      />
      <Input
        label="Tipo de Sangre"
        placeholder="Ingrese su tipo de sangre"
        value={bloodType}
        onChangeText={setBloodType}
        inputStyle={styles.input}
      />

      {/* Alergias a medicamentos */}
      <View style={styles.allergyContainer}>
        <Text style={styles.subtitle}>Agregar Alergia a Medicamentos</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese alergia"
          onSubmitEditing={(e) => addMedicationAllergy(e.nativeEvent.text)}
        />
        {medicationAllergies.map((item, index) => (
          <Text key={index} style={styles.allergyText}>
            {item.allergy}
          </Text>
        ))}
      </View>

      {/* Otras alergias */}
      <View style={styles.allergyContainer}>
        <Text style={styles.subtitle}>Agregar Otras Alergias</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese alergia"
          onSubmitEditing={(e) => addOtherAllergy(e.nativeEvent.text)}
        />
        {otherAllergies.map((item, index) => (
          <Text key={index} style={styles.allergyText}>
            {item.allergy}
          </Text>
        ))}
      </View>

      {/* Enfermedades Crónicas */}
      <View style={styles.allergyContainer}>
        <Text style={styles.subtitle}>Agregar Enfermedad Crónica</Text>
        <Input
          label="Enfermedad"
          placeholder="Ej: Diabetes"
          value={newDisease}
          onChangeText={setNewDisease}
        />
        <Input
          label="Correo del Doctor"
          placeholder="Ej: doctor@email.com"
          value={doctorEmail}
          onChangeText={setDoctorEmail}
        />
        <Input
          label="Centro Médico"
          placeholder="Ej: Hospital Central"
          value={medicalCenter}
          onChangeText={setMedicalCenter}
        />
        <Input
          label="Medicamento"
          placeholder="Ej: Insulina"
          value={medication}
          onChangeText={setMedication}
        />
        <Input
          label="Dosis"
          placeholder="Ej: 10mg"
          value={dosage}
          onChangeText={setDosage}
        />
        <Button title="Agregar Enfermedad" onPress={addChronicDisease} />

        {chronicDiseases.map((item, index) => (
          <View key={index} style={styles.diseaseContainer}>
            <Text style={styles.allergyText}>Enfermedad: {item.disease}</Text>
            <Text style={styles.allergyText}>Doctor: {item.doctorEmail}</Text>
            <Text style={styles.allergyText}>
              Centro Médico: {item.medicalCenter}
            </Text>
            <Text style={styles.allergyText}>
              Medicamento: {item.medicalTreatmentUser[0].medication}
            </Text>
            <Text style={styles.allergyText}>
              Dosis: {item.medicalTreatmentUser[0].dosage}
            </Text>
          </View>
        ))}
      </View>

      {/* Botón de Registro */}
      <View style={styles.submitButton}>
        <Text
          style={styles.submitButtonText}
          onPress={() =>
            handleSubmit(
              afiliado,
              birthDate,
              weight,
              height,
              bloodType,
              medicationAllergies,
              otherAllergies,
              chronicDiseases
            )
          }
        >
          Registrarse
        </Text>
      </View>
    </ScrollView>
  );
};

export default RegisterDataForm;
