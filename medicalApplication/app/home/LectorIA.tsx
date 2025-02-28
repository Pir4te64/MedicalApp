import React, { useState } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { Button, Text } from "react-native-elements";
import * as DocumentPicker from "expo-document-picker";
import { Picker } from "@react-native-picker/picker";
import postRequest from "@/components/Lector/FilePickerPOST";

export default function Lector() {
  const [selectedOption, setSelectedOption] = useState("LABORATORY");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileName, setPdfFileName] = useState("");

  const handleSelectChange = (itemValue) => {
    setSelectedOption(itemValue);
  };

  const handleFilePick = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      // Imprimir el resultado completo para depuración
      console.log(result);

      // Si el usuario cancela la selección
      if (result.canceled) {
        return;
      }

      // Acceder al archivo desde result.assets si está disponible
      const file = result.assets ? result.assets[0] : result;

      // Validación de archivo
      if (file.mimeType !== "application/pdf") {
        Alert.alert("Error", "Por favor, selecciona un archivo PDF.");
        return;
      }

      // Actualizar el estado con el archivo seleccionado
      setPdfFile(file.uri);
      setPdfFileName(file.name); // Almacena el nombre del archivo seleccionado
    } catch (error) {
      Alert.alert("Error", "Ocurrió un problema al seleccionar el archivo.");
    }
  };

  const handleSubmit = async () => {
    // Crear el objeto FormData
    const formData = new FormData();

    // Añadir el archivo al FormData con el nombre "file"
    const file = {
      uri: pdfFile,
      type: "application/pdf",
      name: pdfFileName, // Usar pdfFileName para el nombre del archivo
    };

    // Obtener el archivo como un blob
    if (!file.uri) {
      Alert.alert("Error", "El archivo no tiene una URI válida.");
      return;
    }
    const response = await fetch(file.uri);
    const blob = await response.blob();

    formData.append("file", blob, file.name);

    // Crear los parámetros de la consulta con tipoAnalisis
    const params = new URLSearchParams({
      tipoAnalisis: selectedOption, // Añadir el valor de tipoAnalisis a los parámetros de la URL
    }).toString();

    try {
      // Llamar a la función postRequest con los datos de FormData
      const responseData = await postRequest(formData, params);

      // Mostrar alerta con la información
      Alert.alert(
        "Información enviada",
        `Opción seleccionada: ${selectedOption}\nArchivo: ${
          pdfFile ? "Archivo seleccionado" : "No se seleccionó archivo"
        }`
      );

      // Aquí puedes manejar la respuesta como desees
      console.log("Respuesta del servidor:", responseData);
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      Alert.alert("Error", "Hubo un problema al enviar la información.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Text h4 style={styles.headerText}>
          Selecciona una opción:
        </Text>
        <Picker
          selectedValue={selectedOption}
          onValueChange={handleSelectChange}
          style={styles.picker}
        >
          <Picker.Item label="LABORATORY" value="LABORATORY" />
          <Picker.Item label="RECIPE" value="RECIPE" />
          <Picker.Item label="IMAGENOLOGY" value="IMAGENOLOGY" />
        </Picker>

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

        <Button
          title="Enviar"
          onPress={handleSubmit}
          buttonStyle={styles.submitButton}
          disabled={!pdfFile}
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
  picker: {
    height: 50,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
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
  fileText: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
    color: "#333",
  },
});
