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
      style={styles.gradientContainer}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <Animated.Image
          source={require("../assets/images/login2.png")}
          style={[styles.image, { transform: [{ scale: imageScale }] }]}
        />
        <Text style={styles.title}>Iniciar Sesión</Text>
        <LoginComponent />
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center", // Centrado vertical
    alignItems: "center", // Centrado horizontal
    paddingBottom: 20, // Evitar solapamiento con el teclado
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 30,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});
