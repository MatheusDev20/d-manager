import { listAll } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";

export const useDevelopersList = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["developers_list"],
    queryFn: () => listAll({ bringTasks: true }),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  return {
    data,
    isError,
    isLoading,
  };
};
