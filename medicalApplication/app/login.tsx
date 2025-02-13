import React, { useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { Button } from 'react-native-elements'; // Usamos el Button de react-native-elements
import { useRouter } from 'expo-router';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (email === 'superusuario@gmail.com' && password === '123456') {
            router.push('/home'); // Redirigir a la pantalla de home
        } else {
            alert('Credenciales incorrectas');
        }
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
            }}
        >
            {/* Imagen en la parte superior */}
            <Image
                source={require('../assets/images/medico.png')} // Asegúrate de que la ruta sea correcta
                style={{
                    width: 200,
                    height: 200,
                    marginBottom: 30, // Separación de la imagen con el texto
                    borderRadius: 10, // Bordes redondeados para la imagen
                }}
            />

            {/* Título */}
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
                Iniciar Sesión
            </Text>

            {/* Campo de correo electrónico */}
            <TextInput
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                style={{
                    width: '80%',
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 5,
                    marginBottom: 15,
                    fontSize: 16,
                }}
            />

            {/* Campo de contraseña */}
            <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{
                    width: '80%',
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 5,
                    marginBottom: 15,
                    fontSize: 16,
                }}
            />

            {/* Botón Iniciar Sesión */}
            <Button
                title="Ingresar"
                onPress={handleLogin}
                buttonStyle={{
                    backgroundColor: '#0066cc', // Azul formal
                    width: '100%', // Ancho completo
                    borderRadius: 0, // Bordes rectos
                    marginBottom: 10,
                }}
                containerStyle={{
                    width: '50%', // Ancho completo
                    borderRadius: 0, // Bordes rectos
                }}
                titleStyle={{
                    fontSize: 18, // Tamaño del texto
                    textAlign: 'center', // Centrar el texto
                }}
            />
        </View>
    );
}
