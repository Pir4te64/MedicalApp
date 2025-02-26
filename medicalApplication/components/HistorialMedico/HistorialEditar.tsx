import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./HistorialStyles"; // Asegúrate de tener estilos definidos
import { HistorialPUT } from "./HistorialPUT";
import { HistorialEditarInterface } from "./HistorialInterface";
import ListField from "./InputsEditar/ListInput";

interface HistorialEditarProps {
  historial: HistorialEditarInterface;
}

const HistorialEditar: React.FC<HistorialEditarProps> = ({
  historial,
  handleDelete,
}) => {
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
        const validDate = convertToDate(t.treatmentDate);
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
        const validDate = convertToDate(f.followUpDate);
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
        const validDate = convertToDate(o.ordersDate);
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
      await HistorialPUT(updatedHistorial);

      Alert.alert(
        "Actualización exitosa",
        "El historial se ha actualizado correctamente."
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Hubo un problema al actualizar el historial. Por favor, inténtalo de nuevo."
      );
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

      <ListField
        label="Síntomas originales"
        items={originalSymptoms}
        setItems={(index, value) => {
          const updatedSymptoms = [...originalSymptoms];
          updatedSymptoms[index] = value;
          setOriginalSymptoms(updatedSymptoms);
        }}
        addItem={() => setOriginalSymptoms([...originalSymptoms, ""])}
        removeItem={(index) => {
          const updatedSymptoms = originalSymptoms.filter(
            (_, i) => i !== index
          );
          setOriginalSymptoms(updatedSymptoms);
        }}
        placeholder="Síntoma"
      />

      <ListField
        label="Diagnósticos"
        items={diagnoses}
        setItems={(index, value) => {
          const updatedDiagnoses = [...diagnoses];
          updatedDiagnoses[index] = value;
          setDiagnoses(updatedDiagnoses);
        }}
        addItem={() => setDiagnoses([...diagnoses, ""])}
        removeItem={(index) => {
          const updatedDiagnoses = diagnoses.filter((_, i) => i !== index);
          setDiagnoses(updatedDiagnoses);
        }}
        placeholder="Diagnóstico"
      />

      <Text style={styles.label}>Tratamientos:</Text>
      {treatments.map((treatment, index) => (
        <View key={`treatment-${index}`} style={{ marginBottom: 12 }}>
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
          <Text style={styles.label}>Documento de tratamiento:</Text>
          <TextInput
            style={styles.input}
            value={treatment.urlDocTreatment}
            onChangeText={(text) => {
              const updatedTreatments = [...treatments];
              updatedTreatments[index].urlDocTreatment = text;
              setTreatments(updatedTreatments);
            }}
            placeholder="URL del documento de tratamiento"
          />
          <TouchableOpacity
            onPress={() => {
              const updatedTreatments = treatments.filter(
                (_, i) => i !== index
              );
              setTreatments(updatedTreatments);
            }}
            style={{ marginTop: 4 }}
          >
            <Text style={{ color: "red" }}>Eliminar tratamiento</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        onPress={() => {
          setTreatments([
            ...treatments,
            {
              treatmentDate: new Date().toISOString().split("T")[0],
              urlDocTreatment: "",
            },
          ]);
        }}
        style={{ marginTop: 8 }}
      >
        <Text style={{ color: "blue" }}>Agregar tratamiento</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Seguimientos:</Text>
      {followUps.map((followUp, index) => (
        <View key={`followUp-${index}`} style={{ marginBottom: 12 }}>
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
          <Text style={styles.label}>Notas de seguimiento:</Text>
          <TextInput
            style={styles.input}
            value={followUp.followUpNotes}
            onChangeText={(text) => {
              const updatedFollowUps = [...followUps];
              updatedFollowUps[index].followUpNotes = text;
              setFollowUps(updatedFollowUps);
            }}
            placeholder="Notas de seguimiento"
          />
          <TouchableOpacity
            onPress={() => {
              const updatedFollowUps = followUps.filter((_, i) => i !== index);
              setFollowUps(updatedFollowUps);
            }}
            style={{ marginTop: 4 }}
          >
            <Text style={{ color: "red" }}>Eliminar seguimiento</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        onPress={() => {
          setFollowUps([
            ...followUps,
            {
              followUpDate: new Date().toISOString().split("T")[0],
              followUpNotes: "",
            },
          ]);
        }}
        style={{ marginTop: 8 }}
      >
        <Text style={{ color: "blue" }}>Agregar seguimiento</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Órdenes:</Text>
      {orders.map((order, index) => (
        <View key={`order-${index}`} style={{ marginBottom: 12 }}>
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
          <Text style={styles.label}>Documento de orden:</Text>
          <TextInput
            style={styles.input}
            value={order.urlDocOrders}
            onChangeText={(text) => {
              const updatedOrders = [...orders];
              updatedOrders[index].urlDocOrders = text;
              setOrders(updatedOrders);
            }}
            placeholder="URL del documento de orden"
          />
          <TouchableOpacity
            onPress={() => {
              const updatedOrders = orders.filter((_, i) => i !== index);
              setOrders(updatedOrders);
            }}
            style={{ marginTop: 4 }}
          >
            <Text style={{ color: "red" }}>Eliminar orden</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        onPress={() => {
          setOrders([
            ...orders,
            {
              ordersDate: new Date().toISOString().split("T")[0],
              urlDocOrders: "",
            },
          ]);
        }}
        style={{ marginTop: 8 }}
      >
        <Text style={{ color: "blue" }}>Agregar orden</Text>
      </TouchableOpacity>

      {tempDate && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Button title="Guardar cambios" onPress={handleSubmit} />
      <Button title="Eliminar" onPress={handleDelete} />
    </View>
  );
};

export default HistorialEditar;
