import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import { schemaValidation } from "./Login.data";
import { API } from "@/utils/api";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async (values) => {
    setIsSubmitting(true);
    try {
      // Hacemos la petición sin el token en los headers
      const response = await fetch(`${API.LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username.trim(),
          password: values.password.trim(),
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok && data.success) {
        // Guardar tokens según la plataforma
        if (Platform.OS === "android" || Platform.OS === "ios") {
          await AsyncStorage.setItem("authToken", data.body.token);
          await AsyncStorage.setItem("refreshToken", data.body.refreshToken);
        }

        Alert.alert("¡Bienvenido!", "Inicio de sesión exitoso.");
        router.push("/home");
      } else {
        Alert.alert("Error", data.message || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hubo un problema con la conexión.");
    }
    setIsSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: schemaValidation,
    onSubmit: handleLogin,
  });

  return (
    <ScrollView
      style={{ width: "100%" }}
      contentContainerStyle={{
        paddingTop: 20,
        paddingBottom: 30,
        alignItems: "center",
      }}
    >
      <View style={{ width: "80%" }}>
        <Text style={{ marginTop: 5 }}>Usuario "(DNI)":</Text>
        <Input
          placeholder="Ingrese su DNI"
          onChangeText={formik.handleChange("username")}
          onBlur={formik.handleBlur("username")}
          value={formik.values.username}
          containerStyle={{ marginBottom: 5 }}
          inputStyle={{ borderBottomWidth: 1 }}
          errorMessage={
            formik.touched.username && formik.errors.username
              ? formik.errors.username
              : ""
          }
        />

        <Text style={{ marginTop: 5 }}>Contraseña:</Text>
        <Input
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          value={formik.values.password}
          containerStyle={{ marginBottom: 5 }}
          inputStyle={{ borderBottomWidth: 1 }}
          errorMessage={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""
          }
        />

        <Button
          title={isSubmitting ? "Cargando..." : "Ingresar"}
          onPress={() => formik.handleSubmit()}
          disabled={isSubmitting}
          buttonStyle={{
            backgroundColor: "#0066cc",
            width: "100%",
            borderRadius: 0,
          }}
          titleStyle={{
            fontSize: 18,
            textAlign: "center",
          }}
        />

        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text
            style={{
              color: "blue",
              textDecorationLine: "underline",
              textAlign: "center",
              marginTop: 15,
            }}
          >
            ¿No tienes una cuenta? Regístrate aquí
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
