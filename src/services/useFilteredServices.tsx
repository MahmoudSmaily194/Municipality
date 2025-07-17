import { useQuery } from "@tanstack/react-query";
import { useServiceFilterStore } from "../stores/useServiceFilterStore";
import { services } from "../data/services";

export const useFilteredServices = () => {
  const { category, query } = useServiceFilterStore();
  return useQuery({
    queryKey: ["services", query, category],
    queryFn: () => {
      const q = query.toLowerCase();
      return services.filter((service) => {
        const matchQuery = service.title.toLowerCase().includes(q);
        const matchCategory = category === "" || service.category === category;
        return matchQuery && matchCategory;
      });
    },
    staleTime: Infinity,
  });
};
