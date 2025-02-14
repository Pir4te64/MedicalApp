import React, { useState } from "react";
import { View, ScrollView, Text, Alert, ActivityIndicator } from "react-native";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import { validationSchema, initialValues } from "./RegistrarDep.data";
import { useRouter } from "expo-router";
import { API } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterDependientes = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const formData = {
        document: values.document,
        pseudonym: values.document, // Pseudónimo igual al documento
        name: values.name,
        password: values.password,
      };
      console.log(formData);

      try {
        // Obtener el token almacenado, en caso de que sea necesario
        const token = await AsyncStorage.getItem("authToken");

        const response = await fetch(`${API.DEPENDIENTE}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Agregamos el token si existe
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Error en el registro");
        }

        // Al registro exitoso, mostramos una alerta personalizada y redirigimos a la pantalla de perfil.
        Alert.alert(
          "Registro Exitoso",
          "Dependiente registrado correctamente.",
          [{ text: "OK", onPress: () => router.replace("/home/ProfileScreen") }]
        );
      } catch (error) {
        Alert.alert("Error", (error as any).message || "No se pudo registrar");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <ScrollView
      style={{ width: "100%" }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      {/* Campo Documento */}
      <Text style={{ width: "100%", marginBottom: 5 }}>Documento</Text>
      <Input
        placeholder="Documento"
        value={values.document}
        onChangeText={(text) => {
          handleChange("document")(text);
          setFieldValue("pseudonym", text);
        }}
        onBlur={handleBlur("document")}
        errorMessage={
          touched.document && errors.document ? errors.document : ""
        }
        containerStyle={{ width: "100%", marginBottom: 5 }}
        inputStyle={{ borderBottomWidth: 1, paddingHorizontal: 5 }}
      />

      {/* Campo Nombre */}
      <Text style={{ width: "100%", marginBottom: 5 }}>Nombre</Text>
      <Input
        placeholder="Nombre"
        value={values.name}
        onChangeText={handleChange("name")}
        onBlur={handleBlur("name")}
        errorMessage={touched.name && errors.name ? errors.name : ""}
        containerStyle={{ width: "100%", marginBottom: 5 }}
        inputStyle={{ borderBottomWidth: 1, paddingHorizontal: 5 }}
      />

      {/* Campo Contraseña */}
      <Text style={{ width: "100%", marginBottom: 5 }}>Contraseña</Text>
      <Input
        placeholder="Contraseña"
        value={values.password}
        onChangeText={handleChange("password")}
        onBlur={handleBlur("password")}
        secureTextEntry
        errorMessage={
          touched.password && errors.password ? errors.password : ""
        }
        containerStyle={{ width: "100%", marginBottom: 5 }}
        inputStyle={{ borderBottomWidth: 1, paddingHorizontal: 5 }}
      />

      {/* Botón Registrarse */}
      <View style={{ width: "100%", alignItems: "center" }}>
        <Button
          title={loading ? "Registrando..." : "Registrar Dependiente"}
          onPress={() => handleSubmit()}
          disabled={loading}
          buttonStyle={{
            backgroundColor: "#0066cc",
            width: "100%",
            borderRadius: 0,
          }}
          containerStyle={{ marginTop: 10, width: "100%" }}
          titleStyle={{ fontSize: 18, textAlign: "center" }}
        />
        {loading && (
          <ActivityIndicator
            size="large"
            color="#0066cc"
            style={{ marginTop: 10 }}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default RegisterDependientes;
