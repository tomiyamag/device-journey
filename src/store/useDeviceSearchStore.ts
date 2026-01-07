import { create } from "zustand";

interface IDeviceSearchStore {
  query: string;
  setQuery: (query: string) => void;
  selectedDeviceId: number | null;
  setSelectedDeviceId: (id: number | null) => void;
  clearSearch: () => void;
}

/**
 * デバイス追加画面（検索）での入力状態を保持するストア
 *
 * @remarks
 * 検索中の離脱や登録フォームから戻った場合に備えて入力内容を保持する（検索結果は非同期処理のため TanStack Query で状態管理）
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
