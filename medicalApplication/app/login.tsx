import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoginComponent from "@/components/Login/Login";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen() {
  const imageScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
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
      {/* Sección superior con imagen y título */}


      {/* Sección inferior con el formulario (scrollable) */}
      <KeyboardAwareScrollView
        style={styles.bottomContainer}
        contentContainerStyle={styles.scrollContentContainer}
        enableOnAndroid
        extraScrollHeight={20}
      >
        <View style={styles.topContainer}>
          <Animated.Image
            source={require("../assets/images/login2.png")}
            style={[styles.image, { transform: [{ scale: imageScale }] }]}
          />
          <Text style={styles.title}>Iniciar Sesión</Text>
        </View>
        <LoginComponent />
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // Ocupa toda la pantalla y aplica el gradiente de fondo
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  // Parte superior con imagen y título
  topContainer: {
    flex: 1,                  // 40% de la pantalla (ajusta a tu gusto)
    alignItems: "center",
    justifyContent: "center",
  },
  // Parte inferior donde va el formulario (scrollable)
  bottomContainer: {
    flex: 0.6,                  // 60% de la pantalla
  },
  // Contenedor interno para centrar el contenido dentro del scroll
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  // Estilo de la imagen
  image: {
    width: 200,
    height: 200,
    marginVertical: 30,
    borderRadius: 10,
  },
  // Título
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});
