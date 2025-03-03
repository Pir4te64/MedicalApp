import { useProfileStore } from "@/components/Profile/profileStore";
import { getUserData } from "@/components/RegisterUserData/Register.fetch";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-elements";
import { BASE_URL } from "@/utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PatientResults from "@/components/Detalles/TestItem";
import Ionicons from "react-native-vector-icons/Ionicons";

const Detalles = () => {
  const { fetchProfile, profile } = useProfileStore();
  const [userData, setUserData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("LABORATORY");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [consultaResult, setConsultaResult] = useState(null);
  const [isQueryCollapsed, setIsQueryCollapsed] = useState(false);

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
    console.log("URL de la consulta:", url);

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
      console.log("Respuesta de la consulta:", data);

      setConsultaResult(data);

      Alert.alert(
        response.ok ? "Consulta exitosa" : "Error en la consulta",
        `Opción: ${selectedOption}\nFecha: ${selectedOption === "LABORATORY"
          ? selectedDate.toLocaleDateString()
          : "No aplica"
        }\nMensaje: ${data.message || "Consulta realizada correctamente."}`
      );
    } catch (error) {
      console.error("Error al hacer la consulta:", error);
      Alert.alert("Error", "Hubo un problema con la consulta.");
    }
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    setSelectedDate(date || new Date());
  };

  return (
    <View style={styles.container}>
      {/* Header colapsable para la sección de consulta */}
      <TouchableOpacity
        onPress={() => setIsQueryCollapsed(!isQueryCollapsed)}
        style={styles.collapsibleHeader}
      >
        <Text style={styles.collapsibleHeaderText}>Consulta</Text>
        <Ionicons
          name={
            isQueryCollapsed
              ? "chevron-down-outline"
              : "chevron-up-outline"
          }
          size={24}
          color="white"
        />
      </TouchableOpacity>

      {/* Contenido de la consulta */}
      {!isQueryCollapsed && (
        <View style={styles.queryContainer}>
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
              <Text style={styles.headerText}>Selecciona una fecha:</Text>
              <Button
                buttonStyle={styles.button}
                title="Fecha en la que se realizó el estudio"
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
      )}

      {/* Resultados de la consulta */}
      {consultaResult && consultaResult.body && consultaResult.body.length > 0 && (
        <View style={styles.resultContainer}>
          <PatientResults data={consultaResult} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    fontSize: 18,
    marginVertical: 10,
  },
  collapsibleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    padding: 10,
    backgroundColor: "#0066cc",
    borderRadius: 10,
    marginBottom: 10,
  },
  collapsibleHeaderText: {
    fontSize: 18,
    color: "#fff",
  },
  queryContainer: {
    width: "80%",
    alignItems: "center",
  },
  datePickerContainer: {
    alignItems: "center",
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 10,
  },
  resultContainer: {
    marginTop: 20,
    width: "100%",
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
