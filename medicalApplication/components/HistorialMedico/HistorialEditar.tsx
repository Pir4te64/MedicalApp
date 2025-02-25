import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./HistorialStyles"; // Asegúrate de tener estilos o crea los tuyos

interface Historial {
  id: string;
  date: string;
  specialty: string;
  treatingPhysician: string;
  originalSymptoms: string[];
  diagnoses: string[];
  treatments: {
    treatmentDate: (number | string)[];
    urlDocTreatment: string;
  }[];
  followUps: {
    followUpDate: (number | string)[];
    followUpNotes: string;
  }[];
  orders: {
    ordersDate: (number | string)[];
    urlDocOrders: string;
  }[];
  userDataId: string | null;
}

interface HistorialEditarProps {
  historial: Historial;
}

const HistorialEditar: React.FC<HistorialEditarProps> = ({ historial }) => {
  const initialDate = new Date(historial.date);

  const [date, setDate] = useState<Date>(initialDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [specialty, setSpecialty] = useState(historial.specialty);
  const [treatingPhysician, setTreatingPhysician] = useState(
    historial.treatingPhysician
  );
  const [originalSymptoms, setOriginalSymptoms] = useState(
    historial.originalSymptoms
  );
  const [diagnoses, setDiagnoses] = useState(historial.diagnoses);
  const [treatments, setTreatments] = useState(historial.treatments);
  const [followUps, setFollowUps] = useState(historial.followUps);
  const [orders, setOrders] = useState(historial.orders);

  const convertToDate = (dateArray: (number | string)[]): Date => {
    const [year, month, day] = dateArray;
    return new Date(year, month - 1, day);
  };

  const handleSymptomChange = (index: number, value: string) => {
    const newSymptoms = [...originalSymptoms];
    newSymptoms[index] = value;
    setOriginalSymptoms(newSymptoms);
  };

  const handleSave = () => {
    const editedHistorial: Historial = {
      ...historial,
      date: date.toISOString().split("T")[0],
      specialty,
      treatingPhysician,
      originalSymptoms,
      diagnoses,
      treatments: treatments.map((treatment) => ({
        ...treatment,
        treatmentDate:
          treatment.treatmentDate instanceof Array
            ? convertToDate(treatment.treatmentDate).toISOString().split("T")[0]
            : treatment.treatmentDate,
      })),
      followUps: followUps.map((followUp) => ({
        ...followUp,
        followUpDate:
          followUp.followUpDate instanceof Array
            ? convertToDate(followUp.followUpDate).toISOString().split("T")[0]
            : followUp.followUpDate,
      })),
      orders: orders.map((order) => ({
        ...order,
        ordersDate:
          order.ordersDate instanceof Array
            ? convertToDate(order.ordersDate).toISOString().split("T")[0]
            : order.ordersDate,
      })),
    };
    console.log(JSON.stringify(editedHistorial, null, 2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Fecha:</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
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

      <Text style={styles.label}>Especialidad:</Text>
      <TextInput
        style={styles.input}
        value={specialty}
        onChangeText={setSpecialty}
      />

      <Text style={styles.label}>Médico Tratante:</Text>
      <TextInput
        style={styles.input}
        value={treatingPhysician}
        onChangeText={setTreatingPhysician}
      />

      <Text style={styles.label}>Síntomas:</Text>
      {originalSymptoms.map((symptom, index) => (
        <TextInput
          key={`symptom-${index}`}
          style={styles.input}
          value={symptom}
          onChangeText={(text) => handleSymptomChange(index, text)}
          placeholder="Síntoma"
        />
      ))}

      <Text style={styles.label}>Diagnósticos:</Text>
      {diagnoses.map((diagnosis, index) => (
        <TextInput
          key={`diagnosis-${index}`}
          style={styles.input}
          value={diagnosis}
          onChangeText={(text) => {
            const newDiagnoses = [...diagnoses];
            newDiagnoses[index] = text;
            setDiagnoses(newDiagnoses);
          }}
          placeholder="Diagnóstico"
        />
      ))}

      <Text style={styles.label}>Tratamientos:</Text>
      {treatments.map((treatment, index) => (
        <View key={`treatment-${index}`}>
          <Text style={styles.label}>Fecha del tratamiento:</Text>
          <TouchableOpacity style={styles.dateButton} onPress={() => {}}>
            <Text>
              {convertToDate(treatment.treatmentDate).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={treatment.urlDocTreatment}
            onChangeText={(text) => {
              const newTreatments = [...treatments];
              newTreatments[index].urlDocTreatment = text;
              setTreatments(newTreatments);
            }}
            placeholder="URL del documento"
          />
        </View>
      ))}

      <Text style={styles.label}>Seguimientos:</Text>
      {followUps.map((followUp, index) => (
        <View key={`followUp-${index}`}>
          <Text style={styles.label}>Fecha de seguimiento:</Text>
          <TouchableOpacity style={styles.dateButton} onPress={() => {}}>
            <Text>
              {convertToDate(followUp.followUpDate).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={followUp.followUpNotes}
            onChangeText={(text) => {
              const newFollowUps = [...followUps];
              newFollowUps[index].followUpNotes = text;
              setFollowUps(newFollowUps);
            }}
            placeholder="Notas de seguimiento"
          />
        </View>
      ))}

      <Text style={styles.label}>Órdenes:</Text>
      {orders.map((order, index) => (
        <View key={`order-${index}`}>
          <Text style={styles.label}>Fecha de orden:</Text>
          <TouchableOpacity style={styles.dateButton} onPress={() => {}}>
            <Text>{convertToDate(order.ordersDate).toLocaleDateString()}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={order.urlDocOrders}
            onChangeText={(text) => {
              const newOrders = [...orders];
              newOrders[index].urlDocOrders = text;
              setOrders(newOrders);
            }}
            placeholder="URL de la orden"
          />
        </View>
      ))}

      <Button title="Guardar cambios" onPress={handleSave} />
    </View>
  );
};

export default HistorialEditar;
