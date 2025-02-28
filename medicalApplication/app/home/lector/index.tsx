import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Button, Text } from "react-native-elements";
import * as DocumentPicker from "expo-document-picker";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import postRequest from "@/components/Lector/FilePickerPOST";
import { Link, router } from "expo-router"; // Importar el componente Link

export default function Lector() {
  const [selectedOption, setSelectedOption] = useState("LABORATORY");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileName, setPdfFileName] = useState("");
  const [loading, setLoading] = useState(false); // Nuevo estado para manejar el loader

  const handleFilePick = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.canceled) return;

      const file = result.assets ? result.assets[0] : result;

      if (!file || file.mimeType !== "application/pdf") {
        Alert.alert("Error", "Por favor, selecciona un archivo PDF válido.");
        return;
      }

      setPdfFile(file.uri);
      setPdfFileName(file.name);
    } catch (error) {
      Alert.alert("Error", "Ocurrió un problema al seleccionar el archivo.");
    }
  };

  const handleSubmit = async () => {
    if (!pdfFile) {
      Alert.alert("Error", "No has seleccionado un archivo.");
      return;
    }

    if (!selectedOption) {
      Alert.alert("Error", "Por favor selecciona una opción.");
      return;
    }

    setLoading(true); // Inicia el loader

    try {
      const token = await AsyncStorage.getItem("authToken");

      if (!token) {
        Alert.alert("Error", "No se encontró el token de autenticación.");
        return;
      }

      const formData = new FormData();
      formData.append("file", {
        uri: pdfFile,
        type: "application/pdf",
        name: pdfFileName,
      });

      const queryParams = `tipoAnalisis=${selectedOption}`;
      const response = await postRequest(formData, queryParams);

      console.log("Respuesta del servidor:", response);

      // Mostrar la alerta de éxito con un botón para volver a la pantalla anterior
      Alert.alert("Éxito", "El archivo fue enviado correctamente.", [
        {
          text: "OK",
          onPress: () => navigation.goBack(), // Volver a la pantalla anterior
        },
      ]);
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      Alert.alert("Error", "Hubo un problema al enviar el archivo.");
    } finally {
      setLoading(false); // Finaliza el loader
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Text h4 style={styles.headerText}>
          Selecciona una opción:
        </Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedOption(value)}
          items={[
            { label: "LABORATORY", value: "LABORATORY" },
            { label: "RECIPE", value: "RECIPE" },
            { label: "IMAGENOLOGY", value: "IMAGENOLOGY" },
          ]}
          value={selectedOption}
          style={pickerSelectStyles}
        />

        <Text h4 style={styles.headerText}>
          Selecciona un archivo PDF:
        </Text>
        <Button
          title="Seleccionar PDF"
          onPress={handleFilePick}
          buttonStyle={styles.button}
        />

        {pdfFileName && (
          <Text style={styles.fileText}>
            Archivo seleccionado: {pdfFileName}
          </Text>
        )}

        {loading ? (
          <ActivityIndicator size="large" color="#28a745" />
        ) : (
          <Button
            title="Enviar"
            onPress={handleSubmit}
            buttonStyle={styles.submitButton}
            disabled={!pdfFile || loading} // Desactivar el botón mientras se está enviando el archivo
          />
        )}

        {loading && (
          <Text style={styles.loadingText}>Petición en curso...</Text>
        )}

        {/* Usando el componente Link para ir a la pantalla de detalles */}
        <Button
          title="Ir a Detalles"
          buttonStyle={styles.detailsButton}
          onPress={() => {
            router.push("/home/lector/detalles"); // Navegar a la pantalla de detalles
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  innerContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  button: {
    marginVertical: 10,
    backgroundColor: "#007bff",
    borderRadius: 10,
  },
  submitButton: {
    marginVertical: 20,
    backgroundColor: "#28a745",
    borderRadius: 10,
  },
  detailsButton: {
    marginVertical: 20,
    backgroundColor: "#ff7f50", // Puedes ajustar el color
    borderRadius: 10,
  },
  fileText: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
    color: "#333",
  },
  loadingText: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
    color: "#333",
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    color: "#333",
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    color: "#333",
    backgroundColor: "#fff",
    marginBottom: 20,
  },
};
