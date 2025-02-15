import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Asegúrate de tener instalado expo-linear-gradient
import SettingsComponent from "@/components/Configs/Config"; // Importamos el nuevo componente

export default function SettingScreen() {
  return (
    <View style={{ flex: 1 }}>
      {/* Header con gradiente */}
      <LinearGradient
        colors={["#2470ec", "#005bb5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        {/* Aquí ya no hay texto */}
      </LinearGradient>

      {/* Contenido del componente Settings */}
      <SettingsComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 500, // Ajustado a 500 de altura
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 40, // Para no tapar el área del status bar
    borderBottomLeftRadius: 30, // Borde inferior izquierdo redondeado
    borderBottomRightRadius: 30, // Borde inferior derecho redondeado
  },
});
