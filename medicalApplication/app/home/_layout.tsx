import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HomeLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="homeScreen"
        options={{
          title: "Inicio",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: "Perfil",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />

      {/* Nuevo screen para registrar dependientes */}
      <Tabs.Screen
        name="RegistrarDependientes"
        options={{
          title: "Dependientes",
          headerShown: false,

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-add" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="SettingScreen"
        options={{
          title: "Configuración",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
