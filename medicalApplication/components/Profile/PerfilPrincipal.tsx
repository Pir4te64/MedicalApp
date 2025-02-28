import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./Profile.styles";
import ModalUpdateUser from "../Modal/ModalSettings/ModalUpdateUser/ModalUpdateUser";
import ModalUpdatePassword from "../Modal/ModalSettings/ModalUpdatePassword/ModalUpdatePassword";
import { useFocusEffect, useRouter } from "expo-router";

interface PerfilPrincipalProps {
  profile: {
    nombre: string;
    documento: string;
    seudonimo: string;
    tipoUsuario: string;
    tipoCuenta: string;
  };
  reloadProfile: () => void; // Para recargar el perfil después de actualizar
}

const PerfilPrincipal: React.FC<PerfilPrincipalProps> = ({
  profile,
  reloadProfile,
}) => {
  const [nombre, setNombre] = useState(profile.nombre);
  const [isNameModalVisible, setIsNameModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);

  const router = useRouter(); // Hook de navegación

  useEffect(() => {
    setNombre(profile.nombre);
  }, [profile]);

  // Función para navegar a la pantalla de información
  const navigateToInformation = useCallback(() => {
    router.push(
      `/home/profile/informacion?afiliado=${encodeURIComponent(
        JSON.stringify(profile)
      )}`
    );
  }, [router, profile]);
  return (
    <View style={styles.profileDetails}>
      <View style={styles.profileInfo}>
        <Ionicons name="person-outline" size={16} color="#ffffff" />
        <Text style={styles.profileText}>{nombre}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Ionicons name="card" size={16} color="#ffffff" />
        <Text style={styles.profileText}>{profile.documento}</Text>
      </View>

      {/* Botón para actualizar nombre */}
      <TouchableOpacity
        style={styles.updateButton}
        onPress={() => setIsNameModalVisible(true)}
      >
        <Text style={styles.buttonText}>Actualizar Nombre</Text>
      </TouchableOpacity>

      {/* Botón para actualizar contraseña */}
      <TouchableOpacity
        style={styles.updateButton}
        onPress={() => setIsPasswordModalVisible(true)}
      >
        <Text style={styles.buttonText}>Actualizar Contraseña</Text>
      </TouchableOpacity>

      {/* Nuevo Botón de Información (no hace nada) */}
      <TouchableOpacity
        style={styles.updateButton} // Asegúrate de definir este estilo en tu archivo de estilos
        onPress={navigateToInformation}
      >
        <Text style={styles.buttonText}>Información</Text>
      </TouchableOpacity>
      {/* Modal para actualizar nombre */}
      <ModalUpdateUser
        visible={isNameModalVisible}
        onClose={() => setIsNameModalVisible(false)}
        user={{ name: nombre, document: profile.documento }}
        reloadProfile={() => {
          setIsNameModalVisible(false);
          reloadProfile();
        }}
      />

      {/* Modal para actualizar contraseña */}
      <ModalUpdatePassword
        visible={isPasswordModalVisible}
        onClose={() => setIsPasswordModalVisible(false)}
        afiliado={profile}
        reloadProfile={() => {
          setIsPasswordModalVisible(false);
          reloadProfile();
        }}
      />
    </View>
  );
};

export default PerfilPrincipal;
