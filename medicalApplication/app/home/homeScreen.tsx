import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "react-native-elements";
import HomeComponent from "@/components/Home/Home"; // Asegúrate de importar el componente correspondiente

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
        <Button
          title="Ir a la pantalla 1"
          onPress={() => router.push("/screen1")}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonContainer}
        />
        <Button
          title="Ir a la pantalla 2"
          onPress={() => router.push("/screen2")}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonContainer}
        />
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
  // Sección para los botones, centrados horizontalmente
  buttonsContainer: {
    flex: 0.2, // Ocupa el 20% restante de la pantalla
    flexDirection: "row", // Los botones en fila
    justifyContent: "space-evenly", // Espacio equitativo entre botones
    alignItems: "center",
    padding: 20,
  },
  // Estilos para el botón
  buttonStyle: {
    backgroundColor: "#0066cc",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  // Contenedor individual para cada botón
  buttonContainer: {
    width: "45%", // Asegura que los botones no ocupen toda la pantalla
    marginHorizontal: 5,
  },
});
