import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Input, Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker"; // Importamos el DateTimePicker

const RegistrationForm = () => {
  // Estados para campos simples
  const [birthDate, setBirthDate] = useState(new Date()); // Fecha inicial (puede ser cualquier fecha)
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bloodType, setBloodType] = useState("");

  // Manejo de cambio de fecha usando DateTimePicker
  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || birthDate; // Si no se seleccionó fecha, mantenemos la actual
    setBirthDate(currentDate);
  };

  // Manejo de envío del formulario
  const handleSubmit = () => {
    const formattedDate = `${birthDate.getDate().toString().padStart(2, "0")}${(
      birthDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}${birthDate.getFullYear()}`;
    const formData = {
      userId: 0,
      birthDate: formattedDate,
      weight,
      height,
      bloodType,
      medicationAllergyUsers: [],
      otherAllergiesUsers: [],
      chronicDiseasesUsersRequest: [],
    };

    console.log("Datos del formulario:", formData);
    // Aquí puedes enviar formData a tu API o realizar otra acción
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <Text style={styles.subtitle}>Fecha de Nacimiento</Text>

      <DateTimePicker
        value={birthDate} // Aseguramos que se muestre la fecha seleccionada o la actual
        mode="date" // El picker en modo de fecha
        display="default" // Utiliza el picker nativo
        onChange={handleDateChange} // Al cambiar la fecha, la actualizamos
      />

      <Input
        label="Peso"
        placeholder="Ingrese su peso"
        value={weight}
        onChangeText={setWeight}
      />
      <Input
        label="Altura"
        placeholder="Ingrese su altura"
        value={height}
        onChangeText={setHeight}
      />
      <Input
        label="Tipo de Sangre"
        placeholder="Ingrese su tipo de sangre"
        value={bloodType}
        onChangeText={setBloodType}
      />

      <Button
        title="Registrarse"
        onPress={handleSubmit}
        containerStyle={styles.submitButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  submitButton: {
    marginVertical: 20,
  },
});

export default RegistrationForm;
