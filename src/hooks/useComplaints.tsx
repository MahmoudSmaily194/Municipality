import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createComplaint,
  createIssueType,
  deleteComplaintIssueType,
  fetchedComplaints,
  fetchedPublicComplaints,
  getCompliantIssueTypes,
  getUnseenComplaints,
  updateComplaint,
  updateComplaintSeen,
} from "../services/Complaints";
import type { ComplaintType } from "../types/ComplaintType";
import type { FetchPaginatedParamsType } from "../types/FetchNewsParamsType";
import type { IssueTypeResponseData } from "../types/IssueTypeResponseData";

export const useComplaints = (
  filters: Omit<FetchPaginatedParamsType, "PageNumber" | "PageSize">
) => {
  return useInfiniteQuery({
    queryKey: ["complaint", filters],
    queryFn: ({ pageParam = 1, queryKey }) => {
      const [, filterParams] = queryKey as [
        string,
        Omit<FetchPaginatedParamsType, "PageNumber" | "PageSize">
      ];
      return fetchedComplaints({
        ...filterParams,
        PageNumber: pageParam,
        PageSize: 10,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalItemsLoaded = allPages.length * 10;
      if (totalItemsLoaded >= lastPage.totalCount) return undefined;
      return allPages.length + 1;
    },
  });
};
export const useFetchPublicComplaints = (
  filters: Omit<FetchPaginatedParamsType, "PageNumber" | "PageSize">
) => {
  return useInfiniteQuery({
    queryKey: ["complaint", filters],
    queryFn: ({ pageParam = 1, queryKey }) => {
      const [, filterParams] = queryKey as [
        string,
        Omit<FetchPaginatedParamsType, "PageNumber" | "PageSize">
      ];
      return fetchedPublicComplaints({
        ...filterParams,
        PageNumber: pageParam,
        PageSize: 10,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalItemsLoaded = allPages.length * 10;
      if (totalItemsLoaded >= lastPage.totalCount) return undefined;
      return allPages.length + 1;
    },
  });
};

export const useGetUnseenComplaints = (
  filters: Omit<FetchPaginatedParamsType, "PageNumber" | "PageSize">
) => {
  return useInfiniteQuery({
    queryKey: ["complaints", filters],
    queryFn: ({ pageParam = 1, queryKey }) => {
      const [, filterParams] = queryKey as [
        string,
        Omit<FetchPaginatedParamsType, "PageNumber" | "PageSize">
      ];
      return getUnseenComplaints({
        ...filterParams,
        PageNumber: pageParam,
        PageSize: 10,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalItemsLoaded = allPages.length * 10;
      if (totalItemsLoaded >= lastPage.totalCount) return undefined;
      return allPages.length + 1;
    },
  });
};

export const useCreateComplaint = () => {
  const queryClient = useQueryClient();
  return useMutation<ComplaintType, Error, FormData>({
    mutationFn: createComplaint,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["complaints"] });
    },
  });
};
export const useCreateComplaintIssueType = () => {
  const queryClient = useQueryClient();
  return useMutation<IssueTypeResponseData, Error, string>({
    mutationFn: createIssueType,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["complaint"] });
    },
  });
};
export const usegetComplaintIssueType = () => {
  return useQuery({
    queryKey: ["complaint"],
    queryFn: getCompliantIssueTypes,
  });
};
export const useUpdateComplaint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateComplaint,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["complaint", variables.Id] });
    },
  });
};
export const useUpdateComplaintSeen = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => updateComplaintSeen(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complaint"] });
    },
  });
};

export const useDeleteComplaintIssueType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteComplaintIssueType(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complaint"] });
    },
  });
};
