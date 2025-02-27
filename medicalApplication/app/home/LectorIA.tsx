import React, { useState } from "react";
import { View, StyleSheet, Text, Button, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

export default function Lector() {
  const [selectedOption, setSelectedOption] = useState("LABORATORY");
  const [image, setImage] = useState(null);

  const handleSelectChange = (itemValue) => {
    setSelectedOption(itemValue);
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri); // Asegurar que se usa el nuevo formato
    }
  };

  const handleCaptureImage = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    console.log("Opción seleccionada:", selectedOption);
    console.log("Información de la imagen:", image);

    Alert.alert(
      "Información enviada",
      `Opción seleccionada: ${selectedOption}\nImagen: ${
        image ? "Imagen seleccionada" : "No se seleccionó imagen"
      }`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Configuraciones</Text>

      <View style={styles.content}>
        <Text style={styles.label}>Selecciona una opción:</Text>
        <Picker
          selectedValue={selectedOption}
          onValueChange={handleSelectChange}
          style={styles.picker}
        >
          <Picker.Item label="LABORATORY" value="LABORATORY" />
          <Picker.Item label="RECIPE" value="RECIPE" />
          <Picker.Item label="IMAGENOLOGY" value="IMAGENOLOGY" />
        </Picker>

        <Text style={styles.label}>Selecciona una imagen:</Text>
        <Button
          title="Seleccionar imagen de la galería"
          onPress={handleImagePick}
        />
        <Button title="Usar cámara" onPress={handleCaptureImage} />

        {image && <Image source={{ uri: image }} style={styles.image} />}

        <Button title="Enviar" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  content: {
    flex: 1,
    justifyContent: "space-around",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    alignSelf: "center",
  },
});
