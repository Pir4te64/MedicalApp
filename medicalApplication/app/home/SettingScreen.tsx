import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router'; // Para navegar entre pantallas

export default function SettingScreen() {
    const router = useRouter(); // Accede al router para realizar la navegación

    const handleLogout = () => {
        router.push("/"); // Redirige a la pantalla de inicio (index)
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Ajustes</Text>
            <Button title="Cerrar sesión" onPress={handleLogout} />
        </View>
    );
}
