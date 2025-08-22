import { isAxiosError } from "axios";
import type { CompliantIssueType } from "../types/CompliantIssueType";
import type { FechedComplaintType } from "../types/FechedComplaintType";
import type { FetchPaginatedParamsType } from "../types/FetchNewsParamsType";
import type { IssueTypeResponseData } from "../types/IssueTypeResponseData";
import type { PaginatedResponse } from "../types/PaginatedResponse";
import type { UpdateComplaintPayload } from "../types/UpdateComplaintParamsType";
import axiosInstance from "./axiosInstance";
import { cleanFilters } from "./News";

export const fetchedComplaints = async (
  params: FetchPaginatedParamsType
): Promise<PaginatedResponse<FechedComplaintType>> => {
  try {
    const res = await axiosInstance.get("/Complaint/get_complaints", {
      params: cleanFilters(params),
    });

    return res.data;
  } catch (err) {
    console.error("fetched complaints error:", err);
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};
export const fetchedPublicComplaints = async (
  params: FetchPaginatedParamsType
): Promise<PaginatedResponse<FechedComplaintType>> => {
  try {
    const res = await axiosInstance.get("/Complaint/get_public_complaints", {
      params: cleanFilters(params),
    });

    return res.data;
  } catch (err) {
    console.error("fetched complaints error:", err);
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};
export const fetchedComplaintById = async (
  id: string
): Promise<FechedComplaintType> => {
  try {
    const res = await axiosInstance.get("Complaint/get_complaint_by_id", {
      params: {
        Id: id,
      },
    });
    return res.data;
  } catch (err) {
    console.error("fetched complaint error:", err);
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};
export const createComplaint = async (formData: FormData): Promise<any> => {
  try {
    const res = await axiosInstance.post(
      "/Complaint/create_complaint",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // for file upload
        },
        withCredentials: true, // ensure cookies are sent
      }
    );
    return res.data;
  } catch (err) {
    console.error("createComplaint error:", err);
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};

export const createIssueType = async (
  name: string
): Promise<IssueTypeResponseData> => {
  try {
    const res = await axiosInstance.post(
      "/Complaint/create_complaint_issueType",
      { issueName: name }, // حسب API عندك property اسمها issueName
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("createIssueType error:", err);

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
export const getCompliantIssueTypes = async (): Promise<
  CompliantIssueType[]
> => {
  try {
    const res = await axiosInstance.get("/Complaint/issue_types");
    return res.data;
  } catch (err) {
    console.error("geterror:getCompliantIssueTypes", err);
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};
export const updateComplaint = async ({
  Id,
  updatedData,
}: UpdateComplaintPayload): Promise<FechedComplaintType> => {
  try {
    const res = await axiosInstance.put(
      "/Complaint/update_complaint",
      updatedData,
      { params: { Id } }
    );
    return res.data;
  } catch (err) {
    console.error("geterror: update complaint err", err);
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};
export const getUnseenComplaints = async (
  params: FetchPaginatedParamsType
): Promise<PaginatedResponse<FechedComplaintType>> => {
  try {
    const res = await axiosInstance.get("/Complaint/get-seen-complaints", {
      params: cleanFilters(params),
    });
    return res.data;
  } catch (err) {
    console.error("geterror: update complaint err", err);
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};
export const updateComplaintSeen = async (Id: string): Promise<void> => {
  try {
    const res = await axiosInstance.put("/Complaint/set_complaint_seen", null, {
      params: { Id: Id },
    });
    return res.data;
  } catch (err) {
    console.error("geterror: update complaint err", err);
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};
export const deleteComplaintIssueType = async (id: string): Promise<void> => {
  try {
    const res = await axiosInstance.delete(
      "/Complaint/delete_complaint_issueType",
      { params: { Id: id } }
    );
    return res.data;
  } catch (err) {
    console.error("geterror: delete complaint err", err);
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Unknown error");
  }
};
