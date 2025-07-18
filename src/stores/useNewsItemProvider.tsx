import { create } from "zustand"
import type { NewsStoreType } from "../types/NewsStoreType"
export const useNewsItemProvider = create<NewsStoreType>((set)=>({
newsItem:{
 url: "",
  title: "",
  body: "",
  date:"",
},
setNewsItem:(newsItem) => set({ newsItem: newsItem })
}))


