import { create } from "zustand";

import { DeviceDraft } from "@/types";

interface IDeviceDraftStore {
  draft: DeviceDraft | null;
  setDraft: (data: DeviceDraft) => void;
  clearDraft: () => void;
}

export const useDeviceDraftStore = create<IDeviceDraftStore>((set) => ({
  draft: null,
  setDraft: (data) => set({ draft: data }),
  clearDraft: () => set({ draft: null }),
}));
