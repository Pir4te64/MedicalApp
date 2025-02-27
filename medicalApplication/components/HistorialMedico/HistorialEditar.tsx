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
import { InputField } from "./InputsEditar/InputField";
import { Ionicons } from "@expo/vector-icons";

interface HistorialEditarProps {
  historial: HistorialEditarInterface;
}

const HistorialEditar: React.FC<HistorialEditarProps> = ({
  historial,
  handleDelete,
}) => {
  const initialDate = new Date(historial.date);

  const [date, setDate] = useState<Date>(initialDate);
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
  const [showDetails, setShowDetails] = useState(false);
  const [showSimtDiag, setSimtDiag] = useState(false);
  const [showMasdatos, setMasDatos] = useState(false);
  const convertToDate = (date: string | number[]) => {
    if (typeof date === "string") {
      return new Date(date); // ✅ Convertir string "YYYY-MM-DD" a Date
    } else if (Array.isArray(date) && date.length === 3) {
      return new Date(date[0], date[1] - 1, date[2]); // Si aún hay arrays en los datos
    }
    return new Date(); // Valor por defecto en caso de error
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
      <TouchableOpacity
        style={{
          backgroundColor: "#007BFF",
          padding: 10,
          borderRadius: 8,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onPress={() => setShowDetails(!showDetails)}
      >
        <Text style={{ color: "white", marginRight: 10, fontSize: 16 }}>
          Datos
        </Text>
        <Ionicons
          name={showDetails ? "chevron-up-outline" : "chevron-down-outline"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
      {showDetails && (
        <>
          <Text style={styles.label}>Fecha:</Text>
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              if (selectedDate) setDate(selectedDate);
            }}
          />

          <InputField
            label="Especialidad"
            value={specialty}
            onChangeText={setSpecialty}
            placeholder="Especialidad"
          />

          <InputField
            label="Médico tratante"
            value={treatingPhysician}
            onChangeText={setTreatingPhysician}
            placeholder="Médico tratante"
          />
        </>
      )}
      <TouchableOpacity
        style={{
          backgroundColor: "#007BFF",
          padding: 10,
          borderRadius: 8,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onPress={() => setSimtDiag(!showSimtDiag)}
      >
        <Text style={{ color: "white", marginRight: 10, fontSize: 16 }}>
          Detalles
        </Text>
        <Ionicons
          name={showSimtDiag ? "chevron-up-outline" : "chevron-down-outline"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
      {showSimtDiag && (
        <>
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
        </>
      )}
      <TouchableOpacity
        style={{
          backgroundColor: "#007BFF",
          padding: 10,
          borderRadius: 8,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onPress={() => setMasDatos(!showMasdatos)}
      >
        <Text style={{ color: "white", marginRight: 10, fontSize: 16 }}>
          Mas detalles
        </Text>
        <Ionicons
          name={showMasdatos ? "chevron-up-outline" : "chevron-down-outline"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
      {showMasdatos && (
        <>
          <Text style={styles.label}>Tratamientos:</Text>
          {treatments.map((treatment, index) => (
            <View key={`treatment-${index}`} style={{ marginBottom: 12 }}>
              <Text style={styles.label}>Fecha de tratamiento:</Text>
              <DateTimePicker
                value={convertToDate(treatment.treatmentDate)}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  if (date) {
                    const updatedTreatments = [...treatments];
                    updatedTreatments[index].treatmentDate = date.toISOString();
                    setTreatments(updatedTreatments);
                  }
                }}
              />

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

          {/* Botón para agregar tratamiento */}
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
              <DateTimePicker
                value={convertToDate(followUp.followUpDate)}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  if (date) {
                    const updatedFollowUps = [...followUps];
                    updatedFollowUps[index].followUpDate = date.toISOString();
                    setFollowUps(updatedFollowUps);
                  }
                }}
              />

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
                  const updatedFollowUps = followUps.filter(
                    (_, i) => i !== index
                  );
                  setFollowUps(updatedFollowUps);
                }}
                style={{ marginTop: 4 }}
              >
                <Text style={{ color: "red" }}>Eliminar seguimiento</Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* Botón para agregar seguimiento */}
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
        </>
      )}

      <Button title="Guardar cambios" onPress={handleSubmit} />
      <Button title="Eliminar" onPress={handleDelete} />
    </View>
  );
};

export default HistorialEditar;
