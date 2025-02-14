import React from "react";
import { View, Text, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoginComponent from "@/components/Login/Login";

export default function LoginScreen() {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center", // Mantener el contenido centrado verticalmente
        alignItems: "center", // Centrado horizontalmente
        paddingBottom: 20, // Para evitar el solapamiento con el teclado
      }}
      enableOnAndroid={true}
      extraScrollHeight={20}
    >
      <Image
        source={require("../assets/images/login2.png")}
        style={{
          width: 200,
          height: 200,
          marginBottom: 30,
          marginTop: 30,
          borderRadius: 10,
        }}
      />
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Iniciar Sesión
      </Text>
      <LoginComponent /> {/* LoginComponent maneja todo el proceso de login */}
    </KeyboardAwareScrollView>
  );
}
