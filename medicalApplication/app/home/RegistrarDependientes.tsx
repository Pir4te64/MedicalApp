import React from "react";
import { View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RegisterDependientes from "@/components/Registrardependientes/RegistrarDep";
import LottieView from "lottie-react-native";

export default function RegistrarDependientesScreen() {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
      enableOnAndroid={true}
      extraScrollHeight={20}
    >
      {/* Animación con Lottie */}
      <LottieView
        source={require("@/assets/animations/registro.json")} // Ruta de la animación
        autoPlay
        loop
        style={{ width: 200, height: 200, marginBottom: 10 }}
      />

      <RegisterDependientes />
    </KeyboardAwareScrollView>
  );
}
