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
        <Text style={styles.profileText}> DNI: {profile.documento}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Ionicons name="person-circle-outline" size={16} color="#ffffff" />
        <Text style={styles.profileText}> Seudónimo: {profile.seudonimo}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Ionicons name="shield-outline" size={16} color="#ffffff" />
        <Text style={styles.profileText}> Tipo de Usuario: {profile.tipoUsuario}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Ionicons name="settings-outline" size={16} color="#ffffff" />
        <Text style={styles.profileText}> Tipo de Cuenta: {profile.tipoCuenta}</Text>
      </View>
    </View>
  );
};

export default PerfilPrincipal;
