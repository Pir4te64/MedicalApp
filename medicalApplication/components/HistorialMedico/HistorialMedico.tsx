import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, Alert, ActivityIndicator } from "react-native";
import { useHistorialMedicoStore } from "./useHistorialMedicoStore";
import { HistorialData, postHistorialData } from "./HistorialPOST";
import { getHistorialData } from "./GetUserData";
import { getHistorialByUser } from "./getHistorialByUser";
import FormFields from "./HistorialCrear";
import { styles } from "./HistorialStyles";
import HistorialEditar from "./HistorialEditar";
import { Historial } from "./HistorialInterface";
import { deleteHistorial } from "./HistorialEliminar";
import { Button } from "react-native-elements";
interface Props {
  afiliado: { id: string };
}
const HistorialMedicoForm: React.FC<Props> = ({ afiliado }) => {
  const {
    date,
    specialty,
    treatingPhysician,
    originalSymptoms,
    diagnoses,
    treatments,
    followUps,
    orders,
    showDatePicker,
    showTreatmentPicker,
    showFollowUpPicker,
    showOrderPicker,
    setDate,
    setSpecialty,
    setTreatingPhysician,
    setOriginalSymptoms,
    setDiagnoses,
    setTreatments,
    setFollowUps,
    setOrders,
    setShowDatePicker,
    setShowTreatmentPicker,
    setShowFollowUpPicker,
    setShowOrderPicker,
    resetForm,
  } = useHistorialMedicoStore();
  const [userDataId, setUserDataId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [historial, setHistorial] = useState<Historial[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getHistorialData(afiliado.id);

      if (data && data.success) {
        setUserDataId(data.body.userDataId);
      }
    };

    fetchData();
  }, [afiliado.id]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getHistorialByUser(userDataId);

      if (data && data.success) {
        setHistorial(data);
      }
    };

    fetchData();
    if (userDataId) {
      handleObtenerDatos();
    }
  }, [userDataId]);
  const handleObtenerDatos = async () => {
    if (userDataId) {
      setLoading(true);
      const data = await getHistorialByUser(userDataId);
      if (data) {
        setHistorial(data);
      }
      setLoading(false);
    }
  };
  const handleSubmit = async () => {
    if (!userDataId) {
      console.error(
        "userDataId no está definido. No se puede enviar el historial."
      );
      return;
    }

    const historialData: HistorialData = {
      userDataId,
      date,
      specialty,
      treatingPhysician,
      originalSymptoms,
      diagnoses,
      treatments,
      followUps,
      orders,
    };
    setShowForm(false);
    await postHistorialData(historialData);
    await handleObtenerDatos();
    resetForm();
  };
  const eliminarFormulario = async (id: string) => {
    try {
      console.log("eliminando");
      const result = await deleteHistorial(historial[0].id);
      console.log("Historial eliminado:", result);
      Alert.alert("Eliminado", "El historial se ha eliminado correctamente.");
      await handleObtenerDatos();
    } catch (error) {
      console.error("Error al eliminar el historial:", error);
      Alert.alert(
        "Error",
        "Hubo un problema al eliminar el historial. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        {showForm && (
          <>
            <FormFields
              showForm={showForm}
              date={date}
              setShowDatePicker={setShowDatePicker}
              showDatePicker={showDatePicker}
              setDate={setDate}
              specialty={specialty}
              setSpecialty={setSpecialty}
              treatingPhysician={treatingPhysician}
              setTreatingPhysician={setTreatingPhysician}
              originalSymptoms={originalSymptoms}
              setOriginalSymptoms={setOriginalSymptoms}
              diagnoses={diagnoses}
              setDiagnoses={setDiagnoses}
              treatments={treatments}
              setTreatments={setTreatments}
              showTreatmentPicker={showTreatmentPicker}
              setShowTreatmentPicker={setShowTreatmentPicker}
              followUps={followUps}
              setFollowUps={setFollowUps}
              showFollowUpPicker={showFollowUpPicker}
              setShowFollowUpPicker={setShowFollowUpPicker}
              orders={orders}
              setOrders={setOrders}
              showOrderPicker={showOrderPicker}
              setShowOrderPicker={setShowOrderPicker}
              handleSubmit={handleSubmit}
            />
          </>
        )}
        <Button
          title={
            showForm ? "Ocultar formulario" : "Crear nuevo historial médico"
          }
          onPress={() => setShowForm(!showForm)}
          buttonStyle={{
            backgroundColor: showForm ? "#FF5733" : "#007BFF", // Color para cuando está visible y oculto
          }}
          containerStyle={{
            width: "90%",
            alignSelf: "center",
            marginBottom: 10,
          }}
        />

        <View>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : historial && historial.length > 0 ? (
            historial.map((historial, index) => (
              <HistorialEditar
                key={index}
                historial={historial}
                handleDelete={eliminarFormulario}
              />
            ))
          ) : (
            <Text>No tiene historial médico</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default HistorialMedicoForm;
