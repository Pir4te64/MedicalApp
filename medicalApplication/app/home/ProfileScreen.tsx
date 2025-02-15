import React, { useEffect, useState } from "react";
import { View, ScrollView, BackHandler } from "react-native";
import ProfileInfo from "@/components/Profile/Profile"; // Asegúrate de importar el componente correctamente
import CustomAlert from "@/components/Modal/Modal"; // Asegúrate de importar CustomAlert correctamente

export default function ProfileScreen() {
  const [alertVisible, setAlertVisible] = useState(false);

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
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <ProfileInfo />
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
