import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createEvent, deleteEvent, fetchedEvents } from "../services/Events";
import type { FetchPaginatedParamsType } from "../types/FetchNewsParamsType";
import type { NewsItemType } from "../types/NewsItemType";

export const useEvents = (
  filters: Omit<FetchPaginatedParamsType, "PageNumber" | "PageSize">
) => {
  return useInfiniteQuery({
    queryKey: ["events", filters],
    queryFn: ({ pageParam = 1, queryKey }) => {
      const [, filterParams] = queryKey as [
        string,
        Omit<FetchPaginatedParamsType, "PageNumber" | "PageSize">
      ];
      return fetchedEvents({
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
export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation<NewsItemType, Error, FormData>({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
