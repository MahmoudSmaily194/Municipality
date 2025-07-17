
import { create } from "zustand";
import type { ServiceStoreType } from "../types/ServiceStoreType";

export const useServiceFilterStore =create<ServiceStoreType>((set)=>({
    query:"",
    category:"",
   setQuery: (q) => set({ query: q }),
 setCategory: (c) => set({ category: c }),
}))
