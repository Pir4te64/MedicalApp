import React from "react";
import HomeComponent from "@/components/Home/Home"; // Asegúrate de importar el componente correspondiente
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Importa los íconos de Ionicons
export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Sección principal: HomeComponent (por ejemplo, la vista azul) */}
      <View style={styles.content}>
        <HomeComponent />
      </View>

      {/* Sección de botones debajo */}
      <View style={styles.buttonsContainer}>
        <View style={styles.miniContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/home/RegistrarDependientes")}
          >
            <Ionicons name="person-add" size={30} color="#005bb5" />
            <Text style={styles.buttonText}>Registro</Text>
          </TouchableOpacity>

          {/* Botón para Profile */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/home/profile")}
          >
            <Ionicons name="person" size={30} color="#005bb5" />
            <Text style={styles.buttonText}>Perfil</Text>
          </TouchableOpacity>

          {/* Botón para Settings */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/home/SettingScreen")}
          >
            <Ionicons name="settings" size={30} color="#005bb5" />
            <Text style={styles.buttonText}>Ajustes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Contenedor principal que ocupa toda la pantalla
  container: {
    flex: 1,
  },
  // Sección para el contenido principal (HomeComponent)
  content: {
    flex: 0.8, // Ocupa el 80% de la pantalla; ajusta según sea necesario
  },
  miniContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  // Sección para los botones, centrados horizontalmente
  buttonsContainer: {
    flex: 0.2, // Ocupa el 20% restante de la pantalla
    flexDirection: "row", // Los botones en fila
    justifyContent: "space-evenly", // Espacio equitativo entre botones
    alignItems: "center",
    padding: 5,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    width: 100, // Definir un tamaño fijo para los botones
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 12,
    color: "#005bb5", // Texto blanco para resaltar sobre el fondo azul
    marginTop: 5,
    textAlign: "center",
  },
});
