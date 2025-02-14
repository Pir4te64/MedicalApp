import React, { useEffect, useState } from "react";
import { Text, View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const [token, setToken] = useState(null);

  // Usamos useEffect para cargar el token al montar el componente
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("authToken");
        if (storedToken) {
          setToken(storedToken); // Establece el token en el estado
        } else {
          Alert.alert("Error", "No se ha encontrado un token.");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Hubo un problema al cargar el token.");
      }
    };

    fetchToken(); // Llamamos a la función de carga del token
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Bienvenido a Home</Text>
      {token ? (
        <Text style={{ marginTop: 20, fontSize: 16 }}>Token: {token}</Text>
      ) : (
        <Text style={{ marginTop: 20, fontSize: 16 }}>Cargando token...</Text>
      )}
    </View>
  );
}
