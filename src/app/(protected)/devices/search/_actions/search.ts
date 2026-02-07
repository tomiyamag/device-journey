"use server";

import { autocompleteMobileDevices, getMobileDevice } from "../_lib/fetcher";

export async function autocompleteMobileDevicesAction(query: string) {
  return await autocompleteMobileDevices(query);
}

export async function getMobileDeviceAction(id: number) {
  return await getMobileDevice(id);
}
