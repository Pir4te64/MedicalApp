import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RegisterForm from "@/components/Register/Register"; // Formulario de registro
import { LinearGradient } from "expo-linear-gradient";

export default function RegisterScreen() {
  const imageScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animación sutil para la imagen al montar el componente
    Animated.spring(imageScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <LinearGradient
      colors={["#f9f9f9", "#e0e0e0"]}
      style={styles.container}
    >
      {/* Sección superior con la imagen y el título */}
      <View style={styles.topContainer}>
        <Animated.Image
          source={require("../assets/images/register.png")}
          style={[styles.image, { transform: [{ scale: imageScale }] }]}
        />
        <Text style={styles.title}>Registrarse</Text>
      </View>

      {/* Sección inferior con el formulario de registro (scrollable) */}
      <KeyboardAwareScrollView
        style={styles.bottomContainer}
        contentContainerStyle={styles.scrollContentContainer}
        enableOnAndroid
        extraScrollHeight={20}
      >
        <RegisterForm />
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // Contenedor principal con el gradiente de fondo
  container: {
    flex: 1,
  },
  // Sección superior (40% de la pantalla, ajusta según tu preferencia)
  topContainer: {
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  // Sección inferior (60% de la pantalla)
  bottomContainer: {
    flex: 0.6,
  },
  // Estilos para el contenido dentro del scroll (centrado)
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20, // evita solapamiento con el teclado
  },
  // Estilo de la imagen
  image: {
    width: 150,
    height: 150,
    marginVertical: 30,
    borderRadius: 10,
  },
  // Título
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
});
