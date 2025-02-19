import { API } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
          medicalTreatmentUser: disease.medicalTreatmentUser || []
        }))
      : [];

    const formData = {
      userId: afiliado?.id || 0,
      birthDate: formattedDate,
      weight,
      height,
      bloodType,
      medicationAllergyUsers: Array.isArray(medicationAllergies) ? medicationAllergies : [],
      otherAllergiesUsers: Array.isArray(otherAllergies) ? otherAllergies : [],
      chronicDiseasesUsersRequest: formattedChronicDiseases,
    };

    console.log("Enviando datos del formulario:", JSON.stringify(formData, null, 2));


    const response = await fetch(API.DATA_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status} - ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log("Respuesta de la API:", JSON.stringify(responseData, null, 2));
  } catch (error) {
    console.error("Error al enviar los datos:", error.message);
  }
};
