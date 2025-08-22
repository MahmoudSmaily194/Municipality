import axiosInstance from "./axiosInstance"; // your preconfigured axios instance
import { isAxiosError } from "axios";
import type { Service, UpdateServicePayload } from "../types/Service";
import type { FetchPaginatedParamsType } from "../types/FetchNewsParamsType";
import { cleanFilters } from "./News";
import type { PaginatedResponse } from "../types/PaginatedResponse";
import type { ServiceCategoryType } from "../types/ServiceCategoryType";
import type { ServiceCategoryRespType } from "../types/ServiceCategoryRespType";

// Get all services
export const fetchServices = async (
  params: FetchPaginatedParamsType
): Promise<PaginatedResponse<Service>> => {
  try {
    const res = await axiosInstance.get("/MunicipalService/services", {
      params: cleanFilters(params),
    });
    console.log("fetchServices OK:", res.data);
    return res.data;
  } catch (err) {
    console.error("fetchServices error:", err);
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};

export const createService = async (formData: FormData): Promise<any> => {
  try {
    const res = await axiosInstance.post(
      "/MunicipalService/create_service",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // for file uploads
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("createService error:", err);
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};

// Update a service
export const updateService = async ({
  id,
  updatedData,
}: UpdateServicePayload): Promise<Service> => {
  try {
    const res = await axiosInstance.put(
      "/MunicipalService/update_service",
      updatedData,
      {
        params: { id },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("updateService error:", err);
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};

// Delete a service
export const deleteService = async (id: string): Promise<void> => {
  try {
    const res = await axiosInstance.delete("/MunicipalService/delete_service", {
      params: { id },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("deleteService error:", err);
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};

export const getService = async (id: string): Promise<Service> => {
  try {
    const res = await axiosInstance.get("/MunicipalService/get_service_byId", {
      params: { id },
    });
    console.log("getService id:", id);
    console.log("fetched service:", res.data);
    return res.data;
  } catch (err) {
    console.error("getService error:", err);
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};

export const getServiceCategories = async (): Promise<
  ServiceCategoryType[]
> => {
  try {
    const res = await axiosInstance.get("/MunicipalService/service_categories");
    return res.data;
  } catch (err) {
    console.error("getServiceCategories error:", err);
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};

export const CreateServiceCategory = async (
  name: string
): Promise<ServiceCategoryRespType> => {
  try {
    const res = await axiosInstance.post(
      "/MunicipalService/create_service_category",
      { name: name }, // حسب API عندك property اسمها issueName
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("createServiceCateg error:", err);

    if (isAxiosError(err)) {
      // نرمي كائن يحتوي status و message بدل Error عادي
      throw {
        status: err.response?.status || 500,
        message: err.response?.data?.message || err.message,
      };
    }

    throw {
      status: 500,
      message: "Unknown error",
    };
  }
};
export const deleteServiceCategory = async (id: string): Promise<void> => {
  try {
    const res = await axiosInstance.delete(
      "/MunicipalService/delete_service_category",
      { params: { id: id } }
    );
    return res.data;
  } catch (err) {
    console.error("geterror: delete category err", err);
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};
