import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import getInfo from "./Detalles.GetInfo";

interface AfiliadoInfoProps {
  id: number; // Recibe el id como prop
}

const AfiliadoInfo: React.FC<AfiliadoInfoProps> = ({ id }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getInfo(id.toString()); // Asegúrate de pasar el id como string
      if (result && result.success && result.data) {
        setData(result.data.body); // Usamos result.data.body en lugar de result.body
      }
      setLoading(false);
    };

    fetchData();
  }, [id]); // Dependencia del id para realizar la solicitud cuando cambia

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  if (!data) {
    return <Text>No se encontró información.</Text>;
  }

  return (
    <View>
      <Text>Nombre: {data.nombre}</Text>
      <Text>ID: {data.userId}</Text>
      <Text>Fecha de nacimiento: {data.birthDate.join("/")}</Text>
      <Text>Peso: {data.weight}</Text>
      <Text>Altura: {data.height}</Text>
      <Text>Tipo de sangre: {data.bloodType}</Text>

      <Text>Alérgenos:</Text>
      {data.medicationAllergyUsers.map((allergy: any, index: number) => (
        <Text key={index}>{allergy.allergy}</Text>
      ))}

      <Text>Otras alergias:</Text>
      {data.otherAllergiesUsers.map((allergy: any, index: number) => (
        <Text key={index}>{allergy.allergy}</Text>
      ))}

      <Text>Enfermedades crónicas:</Text>
      {data.chronicDiseasesUsers.map((disease: any, index: number) => (
        <View key={index}>
          <Text>{disease.disease}</Text>
          <Text>Correo del doctor: {disease.doctorEmail}</Text>
          <Text>Centro médico: {disease.medicalCenter}</Text>
          {disease.medicalTreatmentUser.map((treatment: any, idx: number) => (
            <View key={idx}>
              <Text>Medicamento: {treatment.medication}</Text>
              <Text>Dosis: {treatment.dosage}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default AfiliadoInfo;
