import { create } from "zustand";

interface IDeviceSearchStore {
  query: string;
  setQuery: (query: string) => void;
  selectedDeviceId: number | null;
  setSelectedDeviceId: (id: number | null) => void;
  clearSearch: () => void;
}

/**
 * デバイス追加画面での入力状態および結果から選択したデバイス id を保持するストア
 *
 * @remarks
 * クエリ（入力内容）とサジェストから選択したデバイスの id を保持する（検索結果は非同期処理のため TanStack Query で状態管理）
 */
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
