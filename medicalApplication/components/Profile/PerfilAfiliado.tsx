// components/PerfilSecundario.tsx
import React, { useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "./Profile.styles";
import ModalUpdateAPoderado from "@/components/Modal/ModalSettings/ModalUpdateApoderado/ModalUpdateApoderado";
import ModalSelector from "@/components/Modal/ModalSettings/ModalSector/ModalSelector";
import ModalUpdatePassword from "@/components/Modal/ModalSettings/ModalUpdatePassword/ModalUpdatePassword";
import ModalUpdateUser from "@/components/Modal/ModalSettings/ModalUpdateUser/ModalUpdateUser";
import { Afiliado, useAfiliadosStore } from "./afiliadosStore";

interface PerfilSecundarioProps {
  afiliados: Afiliado[];
  reloadProfile: () => void;
}

const PerfilSecundario: React.FC<PerfilSecundarioProps> = ({
  afiliados,
  reloadProfile,
}) => {
  const router = useRouter();

  // Extraemos los estados y acciones del store
  const {
    selectorVisible,
    modalVisible,
    passwordModalVisible,
    userModalVisible,
    afiliadoSeleccionado,
    tipoSeleccionado,
    abrirSelector,
    aceptarSelector,
    cerrarSelector,
    abrirModalPassword,
    abrirModalUser,
    cerrarModalPassword,
    cerrarModalUser,
    resetearEstados,
  } = useAfiliadosStore();

  const actualizarAfiliado = useCallback(
    (afiliado: Afiliado) => {
      abrirSelector(afiliado);
    },
    [abrirSelector]
  );

  const handleSelectorAccept = useCallback(
    async (tipo: string) => {
      await aceptarSelector(tipo);
    },
    [aceptarSelector]
  );

  const handlePasswordUpdate = useCallback(
    (afiliado: Afiliado) => {
      abrirModalPassword(afiliado);
    },
    [abrirModalPassword]
  );

  const handleUserDataUpdate = useCallback(
    (afiliado: Afiliado) => {
      abrirModalUser(afiliado);
    },
    [abrirModalUser]
  );

  const navigateToDetail = useCallback(
    (afiliado: Afiliado) => {
      router.push(
        `/home/profile/detalle?afiliado=${encodeURIComponent(
          JSON.stringify(afiliado)
        )}`
      );
    },
    [router]
  );

  const navigateToInformation = useCallback(
    (afiliado: Afiliado) => {
      router.push(
        `/home/profile/informacion?afiliado=${encodeURIComponent(
          JSON.stringify(afiliado)
        )}`
      );
    },
    [router]
  );

  if (!afiliados || afiliados.length === 0) {
    return <Text style={styles.noAfiliados}>No tiene afiliados.</Text>;
  }

  return (
    <View style={styles.afiliadosSection}>
      <Text style={styles.afiliadosTitle}>Afiliados</Text>
      // ...
      {afiliados.map((afiliado, index) => (
        <View key={index} style={styles.afiliadoItem}>
          <View style={styles.afiliadoHeader}>
            <Text style={styles.afiliadoName}>{afiliado.nombre}</Text>
          </View>
          <View style={styles.afiliadoInfo}>
            <Ionicons name="card" size={16} color="#555" />
            <Text style={styles.afiliadoText}> DNI: {afiliado.documento}</Text>
          </View>
          <View style={styles.afiliadoInfo}>
            <Ionicons name="shield-outline" size={16} color="#555" />
            <Text style={styles.afiliadoText}>
              {" "}
              Tipo de Usuario: {afiliado.tipoUsuario}
            </Text>
          </View>
          <View style={styles.iconsContainer}>
            {/* Si el afiliado no es de tipo D, mostramos el botón de actualizarAfiliado */}
            {afiliado.tipoUsuario !== "D" && (
              <TouchableOpacity onPress={() => actualizarAfiliado(afiliado)}>
                <Ionicons name="build-outline" size={30} color="white" />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => handlePasswordUpdate(afiliado)}>
              <Ionicons name="key-outline" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleUserDataUpdate(afiliado)}>
              <Ionicons name="person-outline" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToInformation(afiliado)}>
              <Ionicons name="clipboard-outline" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToDetail(afiliado)}>
              <Ionicons name="eye-outline" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
      {/* Modales */}
      <ModalSelector
        visible={selectorVisible}
        onClose={cerrarSelector}
        onAccept={handleSelectorAccept}
      />
      <ModalUpdateAPoderado
        visible={modalVisible}
        afiliado={afiliadoSeleccionado}
        tipoSeleccionado={tipoSeleccionado}
        onClose={() => resetearEstados()}
        reloadProfile={reloadProfile}
      />
      <ModalUpdatePassword
        afiliado={afiliadoSeleccionado}
        visible={passwordModalVisible}
        onClose={cerrarModalPassword}
        reloadProfile={reloadProfile}
      />
      <ModalUpdateUser
        visible={userModalVisible}
        onClose={cerrarModalUser}
        reloadProfile={reloadProfile}
        user={
          afiliadoSeleccionado
            ? {
                name: afiliadoSeleccionado.nombre,
                document: afiliadoSeleccionado.documento,
              }
            : undefined
        }
      />
    </View>
  );
};

export default PerfilSecundario;
