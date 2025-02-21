export interface ChronicDiseaseInputProps {
  afiliadoId: number;
  newDisease: string;
  doctorEmail: string;
  medicalCenter: string;
  medication: string;
  dosage: string;
  onChangeDisease: (text: string) => void;
  onChangeDoctorEmail: (text: string) => void;
  onChangeMedicalCenter: (text: string) => void;
  onChangeMedication: (text: string) => void;
  onChangeDosage: (text: string) => void;
  onAddChronicDisease: () => void;
  chronicDiseases: Array<{
    disease: string;
    doctorEmail: string;
    medicalCenter: string;
    medication: string;
    dosage: string;
  }>;

  onUpdateChronicDisease: (
    index: number,
    updatedDisease: {
      disease: string;
      doctorEmail: string;
      medicalCenter: string;
      medication: string;
      dosage: string;
    }
  ) => void;
}
