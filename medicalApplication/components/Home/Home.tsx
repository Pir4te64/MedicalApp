import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Animated,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "@/utils/api";
import CustomAlert from "@/components/Modal/Modal"; // Asegúrate de importar tu CustomAlert
import { LinearGradient } from "expo-linear-gradient"; // Importa el gradiente

const HomeComponent = () => {
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "error">("success");

  const imageScale = useRef(new Animated.Value(0.8)).current;

  // Lógica para obtener el perfil desde la API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          throw new Error("No se encontró el token de autenticación");
        }

        const response = await fetch(`${API.PROFILE}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener el perfil");
        }

        const data = await response.json();

        if (data.success) {
          setProfile(data.body);
        } else {
          throw new Error(data.message || "Error desconocido");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    // Animación sutil en la imagen al montar el componente
    Animated.spring(imageScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0066cc" />;
  }

  return (
    <View style={styles.container}>
      {/* Cabecera con gradiente */}
      <LinearGradient
        colors={["#2470ec", "#005bb5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header} // Estilo del gradiente solo aquí
      >
        <LottieView
          source={require("../../assets/animations/hello.json")}
          autoPlay
          loop
          style={styles.animation}
        />
        <Text style={styles.welcomeText}>
          ¡Hola, {profile?.nombre || "Usuario"}!
        </Text>
      </LinearGradient>

      {/* Custom Alert */}
      <CustomAlert
        visible={modalVisible}
        title="Salir"
        message={modalMessage}
        type={modalType}
        onClose={() => setModalVisible(false)} // Cerramos el modal cuando se presiona "Cerrar"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    width: "100%",
    height: 500, // Mantener la altura anterior
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "relative", // Hacemos que los elementos dentro del header sean posicionados relativos
  },
  animation: {
    width: 50,
    height: 50,
    position: "absolute",
    top: 20, // Ubica la mano en la parte superior
    left: 20, // Ubica la mano en el lado izquierdo
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    position: "absolute",
    top: 30, // Ajustamos la posición para que quede en la parte superior
    left: 80, // Espaciamos el texto para que no esté pegado a la animación
  },
});

export default HomeComponent;
