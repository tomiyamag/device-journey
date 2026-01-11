import { DeviceStatusType } from "@/components/atoms/DeviceStatusBadge";
import { Device } from "@/types";

// メインデバイス・サブ機・売却済み表示の出し分け
export const getDeviceStatus = (device: Device): DeviceStatusType | null => {
  if (device.is_main) {
    return "is_main";
  }

  if (device.is_sub) {
    return "is_sub";
  }

  if (device.retire_date) {
    return "is_sold";
  }

  return null;
};
