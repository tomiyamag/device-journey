import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import {
  autocompleteMobileDevices,
  getMobileDevice,
} from "@/actions/mobile-api";
import { minLength } from "@/components/molecules/SearchDeviceForm";
import { AutocompleteMobileApiResult, GetDeviceMobileApiResult } from "@/types";

export const useAutocompleteMobileDevices = (query: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const isDebouncing = query !== debouncedQuery;

  const result = useQuery<AutocompleteMobileApiResult[]>({
    queryKey: ["autocompleteMobileDevices", debouncedQuery],
    queryFn: () => autocompleteMobileDevices(debouncedQuery),
    enabled: debouncedQuery.length > minLength,
    initialData: [],
  });

  return {
    ...result,
    isFetching: isDebouncing || result.isFetching, // デバウンス中の状態も isFetching として返す
  };
};

export const useGetMobileDevice = (id: number) => {
  return useQuery<GetDeviceMobileApiResult | null>({
    queryKey: ["getMobileDevice"],
    queryFn: () => getMobileDevice(id),
    initialData: null,
  });
};
