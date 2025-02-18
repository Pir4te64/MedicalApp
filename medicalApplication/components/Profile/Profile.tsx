import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./Profile.styles";
import { API } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Profile } from "@/utils/types";
import { useFocusEffect } from "@react-navigation/native"; // Importamos el hook
import PerfilPrincipal from "./PerfilPrincipal";
import PerfilSecundario from "./PerfilAfiliado";

const ProfileInfo = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener el perfil
  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
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

  // Usamos useFocusEffect para hacer un re-fetching cada vez que la pantalla gane foco
  useFocusEffect(
    React.useCallback(() => {
      fetchProfile();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se pudo cargar el perfil</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ width: "100%" }}>
      <View style={styles.profileContainer}>
      <PerfilPrincipal profile={profile} />

      <PerfilSecundario afiliados={profile.afiliados} />
      </View>
    </ScrollView>
  );
};

export default ProfileInfo;
