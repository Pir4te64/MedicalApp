import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./Profile.styles";
import ModalUpdateAPoderado from "@/components/Modal/ModalSettings/ModalUpdateApoderado/ModalUpdateApoderado";
import ModalSelector from "@/components/Modal/ModalSettings/ModalSector/ModalSelector";
import ModalUpdatePassword from "@/components/Modal/ModalSettings/ModalUpdatePassword/ModalUpdatePassword";
import ModalUpdateUser from "@/components/Modal/ModalSettings/ModalUpdateUser/ModalUpdateUser";

interface Afiliado {
  nombre: string;
  documento: string;
  tipoUsuario: string;
  tipoCuenta: string;
  seudonimo: string;
}

interface PerfilSecundarioProps {
  afiliados: Afiliado[];
  reloadProfile: () => void; // Función para recargar el perfil
}

const PerfilSecundario: React.FC<PerfilSecundarioProps> = ({ afiliados, reloadProfile }) => {
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [afiliadoSeleccionado, setAfiliadoSeleccionado] = useState<Afiliado | null>(null);
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string | null>(null);

  const actualizarAfiliado = (afiliado: Afiliado) => {
    setAfiliadoSeleccionado(afiliado);
    setSelectorVisible(true);
  };

  const handleSelectorAccept = async (tipo: string) => {
    setTipoSeleccionado(tipo);
    setSelectorVisible(false);
    await AsyncStorage.setItem("tipoSeleccionado", tipo);
    setModalVisible(true);
  };

  const handlePasswordUpdate = (afiliado: Afiliado) => {
    setAfiliadoSeleccionado(afiliado);
    setPasswordModalVisible(true);
  };

  const handleUserDataUpdate = (afiliado: Afiliado) => {
    setAfiliadoSeleccionado(afiliado);
    setUserModalVisible(true);
  };

  if (!afiliados || afiliados.length === 0) {
    return <Text style={styles.noAfiliados}>No tiene afiliados.</Text>;
  }

  return (
    <View style={styles.afiliadosSection}>
      <Text style={styles.afiliadosTitle}>Afiliados</Text>
      {afiliados.map((afiliado, index) => (
        <View key={index} style={styles.afiliadoItem}>
          {/* Encabezado con el nombre */}
          <View style={styles.afiliadoHeader}>
            <Text style={styles.afiliadoName}>{afiliado.nombre}</Text>
          </View>
          <View style={styles.afiliadoInfo}>
            <Ionicons name="card" size={16} color="#555" />
            <Text style={styles.afiliadoText}> DNI: {afiliado.documento}</Text>
          </View>
          <View style={styles.afiliadoInfo}>
            <Ionicons name="shield-outline" size={16} color="#555" />
            <Text style={styles.afiliadoText}> Tipo de Usuario: {afiliado.tipoUsuario}</Text>
          </View>
          <View style={styles.afiliadoInfo}>
            <Ionicons name="settings-outline" size={16} color="#555" />
            <Text style={styles.afiliadoText}> Tipo de Cuenta: {afiliado.tipoCuenta}</Text>
          </View>

          {/* Sección de iconos */}
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={() => actualizarAfiliado(afiliado)}>
              <Ionicons name="build-outline" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePasswordUpdate(afiliado)}>
              <Ionicons name="key-outline" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleUserDataUpdate(afiliado)}>
              <Ionicons name="person-outline" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Modales */}
      <ModalSelector
        visible={selectorVisible}
        onClose={() => setSelectorVisible(false)}
        onAccept={handleSelectorAccept}
      />
      <ModalUpdateAPoderado
        visible={modalVisible}
        afiliado={afiliadoSeleccionado}
        tipoSeleccionado={tipoSeleccionado}
        onClose={() => setModalVisible(false)}
        reloadProfile={reloadProfile}
      />
      <ModalUpdatePassword
        afiliado={afiliadoSeleccionado}
        visible={passwordModalVisible}
        onClose={() => setPasswordModalVisible(false)}
        reloadProfile={reloadProfile}

      />
      <ModalUpdateUser
        visible={userModalVisible}
        onClose={() => setUserModalVisible(false)}
        reloadProfile={reloadProfile}
        user={afiliadoSeleccionado ? { name: afiliadoSeleccionado.nombre, document: afiliadoSeleccionado.documento } : undefined}
      />
    </View>
  );
};

export default PerfilSecundario;
