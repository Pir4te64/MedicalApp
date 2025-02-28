import { API } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const postRequest = async (formData, queryParams) => {
  try {
    // Obtener el token desde AsyncStorage
    const token = await AsyncStorage.getItem("authToken");

    // Si no hay token, puedes manejarlo como prefieras (por ejemplo, redirigir al login)
    if (!token) {
      throw new Error("No se encontró el token de autenticación.");
    }

    // Crear la URL con los parámetros de consulta
    const url = `${API.CHATGPT}?${queryParams}`;

    // Realizar la solicitud POST con FormData
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // Usamos formData como cuerpo de la solicitud
    });

    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      console.log("response", response);
    }

    // Obtener la respuesta en formato JSON
    const responseData = await response.json();

    return responseData;
  } catch (error) {
    throw error;
  }
};

export default postRequest;
