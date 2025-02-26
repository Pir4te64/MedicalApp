import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Input, Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./HistorialStylesCrear";
import { FormFieldsProps } from "./HistorialInterface";
import { useHistorialMedicoStore } from "./useHistorialMedicoStore";
import EditableListField from "./Inputs/HistorialCrearInput";
import DateListField from "./Inputs/DateListField";

const FormFields: React.FC<FormFieldsProps> = ({
  showForm,
  date,
  setShowDatePicker,
  showDatePicker,
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

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Fecha:</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.dateButton}
      >
        <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <View style={styles.datePicker}>
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        </View>
      )}

      <Input
        label="Especialidad"
        placeholder="Ingrese la especialidad"
        value={specialty}
        onChangeText={setSpecialty}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
        leftIcon={{
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
        leftIcon={{ type: "font-awesome", name: "user-md", color: "#007BFF" }}
      />

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

      <Button
        title="Enviar"
        onPress={handleSubmit}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
      />
    </View>
  );
};

export default FormFields;
