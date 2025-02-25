// HistorialPOST.ts

export interface HistorialData {
  userDataId: string;
  date: Date;
  specialty: string;
  treatingPhysician: string;
  originalSymptoms: string[];
  diagnoses: string[];
  treatments: {
    treatmentDate: Date;
    urlDocTreatment: string;
  }[];
  followUps: {
    followUpDate: Date;
    followUpNotes: string;
  }[];
  orders: {
    ordersDate: Date;
    urlDocOrders: string;
  }[];
}

export interface HistorialPOSTData {
  userDataId: string;
  date: string;
  specialty: string;
  treatingPhysician: string;
  originalSymptoms: string[];
  diagnoses: string[];
  treatments: {
    treatmentDate: string;
    urlDocTreatment: string;
  }[];
  followUps: {
    followUpDate: string;
    followUpNotes: string;
  }[];
  orders: {
    ordersDate: string;
    urlDocOrders: string;
  }[];
}

const formatDate = (date: Date) => date.toISOString().split("T")[0];

export const createHistorialPOSTData = (
  data: HistorialData
): HistorialPOSTData => {
  return {
    userDataId: data.userDataId,
    date: formatDate(data.date),
    specialty: data.specialty,
    treatingPhysician: data.treatingPhysician,
    originalSymptoms: data.originalSymptoms,
    diagnoses: data.diagnoses,
    treatments: data.treatments.map((t) => ({
      treatmentDate: formatDate(t.treatmentDate),
      urlDocTreatment: t.urlDocTreatment,
    })),
    followUps: data.followUps.map((f) => ({
      followUpDate: formatDate(f.followUpDate),
      followUpNotes: f.followUpNotes,
    })),
    orders: data.orders.map((o) => ({
      ordersDate: formatDate(o.ordersDate),
      urlDocOrders: o.urlDocOrders,
    })),
  };
};
