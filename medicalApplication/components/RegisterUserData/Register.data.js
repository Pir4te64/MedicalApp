import { API } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const handleSubmit = async (
  afiliado,
  birthDate,
  weight,
  height,
  bloodType,
  medicationAllergies,
  otherAllergies,
  chronicDiseases
) => {
  try {
    const authToken = await AsyncStorage.getItem("authToken");
    if (!authToken) {
      throw new Error("No se encontró el token de autenticación");
    }

    const dateObj = birthDate instanceof Date ? birthDate : new Date(birthDate);

    // Formatear la fecha a YYYY-MM-DD
    const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`;

    const formattedChronicDiseases = Array.isArray(chronicDiseases)
      ? chronicDiseases.map((disease) => ({
          ...disease,
          medicalTreatmentUser: disease.medicalTreatmentUser || [],
        }))
      : [];

    const formData = {
      userId: afiliado?.id || 0,
      birthDate: formattedDate, // Asegúrate de usar formattedDate aquí
      weight,
      height,
      bloodType,
      medicationAllergyUsers: Array.isArray(medicationAllergies)
        ? medicationAllergies
        : [],
      otherAllergiesUsers: Array.isArray(otherAllergies) ? otherAllergies : [],
      chronicDiseasesUsers: formattedChronicDiseases,
    };
    console.log("Datos a enviar:", JSON.stringify(formData, null, 2)); 

    const response = await fetch(API.DATA_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      
      throw new Error(
        `Error en la petición: ${response.status} - ${response.statusText}`
      );
    }

    const responseData = await response.json();
    console.log("Datos del usuario:", JSON.stringify(responseData, null, 2));

    Alert.alert("✅ Éxito", "Los datos se enviaron correctamente.", [
      { text: "Aceptar", onPress: () => console.log("Alerta cerrada") },
    ]);
    
    return responseData;
  } catch (error) {
    // Mostrar alerta de error
    Alert.alert(
      "Error",
      error.message || "Ocurrió un error al enviar los datos."
    );
  }
};
