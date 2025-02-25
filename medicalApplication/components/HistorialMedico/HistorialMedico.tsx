import React, { useEffect, useState } from "react";
import { View, Button, ScrollView, Text } from "react-native";
import { useHistorialMedicoStore } from "./useHistorialMedicoStore";
import { HistorialData, postHistorialData } from "./HistorialPOST";
import { getHistorialData, HistorialGETResponse } from "./GetUserData";
import { getHistorialByUser } from "./getHistorialByUser";
import FormFields from "./HistorialCrear";
import { styles } from "./HistorialStyles";
import HistorialEditar from "./HistorialEditar";
import { Historial } from "./HistorialInterface";
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
  } = useHistorialMedicoStore();
  const [userDataId, setUserDataId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [historial, setHistorial] = useState<Historial[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHistorialData(afiliado.id);

      if (data && data.success) {
        setUserDataId(data.body.userDataId);
      }
    };

    fetchData();
  }, [afiliado.id]);
  const handleObtenerDatos = async () => {
    if (userDataId) {
      const data = await getHistorialByUser(userDataId);

      if (data) {
        setHistorial(data);
      }
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

    await postHistorialData(historialData);
  };
  useEffect(() => {
    console.log(JSON.stringify(historial, null, 2));
  }, [historial]);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Button
          title="Obtener datos médicos"
          onPress={handleObtenerDatos}
          disabled={!userDataId} // Deshabilitar si userDataId es null
        />

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
        />
        <View>
          {historial &&
            historial.map((historial, index) => (
              <HistorialEditar key={index} historial={historial} />
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default HistorialMedicoForm;
