import React from "react";
import { Text, TouchableOpacity, TextInput, View, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./HistorialStyles";
import { FormFieldsProps } from "./HistorialInterface";
import { useHistorialMedicoStore } from "./useHistorialMedicoStore";
import EditableListField from "./Inputs/HistorialCrearInput";
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


      {/* Tratamientos */}
      <Text style={styles.label}>Tratamientos:</Text>
      {treatments.map((treatment, index) => (
        <View key={`treatment-${index}`} style={{ marginBottom: 12 }}>
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
          <TouchableOpacity
            onPress={() => removeTreatment(index)}
            style={{ marginTop: 4 }}
          >
            <Text style={{ color: "red" }}>Eliminar tratamiento</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        onPress={() =>
          addTreatment({
            treatmentDate: new Date(),
            urlDocTreatment: "",
          })
        }
        style={{ marginTop: 8 }}
      >
        <Text style={{ color: "blue" }}>Agregar tratamiento</Text>
      </TouchableOpacity>

      {/* Seguimientos */}
      <Text style={styles.label}>Seguimientos</Text>
      {followUps.map((followUp, index) => (
        <View key={`followUp-${index}`} style={{ marginBottom: 12 }}>
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
            onChangeText={(text) =>
              setFollowUps(index, "followUpNotes", text)
            }
          />
          <TouchableOpacity
            onPress={() => removeFollowUp(index)}
            style={{ marginTop: 4 }}
          >
            <Text style={{ color: "red" }}>Eliminar seguimiento</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        onPress={() =>
          addFollowUp({
            followUpDate: new Date(),
            followUpNotes: "",
          })
        }
        style={{ marginTop: 8 }}
      >
        <Text style={{ color: "blue" }}>Agregar seguimiento</Text>
      </TouchableOpacity>


      {/* Órdenes */}
      <Text style={styles.label}>Órdenes</Text>
      {orders.map((order, index) => (
        <View key={`order-${index}`} style={{ marginBottom: 12 }}>
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
                if (selectedDate)
                  setOrders(index, "ordersDate", selectedDate);
              }}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="URL del documento de la orden"
            value={order.urlDocOrders}
            onChangeText={(text) => setOrders(index, "urlDocOrders", text)}
          />
          <TouchableOpacity
            onPress={() => removeOrder(index)}
            style={{ marginTop: 4 }}
          >
            <Text style={{ color: "red" }}>Eliminar orden</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        onPress={() =>
          addOrder({ ordersDate: new Date(), urlDocOrders: "" })
        }
        style={{ marginTop: 8 }}
      >
        <Text style={{ color: "blue" }}>Agregar orden</Text>
      </TouchableOpacity>


      <Button title="Enviar" onPress={handleSubmit} />
    </>
  );
};

export default FormFields;
