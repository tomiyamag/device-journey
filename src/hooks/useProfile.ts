import { useQuery } from "@tanstack/react-query";

import { getUserProfile } from "@/actions/profile";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => getUserProfile(),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
