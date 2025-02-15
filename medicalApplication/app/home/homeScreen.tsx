import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "react-native-elements";
import HomeComponent from "@/components/Home/Home"; // Asegúrate de importar el nuevo componente

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      {/* Llamamos al componente HomeComponent que maneja la lógica */}
      <HomeComponent />

      {/* Botones debajo de la vista azul, fuera del header */}
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
  buttonsContainer: {
    flexDirection: "row", // Los botones estarán en fila
    justifyContent: "space-evenly", // Espacio igual entre los botones
    alignItems: "center",
    padding: 20,
    marginTop: 20, // Espacio entre el header y los botones
  },
  buttonStyle: {
    backgroundColor: "#0066cc",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: "45%", // Asegura que los botones no ocupen toda la pantalla
    marginHorizontal: 5,
  },
});
