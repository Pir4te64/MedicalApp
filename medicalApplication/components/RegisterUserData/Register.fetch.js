import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "@/utils/api"; // Asegúrate de que la ruta sea la correcta

export const getUserData = async (userId: number) => {
  try {
    const authToken = await AsyncStorage.getItem("authToken");

    if (!authToken) {
      throw new Error("No se encontró el token de autenticación");
    }

    const response = await fetch(`${API.DATA_REGISTER_GET}${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error en la petición: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    return data; // Devuelve los datos obtenidos
  } catch (error) {
    console.error("Error obteniendo datos del usuario:", error.message);
    throw error; // Re-lanza el error para manejarlo en el componente
  }
};
