import { Text, View, TextInput, Button, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (email === "superusuario@gmail.com" && password === "123456") {
            router.push("/home");  // Usamos "/home" en lugar de "/home/home"
        } else {
            Alert.alert("Error", "Credenciales incorrectas");
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Iniciar Sesión</Text>
            <TextInput
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                style={{ width: "100%", padding: 10, borderWidth: 1, marginBottom: 10 }}
            />
            <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ width: "100%", padding: 10, borderWidth: 1, marginBottom: 10 }}
            />
            <Button title="Ingresar" onPress={handleLogin} />
        </View>
    );
}
