import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false, title: "Inicio" }} />
      <Stack.Screen name="login" options={{ headerShown: true, title: "Iniciar Sesión" }} />
      <Stack.Screen name="register" options={{ headerShown: true, title: "Registro" }} />
      <Stack.Screen
        name="home"
        options={{ headerShown: false }}  // Ocultamos la barra superior en la pantalla home
      />
    </Stack>
  );
}
