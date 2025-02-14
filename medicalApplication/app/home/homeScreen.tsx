import { useEffect } from "react";
import { Text, View, BackHandler, Alert } from "react-native";

export default function HomeScreen() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Salir", "¿Quieres cerrar la app?", [
        { text: "Cancelar", style: "cancel" },
        { text: "Sí", onPress: () => BackHandler.exitApp() },
      ]);
      return true; // Evita que vuelva a login
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Limpia el listener al salir
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>Bienvenido a Home</Text>
    </View>
  );
}
