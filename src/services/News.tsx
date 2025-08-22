import type { FetchPaginatedParamsType } from "../types/FetchNewsParamsType";
import type { NewsItemType } from "../types/NewsItemType";
import type { PaginatedResponse } from "../types/PaginatedResponse";
import axiosInstance from "./axiosInstance"; // <-- import your instance
import { isAxiosError } from "axios";
export const cleanFilters = (filters: Record<string, any>) => {
  const cleaned: Record<string, any> = {};
  Object.keys(filters).forEach((key) => {
    if (
      filters[key] !== "" &&
      filters[key] !== undefined &&
      filters[key] !== null
    ) {
      cleaned[key] = filters[key];
    }
  });
  return cleaned;
};

export const fetchedNews = async (
  params: FetchPaginatedParamsType
): Promise<PaginatedResponse<NewsItemType>> => {
  try {
    const res = await axiosInstance.get("/News/get_visible_news", {
      params: cleanFilters(params),
    });
    return res.data;
  } catch (err) {
    console.error("fetchServices error:", err);

    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};

export const allFetchedNews = async (
  params: FetchPaginatedParamsType
): Promise<PaginatedResponse<NewsItemType>> => {
  try {
    const res = await axiosInstance.get("/News/get_all_news", {
      params: cleanFilters(params),
    });
    return res.data;
  } catch (err) {
    console.error("fetchServices error:", err);

    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};

export const createNewsItem = async (formData: FormData): Promise<any> => {
  try {
    const res = await axiosInstance.post("/News/create_news", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // needed for file upload
      },
    });
    return res.data;
  } catch (err) {
    console.error(" error:", err);

    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};

export const getNewsItem = async (slug: string): Promise<NewsItemType> => {
  try {
    const res = await axiosInstance.get("/News", {
      params: { slug },
    });

    return res.data;
  } catch (err) {
    console.error("fetchNewsItem error:", err);

    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};

export const getNewsItemByAdmin = async (
  slug: string
): Promise<NewsItemType> => {
  try {
    const res = await axiosInstance.get("/News/get-newsItem-by-admin", {
      params: { slug },
    });

    return res.data;
  } catch (err) {
    console.error("fetchNewsItem error:", err);

    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};
export const deleteNewsItem = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/News/delete_newsItem/`, {
      params: { id },
    });
    return res.data;
  } catch (err) {
    console.error("fetchNewsItem error:", err);

    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};
export const updateNewsItem = async(id:string , visibility:number) : Promise<void> =>{
 try{
   const res = await axiosInstance.put("/News/update_newsItem", {visibility:visibility} ,{params:{id}});
   return res.data;
 }catch (err) {
    console.error("updateNewsItem error:", err);

    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }

}