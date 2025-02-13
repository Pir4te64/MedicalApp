import { Text, View, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function RegisterScreen() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Registrarse</Text>
            <TextInput
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
                style={{ width: "100%", padding: 10, borderWidth: 1, marginBottom: 10 }}
            />
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
            <Button title="Registrarse" onPress={() => console.log("Registro")} />
        </View>
    );
}
