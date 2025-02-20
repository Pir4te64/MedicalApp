import React, { useEffect, useState } from "react";
import { Text, ScrollView, View, Alert } from "react-native";
import { styles } from "./InformacionStyles.styles";
import AllergyInput from "./AllergicInput/AllergicInput";
import DatePickerInput from "./DatePicker/DatePicker";
import ChronicDiseaseInput from "./ChronicDiseaseInput/ChronicDiseaseInput";
import { getUserData } from "./Register.fetch";
import { handleSubmit } from "./Register.data";
import { getUpdatedInfo } from "./Register.Update";
import { GuardarInfoActualizada } from "./GuardarInfoActualizada";
import InputsPrincipales from "./InputsPrincipales/InputsPrincipales";
import { useRegisterStore } from "./ChronicDiseaseInput/useRegisterStore";

interface Afiliado {
  id: number;
}

interface RegisterDataFormProps {
  afiliado: Afiliado;
}

const RegisterDataForm: React.FC<RegisterDataFormProps> = ({ afiliado }) => {
  // Extrae el estado y la función setField desde el store
  const {
    birthDate,
    weight,
    height,
    bloodType,
    medicationAllergies,
    otherAllergies,
    chronicDiseases,
    newDisease,
    doctorEmail,
    medicalCenter,
    medication,
    dosage,
    setField,
  } = useRegisterStore();

  // Mantén un estado local para controlar si los datos se cargaron
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Actualiza el estado desde la respuesta de getUserData
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserData(afiliado.id);

        if (response.success && response.body) {
          const {
            birthDate,
            weight,
            height,
            bloodType,
            medicationAllergyUsers,
            otherAllergiesUsers,
            chronicDiseasesUsers,
          } = response.body;

          setField(
            "birthDate",
            new Date(birthDate[0], birthDate[1] - 1, birthDate[2])
          );
          setField("weight", weight || "");
          setField("height", height || "");
          setField("bloodType", bloodType || "");
          setField("medicationAllergies", medicationAllergyUsers || []);
          setField("otherAllergies", otherAllergiesUsers || []);
          setField("chronicDiseases", chronicDiseasesUsers || []);
          setIsDataLoaded(true);
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUserData();
  }, [afiliado.id, setField]);

  // Función para actualizar una enfermedad crónica existente
  const onUpdateChronicDisease = (
    index: number,
    field: string,
    value: string
  ) => {
    // Si necesitas manipular el estado que está en el store,
    // podrías obtener el estado actual y luego actualizarlo
    useRegisterStore.setState((state) => {
      const updatedDiseases = [...state.chronicDiseases];
      const currentDisease = { ...updatedDiseases[index] };

      if (field === "medication" || field === "dosage") {
        currentDisease.medicalTreatmentUser[0] = {
          ...currentDisease.medicalTreatmentUser[0],
          [field]: value,
        };
      } else {
        currentDisease[field] = value;
      }
      updatedDiseases[index] = currentDisease;
      return { chronicDiseases: updatedDiseases };
    });
  };

  const handleUpdateInfo = async () => {
    // Obtenemos el estado completo directamente del store
    const currentState = useRegisterStore.getState();
    const updatedInfo = getUpdatedInfo(afiliado, currentState);

    try {
      await GuardarInfoActualizada(updatedInfo);

      Alert.alert("✅ Éxito", "Los datos se actualizaron correctamente.", [
        { text: "OK", onPress: () => console.log("Alerta cerrada") },
      ]);
    } catch (error) {
      console.error("Error al actualizar la información:", error);
      Alert.alert("Error", "Hubo un problema al actualizar los datos.");
    }
  };
  const isFormComplete = () => {
    return (
      birthDate &&
      weight &&
      height &&
      bloodType &&
      medicationAllergies.length > 0 &&
      otherAllergies.length > 0 &&
      chronicDiseases.length > 0
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>Fecha de Nacimiento</Text>
      <DatePickerInput
        date={birthDate}
        onChange={(date) => setField("birthDate", date)}
      />
      <InputsPrincipales
        formData={useRegisterStore.getState()}
        handleChange={setField}
      />
      <View style={styles.Alergiascontainer}>
        {/* Alergias a medicamentos */}
        <AllergyInput
          title="Agregar Alergia a Medicamentos"
          placeholder="Ej 'Penicilina'"
          allergies={medicationAllergies}
          availableAllergies={["Penicilina", "Ibuprofeno", "Sulfa"]} // Lista de alergias predefinidas
          onAddAllergy={(allergy) =>
            setField("medicationAllergies", [
              ...medicationAllergies,
              { allergy },
            ])
          }
        />

        {/* Otras alergias */}
        <AllergyInput
          title="Agregar Otras Alergias"
          placeholder="Otras alergias"
          allergies={otherAllergies}
          availableAllergies={["Polen", "Ácaros", "Látex"]}
          onAddAllergy={(allergy) =>
            setField("otherAllergies", [...otherAllergies, { allergy }])
          }
        />
      </View>

      <View style={styles.Alergiascontainer}>
        {/* Enfermedades Crónicas */}
        <ChronicDiseaseInput
          newDisease={newDisease}
          doctorEmail={doctorEmail}
          medicalCenter={medicalCenter}
          medication={medication}
          dosage={dosage}
          chronicDiseases={chronicDiseases}
          onChangeDisease={(value) => setField("newDisease", value)}
          onChangeDoctorEmail={(value) => setField("doctorEmail", value)}
          onChangeMedicalCenter={(value) => setField("medicalCenter", value)}
          onChangeMedication={(value) => setField("medication", value)}
          onChangeDosage={(value) => setField("dosage", value)}
          onAddChronicDisease={() => {
            if (
              newDisease &&
              doctorEmail &&
              medicalCenter &&
              medication &&
              dosage
            ) {
              setField("chronicDiseases", [
                ...chronicDiseases,
                {
                  disease: newDisease,
                  doctorEmail,
                  medicalCenter,
                  medicalTreatmentUser: [{ medication, dosage }],
                },
              ]);
              // Limpiar campos
              setField("newDisease", "");
              setField("doctorEmail", "");
              setField("medicalCenter", "");
              setField("medication", "");
              setField("dosage", "");
            } else {
              Alert.alert(
                "⚠️ Campos incompletos",
                "Por favor, completa todos los campos necesarios antes de continuar.",
                [{ text: "Aceptar" }]
              );
            }
          }}
          onUpdateChronicDisease={onUpdateChronicDisease}
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
            style={[
              styles.submitButtonText,
              !isFormComplete() && { opacity: 0.5 }, // Cambia la opacidad si está deshabilitado
            ]}
            onPress={() => {
              if (isFormComplete()) {
                handleSubmit(
                  afiliado,
                  birthDate,
                  weight,
                  height,
                  bloodType,
                  medicationAllergies,
                  otherAllergies,
                  chronicDiseases
                );
              }
            }}
            disabled={!isFormComplete()}
          >
            Registrar
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default RegisterDataForm;
