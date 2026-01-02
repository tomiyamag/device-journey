import { create } from "zustand";

import { DeviceDraft } from "@/types";

interface Store {
  draft: DeviceDraft | null;
  setDraft: (data: DeviceDraft) => void;
}

export const useDeviceDraftStore = create<Store>((set) => ({
  draft: null,
  setDraft: (data) => set({ draft: data }),
}));
