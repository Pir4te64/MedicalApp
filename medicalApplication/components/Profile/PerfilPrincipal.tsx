import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./Profile.styles"; // Asegúrate de que los estilos estén definidos en este archivo

// Define la interfaz de las props si usas TypeScript (opcional)
interface PerfilPrincipalProps {
  profile: {
    nombre: string;
    documento: string;
    seudonimo: string;
    tipoUsuario: string;
    tipoCuenta: string;
  };
}

const PerfilPrincipal: React.FC<PerfilPrincipalProps> = ({ profile }) => {
  return (
    <View style={styles.profileDetails}>
      <View style={styles.profileInfo}>
        <Ionicons name="person-outline" size={16} color="#ffffff" />
        <Text style={styles.profileText}> {profile.nombre}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Ionicons name="card" size={16} color="#ffffff" />
        <Text style={styles.profileText}> {profile.documento}</Text>
      </View>
    </View>
  );
};

export default PerfilPrincipal;
