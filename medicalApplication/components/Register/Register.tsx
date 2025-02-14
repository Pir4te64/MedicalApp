import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import { validationSchema, initialValues } from "./Register.data";
import { useRouter } from "expo-router";
import { API } from "@/utils/api";

const RegisterForm = () => {
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
      setLoading(true); // Muestra indicador de carga

      const formData = {
        document: values.document,
        pseudonym: values.document, // Pseudónimo igual al documento
        name: values.name,
        password: values.password,
      };
      console.log(formData);

      try {
        const response = await fetch(`${API.REGISTER}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        console.log(response);

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
          throw new Error(data.message || "Error en el registro");
        }

        Alert.alert("Éxito", "Registro exitoso. Ahora puedes iniciar sesión.", [
          { text: "OK", onPress: () => router.replace("/login") },
        ]);
      } catch (error) {
        Alert.alert("Error", error.message || "No se pudo registrar");
      } finally {
        setLoading(false); // Oculta indicador de carga
      }
    },
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
      {/* Campo Documento */}
      <Text style={{ width: "80%", marginBottom: 5 }}>Documento</Text>
      <Input
        placeholder="Documento"
        value={values.document}
        onChangeText={(text) => {
          handleChange("document")(text);
          setFieldValue("pseudonym", text); // Sincroniza pseudónimo con documento
        }}
        onBlur={handleBlur("document")}
        errorMessage={
          touched.document && errors.document ? errors.document : ""
        }
        containerStyle={{ width: "80%", marginBottom: 5 }}
        inputStyle={{ borderBottomWidth: 1, paddingHorizontal: 10 }}
      />

      {/* Campo Nombre */}
      <Text style={{ width: "80%", marginBottom: 5 }}>Nombre</Text>
      <Input
        placeholder="Nombre"
        value={values.name}
        onChangeText={handleChange("name")}
        onBlur={handleBlur("name")}
        errorMessage={touched.name && errors.name ? errors.name : ""}
        containerStyle={{ width: "80%", marginBottom: 5 }}
        inputStyle={{ borderBottomWidth: 1, paddingHorizontal: 10 }}
      />

      {/* Campo Contraseña */}
      <Text style={{ width: "80%", marginBottom: 5 }}>Contraseña</Text>
      <Input
        placeholder="Contraseña"
        value={values.password}
        onChangeText={handleChange("password")}
        onBlur={handleBlur("password")}
        secureTextEntry
        errorMessage={
          touched.password && errors.password ? errors.password : ""
        }
        containerStyle={{ width: "80%", marginBottom: 5 }}
        inputStyle={{ borderBottomWidth: 1, paddingHorizontal: 10 }}
      />

      {/* Botón Registrarse */}
      <View style={{ width: "80%", alignItems: "center" }}>
        <Button
          title={loading ? "Registrando..." : "Registrarse"}
          onPress={handleSubmit}
          disabled={loading}
          buttonStyle={{
            backgroundColor: "#0066cc",
            width: "100%",
            borderRadius: 5,
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

      {/* Link para ir a login */}
      <View style={{ width: "80%", marginTop: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 14 }}>
          <TouchableOpacity onPress={() => router.replace("/login")}>
            <Text style={{ color: "blue", textDecorationLine: "underline" }}>
              ¿Ya tienes una cuenta? Inicia sesión aquí
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
    </ScrollView>
  );
};

export default RegisterForm;
