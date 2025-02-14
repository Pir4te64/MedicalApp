import React from "react";
import { View, Text, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RegisterForm from "@/components/Register/Register"; // Importamos el formulario de registro

export default function RegisterScreen() {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center", // Centrado verticalmente
        alignItems: "center", // Centrado horizontalmente
        paddingBottom: 20, // Para evitar que el teclado solape el contenido
      }}
      enableOnAndroid={true}
      extraScrollHeight={20}
    >
      {/* Imagen en la parte superior */}
      <Image
        source={require("../assets/images/register.png")}
        style={{
          width: 200,
          height: 200,
          marginBottom: 30,
          marginTop: 30,
          borderRadius: 10,
        }}
      />
      {/* Título */}
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Registrarse
      </Text>
      {/* Componente de formulario de registro */}
      <RegisterForm /> {/* Renderiza el formulario de registro */}
    </KeyboardAwareScrollView>
  );
}
