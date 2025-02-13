import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>¡Bienvenido!</Text>
      <Button title="Iniciar Sesión" onPress={() => router.push("/login")} />
      <View style={{ height: 10 }} />
      <Button title="Registrarse" onPress={() => router.push("/register")} />
      <View style={{ height: 10 }} />
    </View>
  );
}
