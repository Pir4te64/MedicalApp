import React from "react";
import { Text, TouchableOpacity, TextInput, View, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./HistorialStyles";
import { FormFieldsProps } from "./HistorialInterface";

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
  if (!showForm) return null;

  return (
    <>
      <Text style={styles.label}>Fecha:</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.dateButton}
      >
        <Text>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Especialidad"
        value={specialty}
        onChangeText={setSpecialty}
      />
      <TextInput
        style={styles.input}
        placeholder="Médico tratante"
        value={treatingPhysician}
        onChangeText={setTreatingPhysician}
      />

      {/* Síntomas */}
      <Text style={styles.label}>Síntomas:</Text>
      {originalSymptoms.map((symptom, index) => (
        <TextInput
          key={`symptom-${index}`}
          style={styles.input}
          placeholder="Síntoma"
          value={symptom}
          onChangeText={(text) => setOriginalSymptoms(index, text)}
        />
      ))}

      {/* Diagnósticos */}
      <Text style={styles.label}>Diagnósticos:</Text>
      {diagnoses.map((diagnosis, index) => (
        <TextInput
          key={`diagnosis-${index}`}
          style={styles.input}
          placeholder="Diagnóstico"
          value={diagnosis}
          onChangeText={(text) => setDiagnoses(index, text)}
        />
      ))}

      {/* Tratamientos */}
      <Text style={styles.label}>Tratamientos:</Text>
      {treatments.map((treatment, index) => (
        <View key={`treatment-${index}`}>
          <Text style={styles.label}>Fecha del tratamiento:</Text>
          <TouchableOpacity
            onPress={() => setShowTreatmentPicker(index)}
            style={styles.dateButton}
          >
            <Text>{treatment.treatmentDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showTreatmentPicker === index && (
            <DateTimePicker
              value={treatment.treatmentDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowTreatmentPicker(null);
                if (selectedDate)
                  setTreatments(index, "treatmentDate", selectedDate);
              }}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="URL del documento"
            value={treatment.urlDocTreatment}
            onChangeText={(text) =>
              setTreatments(index, "urlDocTreatment", text)
            }
          />
        </View>
      ))}

      {/* Follow Ups */}
      <Text style={styles.label}>Seguimientos</Text>
      {followUps.map((followUp, index) => (
        <View key={`followUp-${index}`}>
          <Text style={styles.label}>Fecha del seguimiento:</Text>
          <TouchableOpacity
            onPress={() => setShowFollowUpPicker(index)}
            style={styles.dateButton}
          >
            <Text>{followUp.followUpDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showFollowUpPicker === index && (
            <DateTimePicker
              value={followUp.followUpDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowFollowUpPicker(null);
                if (selectedDate)
                  setFollowUps(index, "followUpDate", selectedDate);
              }}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Notas del seguimiento"
            value={followUp.followUpNotes}
            onChangeText={(text) => setFollowUps(index, "followUpNotes", text)}
          />
        </View>
      ))}

      {/* Orders */}
      <Text style={styles.label}>Órdenes</Text>
      {orders.map((order, index) => (
        <View key={`order-${index}`}>
          <Text style={styles.label}>Fecha de la orden:</Text>
          <TouchableOpacity
            onPress={() => setShowOrderPicker(index)}
            style={styles.dateButton}
          >
            <Text>{order.ordersDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showOrderPicker === index && (
            <DateTimePicker
              value={order.ordersDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowOrderPicker(null);
                if (selectedDate) setOrders(index, "ordersDate", selectedDate);
              }}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="URL del documento de la orden"
            value={order.urlDocOrders}
            onChangeText={(text) => setOrders(index, "urlDocOrders", text)}
          />
        </View>
      ))}

      <Button title="Enviar" onPress={handleSubmit} />
    </>
  );
};

export default FormFields;
