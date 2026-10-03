import { create } from "zustand";

export type Report = {
  id: string;
  status: "ON" | "OFF";
  timestamp: number;
  area: string;
  lat: number;
  lng: number;
  uid: string;
  pending?: boolean;
};

type Store = {
  reports: Report[];
  selectedArea: string;
  demoMode: boolean;
  setReports: (reports: Report[]) => void;
  addReport: (report: Report) => void;
  setSelectedArea: (area: string) => void;
  setDemoMode: (v: boolean) => void;
};

export const useStore = create<Store>((set) => ({
  reports: [],
  selectedArea: "Vehari City",
  demoMode: false,
  setReports: (reports) => set({ reports }),
  addReport: (report) => set((s) => ({ reports: [report, ...s.reports].slice(0, 200) })),
  setSelectedArea: (selectedArea) => set({ selectedArea }),
  setDemoMode: (demoMode) => set({ demoMode })
}));
