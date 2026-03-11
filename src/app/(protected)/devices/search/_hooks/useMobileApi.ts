import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import {
  autocompleteMobileDevicesAction,
  getMobileDeviceAction,
  getMobileDeviceImageAction,
} from "../_actions/search";
import { minLength } from "../_components/SearchDeviceContent";
import {
  AutocompleteDeviceMobileApiResult,
  GetDeviceMobileApiResult,
} from "../_types";

export const useAutocompleteMobileDevices = (query: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const isDebouncing = query !== debouncedQuery;

  const result = useQuery<AutocompleteDeviceMobileApiResult[]>({
    queryKey: ["autocompleteMobileDevices", debouncedQuery],
    queryFn: () => autocompleteMobileDevicesAction(debouncedQuery),
    enabled: debouncedQuery.length > minLength,
    staleTime: Infinity,
  });

  return {
    ...result,
    isFetching: isDebouncing || result.isFetching, // デバウンス中の状態も isFetching として返す
  };
};

export const useGetMobileDevice = (id: number | null) => {
  return useQuery<GetDeviceMobileApiResult | null>({
    queryKey: ["getMobileDevice", id],
    queryFn: () => getMobileDeviceAction(id!),
    staleTime: Infinity,
    enabled: !!id,
  });
};

export const useGetMobileDeviceImage = (id: number | null) => {
  return useQuery<string | null>({
    queryKey: ["getMobileDeviceImage", id],
    queryFn: () => getMobileDeviceImageAction(id!),
    staleTime: Infinity,
    enabled: !!id,
  });
};
