import React, { useState, useEffect } from "react";
import { Text, ScrollView, View, Alert } from "react-native";
import { styles } from "./InformacionStyles.styles";
import { Input } from "react-native-elements";
import AllergyInput from "./AllergicInput";
import DatePickerInput from "./DatePicker";
import ChronicDiseaseInput from "./ChronicDiseaseInput";
import { getUserData } from "./Register.fetch";
import { handleSubmit } from "./Register.data"; // Asegúrate de importar la función handleSubmit

interface Afiliado {
  id: number;
}

interface RegisterDataFormProps {
  afiliado: Afiliado;
}

const RegisterDataForm: React.FC<RegisterDataFormProps> = ({ afiliado }) => {
  const [formData, setFormData] = useState({
    birthDate: new Date(),
    weight: "",
    height: "",
    bloodType: "",
    medicationAllergies: [] as { allergy: string }[],
    otherAllergies: [] as { allergy: string }[],
    chronicDiseases: [] as {
      disease: string;
      doctorEmail: string;
      medicalCenter: string;
      medicalTreatmentUser: { medication: string; dosage: string }[];
    }[],
    newDisease: "",
    doctorEmail: "",
    medicalCenter: "",
    medication: "",
    dosage: "",
  });

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Llamar a la función getUserData cuando el componente se monta
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserData(afiliado.id);
        console.log("Datos del usuario:", JSON.stringify(response, null, 2));

        // Verifica si la respuesta es exitosa y si contiene el cuerpo de datos
        if (response.success && response.body) {
          const {
            birthDate,
            weight,
            height,
            bloodType,
            medicationAllergyUsers,
            otherAllergiesUsers,
            chronicDiseasesUsersRequest,
          } = response.body;

          // Establecer los valores en el estado
          setFormData((prev) => ({
            ...prev,
            birthDate: new Date(birthDate[0], birthDate[1] - 1, birthDate[2]), // Ajusta la fecha
            weight: weight || "", // Establecer un valor vacío si no hay
            height: height || "",
            bloodType: bloodType || "",
            medicationAllergies: medicationAllergyUsers || [],
            otherAllergies: otherAllergiesUsers || [],
            chronicDiseases: chronicDiseasesUsersRequest || [],
          }));
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUserData();
  }, [afiliado.id]);

  const validateChronicDiseaseFields = () => {
    const { newDisease, doctorEmail, medicalCenter, medication, dosage } = formData;
    return newDisease && doctorEmail && medicalCenter && medication && dosage;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>Fecha de Nacimiento</Text>
      <DatePickerInput
        date={formData.birthDate}
        onChange={(date) => handleChange("birthDate", date)}
      />
      <Input
        label="Peso"
        placeholder="Ingrese su peso"
        value={formData.weight}
        onChangeText={(value) => handleChange("weight", value)}
        inputStyle={styles.input}
      />
      <Input
        label="Altura"
        placeholder="Ingrese su altura"
        value={formData.height}
        onChangeText={(value) => handleChange("height", value)}
        inputStyle={styles.input}
      />
      <Input
        label="Tipo de Sangre"
        placeholder="Ingrese su tipo de sangre"
        value={formData.bloodType}
        onChangeText={(value) => handleChange("bloodType", value)}
        inputStyle={styles.input}
      />

      {/* Alergias a medicamentos */}
      <AllergyInput
        title="Agregar Alergia a Medicamentos"
        placeholder="Ingrese alergia"
        allergies={formData.medicationAllergies}
        onAddAllergy={(allergy) => handleChange("medicationAllergies", [...formData.medicationAllergies, { allergy }])}
      />

      {/* Otras alergias */}
      <AllergyInput
        title="Agregar Otras Alergias"
        placeholder="Ingrese otra alergia"
        allergies={formData.otherAllergies}
        onAddAllergy={(allergy) => handleChange("otherAllergies", [...formData.otherAllergies, { allergy }])}
      />

      {/* Enfermedades Crónicas */}
      <ChronicDiseaseInput
        newDisease={formData.newDisease}
        doctorEmail={formData.doctorEmail}
        medicalCenter={formData.medicalCenter}
        medication={formData.medication}
        dosage={formData.dosage}
        chronicDiseases={formData.chronicDiseases}
        onChangeDisease={(value) => handleChange("newDisease", value)}
        onChangeDoctorEmail={(value) => handleChange("doctorEmail", value)}
        onChangeMedicalCenter={(value) => handleChange("medicalCenter", value)}
        onChangeMedication={(value) => handleChange("medication", value)}
        onChangeDosage={(value) => handleChange("dosage", value)}
        onAddChronicDisease={() => {
          if (validateChronicDiseaseFields()) {
            handleChange("chronicDiseases", [
              ...formData.chronicDiseases,
              {
                disease: formData.newDisease,
                doctorEmail: formData.doctorEmail,
                medicalCenter: formData.medicalCenter,
                medicalTreatmentUser: [{ medication: formData.medication, dosage: formData.dosage }],
              },
            ]);
            // Limpiar campos
            handleChange("newDisease", "");
            handleChange("doctorEmail", "");
            handleChange("medicalCenter", "");
            handleChange("medication", "");
            handleChange("dosage", "");
          } else {
            Alert.alert("Error", "Por favor, complete todos los campos de enfermedades crónicas.");
          }
        }}
      />

      {/* Botón de Registrar */}
      <View style={styles.submitButton}>
        <Text
          style={styles.submitButtonText}
          onPress={() =>
            handleSubmit(
              afiliado,
              formData.birthDate,
              formData.weight,
              formData.height,
              formData.bloodType,
              formData.medicationAllergies,
              formData.otherAllergies,
              formData.chronicDiseases
            )
          }
        >
          Registrar
        </Text>
      </View>
    </ScrollView>
  );
};

export default RegisterDataForm;
