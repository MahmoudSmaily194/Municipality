import axiosInstance from "./axiosInstance"; // your configured axios instance
import { isAxiosError } from "axios";
import type { EventType } from "../types/EventType";
import type { FetchPaginatedParamsType } from "../types/FetchNewsParamsType";
import type { PaginatedResponse } from "../types/PaginatedResponse";
import { cleanFilters } from "./News";

export const fetchedEvents = async (
  params: FetchPaginatedParamsType
): Promise<PaginatedResponse<EventType>> => {
  try {
    const res = await axiosInstance.get("/Event/get_all_events", {
      params: cleanFilters(params),
    });
    console.log("fetched events", res.data);
    return res.data;
  } catch (err) {
    console.error("fetchEvents error:", err);
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};

export const createEvent = async (formData: FormData): Promise<any> => {
  try {
    const res = await axiosInstance.post("/Event/create_event", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // for file upload
      },
      withCredentials: true, // ensure cookies are sent
    });
    return res.data;
  } catch (err) {
    console.error("createEvent error:", err);
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};

export const getEvent = async (slug: string): Promise<EventType> => {
  try {
    const res = await axiosInstance.get("/Event/get_event", {
      params: { slug },
    });
    return res.data;
  } catch (err) {
    console.error("getEvent error:", err);
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const res = await axiosInstance.delete("/Event/delete_event", {
      params: { id },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("deleteEvent error:", err);
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};
