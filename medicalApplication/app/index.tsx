import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  const router = useRouter();
  const imageScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animación sutil en la imagen al montar el componente
    Animated.spring(imageScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Cabecera con gradiente */}
      <LinearGradient
        colors={["#2470ec", "#005bb5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Animated.Image
          source={require("../assets/images/medico.png")}
          style={[styles.image, { transform: [{ scale: imageScale }] }]}
        />
        <Text style={styles.welcomeText}>¡Bienvenido!</Text>
      </LinearGradient>

      {/* Contenedor para los botones en fila */}
      <View style={styles.buttonsRow}>
        <Button
          title="Iniciar Sesión"
          onPress={() => router.push("/login")}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.buttonTitle}
          icon={
            <Icon
              name="login"
              type="material-community"
              color="white"
              size={24}
              containerStyle={{ marginRight: 8 }}
            />
          }
        />
        <Button
          title="Registrarse"
          onPress={() => router.push("/register")}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.buttonTitle}
          icon={
            <Icon
              name="account-plus"
              type="material-community"
              color="white"
              size={24}
              containerStyle={{ marginRight: 8 }}
            />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    width: "100%",
    height: 550,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 30,
    borderRadius: 10,
  },
  welcomeText: {
    fontSize: 50,
    fontWeight: "600",
    color: "white",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20, // Se ajusta para aprovechar el espacio blanco sobrante
    paddingHorizontal: 20,
  },
  buttonStyle: {
    backgroundColor: "#0066cc",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: "45%",
    marginHorizontal: 5,
  },
  buttonTitle: {
    fontSize: 16,
    textAlign: "center",
  },
});
