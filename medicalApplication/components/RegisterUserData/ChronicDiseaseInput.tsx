import React from "react";
import { View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { styles } from "./InformacionStyles.styles";

interface ChronicDiseaseInputProps {
    newDisease: string;
    doctorEmail: string;
    medicalCenter: string;
    medication: string;
    dosage: string;
    onChangeDisease: (value: string) => void;
    onChangeDoctorEmail: (value: string) => void;
    onChangeMedicalCenter: (value: string) => void;
    onChangeMedication: (value: string) => void;
    onChangeDosage: (value: string) => void;
    onAddChronicDisease: () => void;
    chronicDiseases: {
        disease: string;
        doctorEmail: string;
        medicalCenter: string;
        medicalTreatmentUser: { medication: string; dosage: string }[];
    }[];
}

const ChronicDiseaseInput: React.FC<ChronicDiseaseInputProps> = ({
    newDisease,
    doctorEmail,
    medicalCenter,
    medication,
    dosage,
    onChangeDisease,
    onChangeDoctorEmail,
    onChangeMedicalCenter,
    onChangeMedication,
    onChangeDosage,
    onAddChronicDisease,
    chronicDiseases,
}) => {
    return (
        <View style={styles.allergyContainer}>
            <Text style={styles.subtitle}>Agregar Enfermedad Crónica</Text>
            <Input
                label="Enfermedad"
                placeholder="Ej: Diabetes"
                value={newDisease}
                onChangeText={onChangeDisease}
            />
            <Input
                label="Correo del Doctor"
                placeholder="Ej: doctor@email.com"
                value={doctorEmail}
                onChangeText={onChangeDoctorEmail}
            />
            <Input
                label="Centro Médico"
                placeholder="Ej: Hospital Central"
                value={medicalCenter}
                onChangeText={onChangeMedicalCenter}
            />
            <Input
                label="Medicamento"
                placeholder="Ej: Insulina"
                value={medication}
                onChangeText={onChangeMedication}
            />
            <Input
                label="Dosis"
                placeholder="Ej: 10mg"
                value={dosage}
                onChangeText={onChangeDosage}
            />
            <Button title="Agregar Enfermedad" onPress={onAddChronicDisease} />

            {chronicDiseases.map((item, index) => (
                <View key={index} style={styles.diseaseContainer}>
                    <Text style={styles.allergyText}>Enfermedad: {item.disease}</Text>
                    <Text style={styles.allergyText}>Doctor: {item.doctorEmail}</Text>
                    <Text style={styles.allergyText}>Centro Médico: {item.medicalCenter}</Text>
                    <Text style={styles.allergyText}>
                        Medicamento: {item.medicalTreatmentUser[0].medication}
                    </Text>
                    <Text style={styles.allergyText}>Dosis: {item.medicalTreatmentUser[0].dosage}</Text>
                </View>
            ))}
        </View>
    );
};

export default ChronicDiseaseInput;
