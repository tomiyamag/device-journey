import { create } from "zustand";

import { DeviceInputDraft } from "@/types";

interface IDeviceDraftStore {
  draft: DeviceInputDraft | null;
  setDraft: (data: DeviceInputDraft) => void;
  clearDraft: () => void;
}

export const useDeviceDraftStore = create<IDeviceDraftStore>((set) => ({
  draft: null,
  setDraft: (data) => set({ draft: data }),
  clearDraft: () => set({ draft: null }),
}));
