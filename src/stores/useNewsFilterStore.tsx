import { create } from "zustand";
import type { NewsStoreType } from "../types/NewsStoreType";

export const useNewsFilterStore = create<NewsStoreType>((set) => ({
  query: "",
  date: "",
  setQuery: (q) => set({ query: q }),
  setDate: (d) => set({ date: d }),
}));
