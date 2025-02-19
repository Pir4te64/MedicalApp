import React, { useState, useEffect } from "react";
import { Text, ScrollView, View, Alert } from "react-native";
import { styles } from "./InformacionStyles.styles";
import { Input } from "react-native-elements";
import AllergyInput from "./AllergicInput";
import DatePickerInput from "./DatePicker/DatePicker";
import ChronicDiseaseInput from "./ChronicDiseaseInput";
import { getUserData } from "./Register.fetch";
import { handleSubmit } from "./Register.data"; // Asegúrate de importar la función handleSubmit
import { getUpdatedInfo } from "./Register.Update";
import { GuardarInfoActualizada } from "./GuardarInfoActualizada";
import InputsPrincipales from "./InputsPrincipales/InputsPrincipales";
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

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // Función para actualizar una enfermedad crónica existente
  const onUpdateChronicDisease = (
    index: number,
    field: string,
    value: string
  ) => {
    setFormData((prev) => {
      const updatedDiseases = [...prev.chronicDiseases];
      const currentDisease = { ...updatedDiseases[index] };

      if (field === "medication" || field === "dosage") {
        // Actualizamos la información dentro del objeto medicalTreatmentUser
        currentDisease.medicalTreatmentUser[0] = {
          ...currentDisease.medicalTreatmentUser[0],
          [field]: value,
        };
      } else {
        currentDisease[field] = value;
      }
      updatedDiseases[index] = currentDisease;
      return { ...prev, chronicDiseases: updatedDiseases };
    });
  };

  // Llamar a la función getUserData cuando el componente se monta
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserData(afiliado.id);
        console.log("Datos del usuario:", JSON.stringify(response, null, 2));

        if (response.success && response.body) {
          const {
            birthDate,
            weight,
            height,
            bloodType,
            medicationAllergyUsers,
            otherAllergiesUsers,
            chronicDiseasesUsers, // Propiedad correcta
          } = response.body;

          setFormData((prev) => ({
            ...prev,
            birthDate: new Date(birthDate[0], birthDate[1] - 1, birthDate[2]),
            weight: weight || "",
            height: height || "",
            bloodType: bloodType || "",
            medicationAllergies: medicationAllergyUsers || [],
            otherAllergies: otherAllergiesUsers || [],
            chronicDiseases: chronicDiseasesUsers || [],
          }));
          setIsDataLoaded(true);
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUserData();
  }, [afiliado.id]);

  const validateChronicDiseaseFields = () => {
    const { newDisease, doctorEmail, medicalCenter, medication, dosage } =
      formData;
    return newDisease && doctorEmail && medicalCenter && medication && dosage;
  };

  const handleUpdateInfo = async () => {
    const updatedInfo = getUpdatedInfo(afiliado, formData);

    try {
      const resultado = await GuardarInfoActualizada(updatedInfo);
      console.log(
        "Datos del usuario actualizado:",
        JSON.stringify(resultado, null, 2)
      );

      // Mostrar alert cuando los datos se hayan guardado
      Alert.alert("Éxito", "Datos actualizados correctamente.");
    } catch (error) {
      console.error("Error al actualizar la información:", error);
      Alert.alert("Error", "Hubo un problema al actualizar los datos.");
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>Fecha de Nacimiento</Text>
      <DatePickerInput
        date={formData.birthDate}
        onChange={(date) => handleChange("birthDate", date)}
      />
      <InputsPrincipales formData={formData} handleChange={handleChange} />
      <View style={styles.Alergiascontainer}>
        {/* Alergias a medicamentos */}
        <AllergyInput
          title="Agregar Alergia a Medicamentos"
          placeholder="Ingrese alergia"
          allergies={formData.medicationAllergies}
          onAddAllergy={(allergy) =>
            handleChange("medicationAllergies", [
              ...formData.medicationAllergies,
              { allergy },
            ])
          }
        />

        {/* Otras alergias */}
        <AllergyInput
          title="Agregar Otras Alergias"
          placeholder="Ingrese otra alergia"
          allergies={formData.otherAllergies}
          onAddAllergy={(allergy) =>
            handleChange("otherAllergies", [
              ...formData.otherAllergies,
              { allergy },
            ])
          }
        />
      </View>
      <View style={styles.Alergiascontainer}>
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
          onChangeMedicalCenter={(value) =>
            handleChange("medicalCenter", value)
          }
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
                  medicalTreatmentUser: [
                    {
                      medication: formData.medication,
                      dosage: formData.dosage,
                    },
                  ],
                },
              ]);
              // Limpiar campos
              handleChange("newDisease", "");
              handleChange("doctorEmail", "");
              handleChange("medicalCenter", "");
              handleChange("medication", "");
              handleChange("dosage", "");
            } else {
              Alert.alert(
                "Error",
                "Por favor, complete todos los campos necesarios."
              );
            }
          }}
          onUpdateChronicDisease={onUpdateChronicDisease} // Aquí se pasa la función
        />
      </View>

      {isDataLoaded ? (
        <View style={styles.submitButton}>
          <Text style={styles.submitButtonText} onPress={handleUpdateInfo}>
            Actualizar Info
          </Text>
        </View>
      ) : (
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
      )}
    </ScrollView>
  );
};

export default RegisterDataForm;
