import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { API } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Profile } from "@/utils/types";
import { styles } from "./Profile.styles";
import PerfilPrincipal from "./PerfilPrincipal";
import PerfilSecundario from "./PerfilAfiliado";

const ProfileInfo = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Estado para pull-to-refresh
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) throw new Error("No se encontró el token de autenticación");

      const response = await fetch(API.PROFILE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Error al obtener el perfil");

      const data = await response.json();
      if (data.success) {
        setProfile(data.body);
      } else {
        throw new Error(data.message || "Error desconocido");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true); // Muestra el indicador de carga del pull-to-refresh
    await fetchProfile();
    setRefreshing(false); // Oculta el indicador después de cargar
  };

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
    <ScrollView
      style={{ width: "100%" }}
      contentContainerStyle={{ flexGrow: 1 }} // Asegura que se pueda hacer scroll
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.profileContainer}>
        <PerfilPrincipal profile={profile} />
        <PerfilSecundario afiliados={profile.afiliados} />
      </View>
    </ScrollView>
  );
};

export default ProfileInfo;
