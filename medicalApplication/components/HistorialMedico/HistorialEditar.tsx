import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./HistorialStyles"; // Asegúrate de tener estilos definidos
import { HistorialPUT } from "./HistorialPUT";

interface Historial {
  id: string;
  date: string;
  specialty: string;
  treatingPhysician: string;
  originalSymptoms: string[];
  diagnoses: string[];
  treatments: {
    treatmentDate: string; // ✅ Solo una fecha en formato string
    urlDocTreatment: string;
  }[];
  followUps: {
    followUpDate: string; // ✅ Solo una fecha en formato string
    followUpNotes: string;
  }[];
  orders: {
    ordersDate: string; // ✅ Solo una fecha en formato string
    urlDocOrders: string;
  }[];
  userDataId: string;
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

  // Estados para las fechas seleccionadas
  const [selectedIndex, setSelectedIndex] = useState<{
    type: string;
    index: number;
  } | null>(null);
  const [tempDate, setTempDate] = useState<Date | null>(null);

  const convertToDate = (date: string | number[]) => {
    if (typeof date === "string") {
      return new Date(date); // ✅ Convertir string "YYYY-MM-DD" a Date
    } else if (Array.isArray(date) && date.length === 3) {
      return new Date(date[0], date[1] - 1, date[2]); // Si aún hay arrays en los datos
    }
    return new Date(); // Valor por defecto en caso de error
  };

  const handleDateChange = (event: any, selectedDate?: Date | undefined) => {
    if (selectedDate && selectedIndex) {
      const { type, index } = selectedIndex;
      const formattedDate = selectedDate.toISOString().split("T")[0]; // "YYYY-MM-DD"

      if (type === "treatment") {
        const updatedTreatments = [...treatments];
        updatedTreatments[index].treatmentDate = formattedDate; // ✅ String en formato correcto
        setTreatments(updatedTreatments);
      } else if (type === "followUp") {
        const updatedFollowUps = [...followUps];
        updatedFollowUps[index].followUpDate = formattedDate; // ✅ String en formato correcto
        setFollowUps(updatedFollowUps);
      } else if (type === "order") {
        const updatedOrders = [...orders];
        updatedOrders[index].ordersDate = formattedDate; // ✅ String en formato correcto
        setOrders(updatedOrders);
      }
    }
    setTempDate(null);
    setSelectedIndex(null);
  };

  const handleSubmit = async () => {
    const updatedHistorial = {
      id: historial.id,
      userDataId: historial.userDataId,
      date: date.toISOString().split("T")[0], // Formato YYYY-MM-DD
      specialty,
      treatingPhysician,
      originalSymptoms,
      diagnoses,
      treatments: treatments.map((t) => {
        const validDate = new Date(t.treatmentDate);
        const treatmentDate =
          validDate instanceof Date && !isNaN(validDate.getTime())
            ? validDate.toISOString().split("T")[0]
            : ""; // Valor vacío si la fecha no es válida

        return {
          treatmentDate,
          urlDocTreatment: t.urlDocTreatment,
        };
      }),
      followUps: followUps.map((f) => {
        const validDate = new Date(f.followUpDate);
        const followUpDate =
          validDate instanceof Date && !isNaN(validDate.getTime())
            ? validDate.toISOString().split("T")[0]
            : ""; // Valor vacío si la fecha no es válida

        return {
          followUpDate,
          followUpNotes: f.followUpNotes,
        };
      }),
      orders: orders.map((o) => {
        const validDate = new Date(o.ordersDate);
        const ordersDate =
          validDate instanceof Date && !isNaN(validDate.getTime())
            ? validDate.toISOString().split("T")[0]
            : ""; // Valor vacío si la fecha no es válida

        return {
          ordersDate,
          urlDocOrders: o.urlDocOrders,
        };
      }),
    };

    try {
      // Llamada a la función HistorialPUT para enviar el objeto
      const response = await HistorialPUT(updatedHistorial);
      console.log("Respuesta del servidor:", response);
    } catch (error) {
      console.error("Error al actualizar el historial:", error);
    }
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
        placeholder="Especialidad"
      />

      <Text style={styles.label}>Médico tratante:</Text>
      <TextInput
        style={styles.input}
        value={treatingPhysician}
        onChangeText={setTreatingPhysician}
        placeholder="Médico tratante"
      />

      <Text style={styles.label}>Síntomas originales:</Text>
      {originalSymptoms.map((symptom, index) => (
        <TextInput
          key={index}
          style={styles.input}
          value={symptom}
          onChangeText={(text) => {
            const newSymptoms = [...originalSymptoms];
            newSymptoms[index] = text;
            setOriginalSymptoms(newSymptoms);
          }}
          placeholder="Síntoma"
        />
      ))}

      <Text style={styles.label}>Diagnósticos:</Text>
      {diagnoses.map((diagnosis, index) => (
        <TextInput
          key={index}
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
        <View key={index}>
          <Text style={styles.label}>Fecha de tratamiento:</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => {
              setSelectedIndex({ type: "treatment", index });
              setTempDate(convertToDate(treatment.treatmentDate));
            }}
          >
            <Text>
              {convertToDate(treatment.treatmentDate).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.label}>Seguimientos:</Text>
      {followUps.map((followUp, index) => (
        <View key={index}>
          <Text style={styles.label}>Fecha de seguimiento:</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => {
              setSelectedIndex({ type: "followUp", index });
              setTempDate(convertToDate(followUp.followUpDate));
            }}
          >
            <Text>
              {convertToDate(followUp.followUpDate).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.label}>Órdenes:</Text>
      {orders.map((order, index) => (
        <View key={index}>
          <Text style={styles.label}>Fecha de orden:</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => {
              setSelectedIndex({ type: "order", index });
              setTempDate(convertToDate(order.ordersDate));
            }}
          >
            <Text>{convertToDate(order.ordersDate).toLocaleDateString()}</Text>
          </TouchableOpacity>
        </View>
      ))}

      {tempDate && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Button title="Guardar cambios" onPress={handleSubmit} />
    </View>
  );
};

export default HistorialEditar;
