"use server";

import {
  autocompleteMobileDevices,
  getMobileDevice,
  resolveMobileDeviceImage,
} from "../_lib/fetcher";

export const autocompleteMobileDevicesAction = async (query: string) => {
  return await autocompleteMobileDevices(query);
};

export const getMobileDeviceAction = async (id: number) => {
  return await getMobileDevice(id);
};

export const getMobileDeviceImageAction = async (id: number) => {
  return await resolveMobileDeviceImage(id);
};
