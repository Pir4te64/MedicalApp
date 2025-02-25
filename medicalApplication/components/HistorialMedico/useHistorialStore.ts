import { create } from "zustand";

interface HistorialStore {
  date: Date;
  specialty: string;
  treatingPhysician: string;
  originalSymptoms: string[];
  diagnoses: string[];
  treatments: any[];
  followUps: any[];
  orders: any[];
  showDatePicker: boolean; // Nuevo estado
  setDate: (date: Date) => void;
  setSpecialty: (specialty: string) => void;
  setTreatingPhysician: (physician: string) => void;
  setOriginalSymptoms: (index: number, value: string) => void;
  setDiagnoses: (index: number, value: string) => void;
  setTreatments: (index: number, value: string) => void;
  setFollowUps: (index: number, value: string) => void;
  setOrders: (index: number, value: string) => void;
  setShowDatePicker: (show: boolean) => void; // Función para mostrar/ocultar el picker
}

export const useHistorialStore = create<HistorialStore>((set) => ({
  date: new Date(),
  specialty: "",
  treatingPhysician: "",
  originalSymptoms: [],
  diagnoses: [],
  treatments: [],
  followUps: [],
  orders: [],
  showDatePicker: false, // Inicializado en false
  setDate: (date) => set({ date }),
  setSpecialty: (specialty) => set({ specialty }),
  setTreatingPhysician: (physician) => set({ treatingPhysician: physician }),
  setOriginalSymptoms: (index, value) =>
    set((state) => {
      const symptoms = [...state.originalSymptoms];
      symptoms[index] = value;
      return { originalSymptoms: symptoms };
    }),
  setDiagnoses: (index, value) =>
    set((state) => {
      const diagnoses = [...state.diagnoses];
      diagnoses[index] = value;
      return { diagnoses };
    }),
  setTreatments: (index, value) =>
    set((state) => {
      const treatments = [...state.treatments];
      treatments[index].urlDocTreatment = value;
      return { treatments };
    }),
  setFollowUps: (index, value) =>
    set((state) => {
      const followUps = [...state.followUps];
      followUps[index].followUpNotes = value;
      return { followUps };
    }),
  setOrders: (index, value) =>
    set((state) => {
      const orders = [...state.orders];
      orders[index].urlDocOrders = value;
      return { orders };
    }),
  setShowDatePicker: (show) => set({ showDatePicker: show }), // Actualización del estado
}));
