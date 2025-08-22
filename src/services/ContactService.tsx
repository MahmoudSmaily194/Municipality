import type { ContactFormType } from "../types/ContactFormType";
import axiosInstance from "./axiosInstance";

export const SendEmail = async (body: ContactFormType): Promise<void> => {
  try {
    // Send the form data as is (or adjust keys if needed by your backend)
    await axiosInstance.post("/SendEmail", body);
  } catch (error) {
    console.error(error);
    throw error; // Important: rethrow to let React Query handle errors
  }
};
