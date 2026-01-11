import { create } from "zustand";

import { DeviceInputDraft } from "@/types";

interface IDeviceDraftStore {
  draft: DeviceInputDraft | null;
  setDraft: (data: DeviceInputDraft) => void;
  clearDraft: () => void;
}

/**
 * デバイス新規追加時に必要な初期値（検索結果を元に作成したデータ）を保持するストア
 */
export const useDeviceDraftStore = create<IDeviceDraftStore>((set) => ({
  draft: null,
  setDraft: (data) => set({ draft: data }),
  clearDraft: () => set({ draft: null }),
}));
