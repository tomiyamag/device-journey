import { useQuery } from "@tanstack/react-query";

import { getDevices } from "@/actions/devices";

export const useDevices = () => {
  return useQuery({
    queryKey: ["devices"],
    queryFn: () => getDevices(),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
