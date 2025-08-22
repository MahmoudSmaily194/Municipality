import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createService,
  CreateServiceCategory,
  deleteService,
  deleteServiceCategory,
  fetchServices,
  getServiceCategories,
  updateService,
} from "../services/Services";
import type { FetchPaginatedParamsType } from "../types/FetchNewsParamsType";
import type { PaginatedResponse } from "../types/PaginatedResponse";
import type { Service } from "../types/Service";
import type { ServiceCategoryRespType } from "../types/ServiceCategoryRespType";

// Fetch all services
export const useServices = (params: FetchPaginatedParamsType) => {
  return useQuery<
    PaginatedResponse<Service>,
    Error,
    PaginatedResponse<Service>,
    (string | FetchPaginatedParamsType)[]
  >({
    queryKey: ["services", params],
    queryFn: () => fetchServices(params),
    staleTime: 1000 * 5,
  });
};
export const useInfiniteServices = (
  filters: Omit<FetchPaginatedParamsType, "PageNumber" | "PageSize">
) => {
  return useInfiniteQuery({
    queryKey: ["services", filters],
    queryFn: ({ pageParam = 1, queryKey }) => {
      const [, filterParams] = queryKey as [
        string,
        Omit<FetchPaginatedParamsType, "PageNumber" | "PageSize">
      ];
      return fetchServices({
        ...filterParams,
        PageNumber: pageParam,
        PageSize: 5,
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
export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation<Service, Error, FormData>({
    mutationFn: createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};
// Update a service
export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};

// Delete a service
export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};
export const useServiceCategories = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: getServiceCategories,
  });
};
export const useCreateSerivceCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<ServiceCategoryRespType, Error, string>({
    mutationFn: CreateServiceCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};

export const useDeleteServiceCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteServiceCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};
