export interface FormFieldsProps {
  showForm: boolean;
  date: Date;
  setShowDatePicker: (show: boolean) => void;
  showDatePicker: boolean;
  setDate: (date: Date) => void;
  specialty: string;
  setSpecialty: (specialty: string) => void;
  treatingPhysician: string;
  setTreatingPhysician: (physician: string) => void;
  originalSymptoms: string[];
  setOriginalSymptoms: (index: number, symptom: string) => void;
  diagnoses: string[];
  setDiagnoses: (index: number, diagnosis: string) => void;
  treatments: { treatmentDate: Date; urlDocTreatment: string }[];
  setTreatments: (index: number, field: string, value: any) => void;
  showTreatmentPicker: number | null;
  setShowTreatmentPicker: (index: number | null) => void;
  followUps: { followUpDate: Date; followUpNotes: string }[];
  setFollowUps: (index: number, field: string, value: any) => void;
  showFollowUpPicker: number | null;
  setShowFollowUpPicker: (index: number | null) => void;
  orders: { ordersDate: Date; urlDocOrders: string }[];
  setOrders: (index: number, field: string, value: any) => void;
  showOrderPicker: number | null;
  setShowOrderPicker: (index: number | null) => void;
  handleSubmit: () => void;
}
