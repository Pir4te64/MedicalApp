import React from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements'; // Usamos el Button de react-native-elements
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

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
        ¡Bienvenido!
      </Text>

      {/* Botón Iniciar sesión */}
      <Button
        title="Iniciar Sesión"
        onPress={() => router.push('/login')}
        buttonStyle={{
          backgroundColor: '#0066cc', // Azul formal
          borderRadius: 0, // Bordes rectos
          marginBottom: 10, // Separación entre botones
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

      {/* Botón Registrarse */}
      <Button
        title="Registrarse"
        onPress={() => router.push('/register')}
        buttonStyle={{
          backgroundColor: '#0066cc', // Azul formal
          borderRadius: 0, // Bordes rectos
          marginBottom: 10,
        }}
        containerStyle={{
          width: '50%', // Ancho completo
          borderRadius: 0, // Bordes rectos
        }}
        titleStyle={{
          fontSize: 18,
          textAlign: 'center', // Centrar el texto
        }}
      />
    </View>
  );
}
