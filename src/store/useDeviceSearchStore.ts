import { create } from "zustand";

interface IDeviceSearchStore {
  query: string;
  setQuery: (query: string) => void;
  selectedDeviceId: number | null;
  setSelectedDeviceId: (id: number | null) => void;
  clearSearch: () => void;
}

export const useDeviceSearchStore = create<IDeviceSearchStore>((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
  selectedDeviceId: null,
  setSelectedDeviceId: (id) => set({ selectedDeviceId: id }),
  clearSearch: () =>
    set({
      query: "",
      selectedDeviceId: null,
    }),
}));
