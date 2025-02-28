import { useProfileStore } from "@/components/Profile/profileStore";
import { getUserData } from "@/components/RegisterUserData/Register.fetch";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-elements";
import { BASE_URL } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Detalles = () => {
  const { fetchProfile, profile } = useProfileStore();
  const [userData, setUserData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("LABORATORY");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [fetchProfile])
  );

  useEffect(() => {
    if (profile?.id) {
      const fetchAndSaveUserData = async () => {
        try {
          const data = await getUserData(profile.id);
          if (data) {
            setUserData(data.body);
          }
        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error);
        }
      };
      fetchAndSaveUserData();
    }
  }, [profile]);

  const handleConsultas = async () => {
    if (!selectedOption) {
      Alert.alert("Consulta", "Por favor, selecciona una opción válida.");
      return;
    }

    let endpoint = "";
    switch (selectedOption) {
      case "LABORATORY":
        endpoint = "/api/openai/laboratory";
        break;
      case "IMAGENOLOGY":
        endpoint = "/api/openai/imageneology";
        break;
      case "RECIPE":
        endpoint = "/api/openai/recipe";
        break;
      default:
        Alert.alert("Consulta", "Opción no válida.");
        return;
    }

    const userDataId = userData?.userDataId;
    const params = new URLSearchParams({ userDataId });

    if (selectedOption === "LABORATORY" && selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      params.append("date", formattedDate);
    }

    const url = `${BASE_URL}${endpoint}?${params.toString()}`;

    try {
      const authToken = await AsyncStorage.getItem("authToken");
      if (!authToken) {
        Alert.alert("Error", "No se encontró un token de autenticación.");
        return;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      Alert.alert(
        response.ok ? "Consulta exitosa" : "Error en la consulta",
        `Opción: ${selectedOption}\nFecha: ${
          selectedOption === "LABORATORY"
            ? selectedDate.toLocaleDateString()
            : "No aplica"
        }\nRespuesta: ${data.message || "Consulta realizada correctamente."}`
      );
    } catch (error) {
      console.error("Error al hacer la consulta:", error);
      Alert.alert("Error", "Hubo un problema con la consulta.");
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    setSelectedDate(selectedDate || new Date());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Selecciona una opción:</Text>
      <RNPickerSelect
        placeholder={{ label: "Selecciona una opción...", value: null }}
        onValueChange={(value) => setSelectedOption(value)}
        items={[
          { label: "LABORATORY", value: "LABORATORY" },
          { label: "RECIPE", value: "RECIPE" },
          { label: "IMAGENOLOGY", value: "IMAGENOLOGY" },
        ]}
        value={selectedOption}
        style={pickerSelectStyles}
      />

      {selectedOption === "LABORATORY" && (
        <View style={styles.datePickerContainer}>
          <Button
            buttonStyle={styles.button}
            title="Seleccionar fecha"
            onPress={() => setShowDatePicker(true)}
          />
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
      )}

      <Button
        title="Consultar"
        onPress={handleConsultas}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  datePickerContainer: {
    marginVertical: 20,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: "80%",
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 10,
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

export default Detalles;
