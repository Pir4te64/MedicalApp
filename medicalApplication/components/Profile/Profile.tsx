import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "@/utils/api";
import { Afiliado, Profile } from "@/utils/types"; // Importa las interfaces

const ProfileInfo = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18, color: "red" }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {profile ? (
        <View>
          <Text>{`Nombre: ${profile.nombre}`}</Text>
          <Text>{`Documento: ${profile.documento}`}</Text>
          <Text>{`Seudónimo: ${profile.seudonimo}`}</Text>
          <Text>{`Tipo de Usuario: ${profile.tipoUsuario}`}</Text>
          <Text>{`Tipo de Cuenta: ${profile.tipoCuenta}`}</Text>

          {profile.afiliados && profile.afiliados.length > 0 ? (
            <View style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Afiliados:
              </Text>
              {profile.afiliados.map((afiliado, index) => (
                <View
                  key={index}
                  style={{
                    marginVertical: 5,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 5,
                  }}
                >
                  <Text>{`Nombre: ${afiliado.nombre}`}</Text>
                  <Text>{`Documento: ${afiliado.documento}`}</Text>
                  <Text>{`Tipo de Usuario: ${afiliado.tipoUsuario}`}</Text>
                  <Text>{`Tipo de Cuenta: ${afiliado.tipoCuenta}`}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text>No tiene afiliados.</Text>
          )}
        </View>
      ) : (
        <Text>No se pudo obtener el perfil.</Text>
      )}
    </View>
  );
};

export default ProfileInfo;
