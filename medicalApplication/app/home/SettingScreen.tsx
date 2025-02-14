import React from "react";
import { View, Text } from "react-native";
import SettingsComponent from "@/components/Configs/Config"; // Importamos el nuevo componente

export default function SettingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Configuración</Text>
      <SettingsComponent /> {/* Usamos el nuevo componente */}
    </View>
  );
}
