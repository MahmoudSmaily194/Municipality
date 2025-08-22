import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  allFetchedNews,
  createNewsItem,
  deleteNewsItem,
  fetchedNews,
} from "../services/News";
import type { NewsItemType } from "../types/NewsItemType";

import type { PaginatedResponse } from "../types/PaginatedResponse";
import type { FetchPaginatedParamsType } from "../types/FetchNewsParamsType";

export const useVissibleNews = (params: FetchPaginatedParamsType) => {
  return useQuery<
    PaginatedResponse<NewsItemType>,
    Error,
    PaginatedResponse<NewsItemType>,
    (string | FetchPaginatedParamsType)[]
  >({
    queryKey: ["vissible_news", params],
    queryFn: () => fetchedNews(params),
    staleTime: 1000 * 5,
  });
};

export const useGetAllNews = (filters: Omit<FetchPaginatedParamsType, 'PageNumber' | 'PageSize'>) => {
 return useInfiniteQuery({
    queryKey: ['events', filters],
    queryFn: ({ pageParam = 1, queryKey }) => {
      const [, filterParams] = queryKey as [string, Omit<FetchPaginatedParamsType, 'PageNumber' | 'PageSize'>];
      return allFetchedNews({ ...filterParams, PageNumber: pageParam, PageSize: 5});
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalItemsLoaded = allPages.length * 10;
      if (totalItemsLoaded >= lastPage.totalCount) return undefined;
      return allPages.length + 1;
    },
  });
};

export const useCreateNewsItem = () => {
  const queryClient = useQueryClient();
  return useMutation<NewsItemType, Error, FormData>({
    mutationFn: createNewsItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vissible_news"] });
    },
  });
};
export const useDeleteNewsItem = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: deleteNewsItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vissible_news"] });
    },
  });
};
