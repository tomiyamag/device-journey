import { useQuery } from "@tanstack/react-query";

import { getDeviceById } from "@/actions/devices";

export const useDevice = (id: string) => {
  return useQuery({
    queryKey: ["devices", id],
    queryFn: () => getDeviceById(id),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
