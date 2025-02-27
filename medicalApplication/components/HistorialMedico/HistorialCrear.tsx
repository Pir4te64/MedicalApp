import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Input, Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./HistorialStylesCrear";
import { FormFieldsProps } from "./HistorialInterface";
import { useHistorialMedicoStore } from "./useHistorialMedicoStore";
import EditableListField from "./Inputs/HistorialCrearInput";
import DateListField from "./Inputs/DateListField";
import { Ionicons } from "@expo/vector-icons";

const FormFields: React.FC<FormFieldsProps> = ({
  showForm,
  date,
  setDate,
  specialty,
  setSpecialty,
  treatingPhysician,
  setTreatingPhysician,
  originalSymptoms,
  setOriginalSymptoms,
  diagnoses,
  setDiagnoses,
  treatments,
  setTreatments,
  showTreatmentPicker,
  setShowTreatmentPicker,
  followUps,
  setFollowUps,
  showFollowUpPicker,
  setShowFollowUpPicker,
  orders,
  setOrders,
  showOrderPicker,
  setShowOrderPicker,
  handleSubmit,
}) => {
  const {
    addOriginalSymptom,
    removeOriginalSymptom,
    addDiagnosis,
    removeDiagnosis,
    addTreatment,
    removeTreatment,
    addFollowUp,
    removeFollowUp,
    addOrder,
    removeOrder,
  } = useHistorialMedicoStore();

  if (!showForm) return null;
  const [isFormVisible, setFormVisible] = useState(false);
  const [isSymptomsVisible, setSymptomsVisible] = useState(false);
  // Toggle visibility function
  const [isDateFieldsVisible, setDateFieldsVisible] = useState(false);

  const toggleDateFieldsVisibility = () => {
    setDateFieldsVisible(!isDateFieldsVisible);
  };
  const toggleVisibility = () => {
    setFormVisible(!isFormVisible);
  };
  const toggleSymptomsVisibility = () => {
    setSymptomsVisible(!isSymptomsVisible);
  };

  // Función para manejar el cambio de fecha y limitar a la fecha actual
  const handleDateChange = (event, selectedDate) => {
    const currentDate = new Date();

    // Si la fecha seleccionada es posterior a la fecha actual, no actualices el estado
    if (selectedDate && selectedDate <= currentDate) {
      setDate(selectedDate);
    } else {
      // Si la fecha seleccionada es mayor que la fecha actual, puedes poner la fecha actual
      setDate(currentDate);
    }
  };
  const isFormValid = () => {
    return (
      date !== undefined &&
      specialty.trim() !== "" &&
      treatingPhysician.trim() !== "" &&
      originalSymptoms.length > 0 &&
      diagnoses.length > 0 &&
      treatments.length > 0 &&
      followUps.length > 0 &&
      orders.length > 0
    );
  };
  return (
    <View style={styles.formContainer}>
      <TouchableOpacity
        onPress={toggleVisibility}
        style={{
          backgroundColor: "#007BFF",
          padding: 10,
          borderRadius: 8,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "white", marginRight: 10, fontSize: 16 }}>
          Datos
        </Text>
        <Ionicons
          name={isFormVisible ? "chevron-up-outline" : "chevron-down-outline"}
          size={24}
          color="white"
        />
      </TouchableOpacity>

      {isFormVisible && (
        <>
          <Text style={styles.label}>Fecha:</Text>
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
            style={styles.datePicker}
          />

          <Input
            label="Especialidad"
            placeholder="Ingrese la especialidad"
            value={specialty}
            onChangeText={setSpecialty}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            rightIcon={{
              type: "font-awesome",
              name: "stethoscope",
              color: "#007BFF",
            }}
          />

          <Input
            label="Médico Tratante"
            placeholder="Ingrese el médico tratante"
            value={treatingPhysician}
            onChangeText={setTreatingPhysician}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            rightIcon={{
              type: "font-awesome",
              name: "user-md",
              color: "#007BFF",
            }}
          />
        </>
      )}
      <TouchableOpacity
        onPress={toggleSymptomsVisibility}
        style={{
          backgroundColor: "#007BFF",
          padding: 10,
          borderRadius: 8,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "white", marginRight: 10, fontSize: 16 }}>
          Síntomas y Diagnósticos
        </Text>
        <Ionicons
          name={
            isSymptomsVisible ? "chevron-up-outline" : "chevron-down-outline"
          }
          size={24}
          color="white"
        />
      </TouchableOpacity>

      {isSymptomsVisible && (
        <>
          <EditableListField
            label="Síntomas"
            placeholder="Síntoma"
            items={originalSymptoms}
            onChangeItem={(index, value) => setOriginalSymptoms(index, value)}
            onRemoveItem={removeOriginalSymptom}
            onAddItem={() => addOriginalSymptom("")}
          />

          <EditableListField
            label="Diagnósticos"
            placeholder="Diagnóstico"
            items={diagnoses}
            onChangeItem={(index, value) => setDiagnoses(index, value)}
            onRemoveItem={removeDiagnosis}
            onAddItem={() => addDiagnosis("")}
          />
        </>
      )}

      <TouchableOpacity
        onPress={toggleDateFieldsVisibility}
        style={{
          backgroundColor: "#007BFF",
          padding: 10,
          borderRadius: 8,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "white", marginRight: 10, fontSize: 16 }}>
          Tratamientos, Seguimientos y Órdenes
        </Text>
        <Ionicons
          name={
            isDateFieldsVisible ? "chevron-up-outline" : "chevron-down-outline"
          }
          size={24}
          color="white"
        />
      </TouchableOpacity>

      {isDateFieldsVisible && (
        <>
          <DateListField
            label="Tratamientos"
            items={treatments}
            setItems={setTreatments}
            addItem={addTreatment}
            removeItem={removeTreatment}
            showPicker={showTreatmentPicker}
            setShowPicker={setShowTreatmentPicker}
            dateKey="treatmentDate"
            textKey="urlDocTreatment"
            placeholder="URL del documento"
          />

          <DateListField
            label="Seguimientos"
            items={followUps}
            setItems={setFollowUps}
            addItem={addFollowUp}
            removeItem={removeFollowUp}
            showPicker={showFollowUpPicker}
            setShowPicker={setShowFollowUpPicker}
            dateKey="followUpDate"
            textKey="followUpNotes"
            placeholder="Notas del seguimiento"
          />

          <DateListField
            label="Órdenes"
            items={orders}
            setItems={setOrders}
            addItem={addOrder}
            removeItem={removeOrder}
            showPicker={showOrderPicker}
            setShowPicker={setShowOrderPicker}
            dateKey="ordersDate"
            textKey="urlDocOrders"
            placeholder="URL del documento de la orden"
          />
        </>
      )}

      <Button
        title="Enviar Formulario"
        onPress={handleSubmit}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        disabled={!isFormValid()}
      />
    </View>
  );
};

export default FormFields;
