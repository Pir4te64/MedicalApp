import React, { useEffect } from "react";
import { View, Text, BackHandler, Alert, ScrollView } from "react-native";
import ProfileInfo from "@/components/Profile/Profile"; // Asegúrate de importar el componente correctamente

export default function ProfileScreen() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Salir", "¿Quieres cerrar la app?", [
        { text: "Cancelar", style: "cancel" },
        { text: "Sí", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Perfil</Text>
      <ProfileInfo />
    </ScrollView>
  );
}
