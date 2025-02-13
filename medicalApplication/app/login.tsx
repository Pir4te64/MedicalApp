import React, { useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { useRouter } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (email === 'superusuario@gmail.com' && password === '123456') {
            router.push('/home'); 
        } else {
            alert('Credenciales incorrectas');
        }
    };

    return (
        <KeyboardAwareScrollView 
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 10 }} 
            enableOnAndroid={true} 
            extraScrollHeight={20} 
        >
            {/* Imagen en la parte superior */}
            <Image
                source={require('../assets/images/login2.png')}
                style={{
                    width: 200,
                    height: 200,
                    marginBottom: 30,
                    borderRadius: 10,
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
                    backgroundColor: '#0066cc',
                    width: '100%',
                    borderRadius: 0,
                    marginBottom: 10,
                }}
                containerStyle={{
                    width: '50%',
                    borderRadius: 0,
                }}
                titleStyle={{
                    fontSize: 18,
                    textAlign: 'center',
                }}
            />
        </KeyboardAwareScrollView>
    );
}
