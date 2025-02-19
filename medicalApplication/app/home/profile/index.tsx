import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  BackHandler,
  StyleSheet,
  Button,
} from "react-native";
import { useRouter } from "expo-router";
import ProfileInfo from "@/components/Profile/Profile"; // Asegúrate de importar el componente correctamente
import CustomAlert from "@/components/Modal/Modal"; // Asegúrate de importar CustomAlert correctamente

export default function ProfileScreen() {
  const [alertVisible, setAlertVisible] = useState(false);
  const router = useRouter();

  // Función para navegar a la pantalla de información
  const navigateToInformation = () => {
    router.push("/home/profile/informacion");
  };

  // Mostrar el CustomAlert
  const showAlert = () => {
    setAlertVisible(true);
  };

  // Cerrar el CustomAlert
  const hideAlert = () => {
    setAlertVisible(false);
  };

  useEffect(() => {
    const backAction = () => {
      showAlert(); // Mostrar el alert personalizado cuando se presione el botón de atrás
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        contentInsetAdjustmentBehavior="automatic" // Ajuste para iOS
        keyboardShouldPersistTaps="handled"
      >
        <ProfileInfo />

        {/* Botón para navegar a la pantalla de información */}
      </ScrollView>

      {/* CustomAlert con los parámetros adecuados */}
      <CustomAlert
        visible={alertVisible}
        onClose={hideAlert}
        title="Salir"
        message="¿Quieres cerrar la app?"
        type="error" // Tipo "error" para botón rojo
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Asignamos flex: 1 para que el ScrollView ocupe toda la pantalla
  scrollView: {
    flex: 1,
  },
  // Solo aplicamos padding; eliminamos el centrado vertical/horizontal para permitir el scroll natural
  scrollContent: {
    padding: 20,
  },
});
