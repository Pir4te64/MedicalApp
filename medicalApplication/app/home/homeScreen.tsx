import React, { useEffect } from "react";
import { Text, View, BackHandler, Alert } from "react-native";
import LottieView from "lottie-react-native";

export default function HomeScreen() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Salir", "¿Quieres cerrar la app?", [
        { text: "Cancelar", style: "cancel" },
        { text: "Sí", onPress: () => BackHandler.exitApp() },
      ]);
      return true; // Evita que vuelva a login
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Limpia el listener al salir
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Animación de la mano saludando */}
      <LottieView
        source={require("@/assets/animations/hello.json")} // Asegúrate de poner la ruta correcta de tu archivo JSON
        autoPlay
        loop
        style={{ width: 200, height: 200 }} // Ajusta el tamaño de la animación
      />
      <Text style={{ fontSize: 24, marginTop: 20 }}>Home</Text>
    </View>
  );
}
