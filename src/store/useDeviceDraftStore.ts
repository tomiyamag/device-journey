import { create } from "zustand";

import { DeviceInputDraft } from "@/types";

interface IDeviceDraftStore {
  draft: DeviceInputDraft | null;
  setDraft: (data: DeviceInputDraft) => void;
  clearDraft: () => void;
}

/**
 * デバイス登録に必要な初期値（検索結果を元に作成するデータ）を保持するストア
 *
 * @remarks
 * 検索結果画面から登録フォームへ遷移する際に Draft として保持する
 */
export const useDeviceDraftStore = create<IDeviceDraftStore>((set) => ({
  draft: null,
  setDraft: (data) => set({ draft: data }),
  clearDraft: () => set({ draft: null }),
}));
