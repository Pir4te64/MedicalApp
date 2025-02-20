import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet, Dimensions } from "react-native";
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
      {/* Sección de cabecera con gradiente */}
      <LinearGradient
        colors={["#2470ec", "#005bb5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        {/* Contenedor para centrar los elementos */}
        <View style={styles.headerContent}>
          <Animated.Image
            source={require("../assets/images/medico.png")}
            style={[styles.image, { transform: [{ scale: imageScale }] }]}
          />
          <Text style={styles.welcomeText}>¡Bienvenido a TKareBox!</Text>
        </View>
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
  // El contenedor principal ocupa toda la pantalla
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  // El gradiente ocupará un 45% de la pantalla (puedes ajustar el número según prefieras)
  header: {
    flex: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden", // para que el borde redondeado se aplique correctamente
  },
  // Aquí centramos vertical y horizontalmente la imagen y el texto
  headerContent: {
    flex: 1,
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
    fontSize: 30,
    fontWeight: "600",
    color: "white",
  },
  // Contenedor de los botones en la parte de abajo
  buttonsRow: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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
