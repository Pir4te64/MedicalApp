import React, { useContext } from "react";
import { Button } from "react-native";
import { AuthContext } from "@/utils/AuthProvider"; // Importa el contexto
import { useRouter } from "expo-router";

const SettingsComponent = () => {
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    logout(); // Llamamos a la función de logout del contexto
    router.replace("/"); // Redirigimos al index
  };

  return <Button title="Cerrar Sesión" onPress={handleLogout} />;
};

export default SettingsComponent;
