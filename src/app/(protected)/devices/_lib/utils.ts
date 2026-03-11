import { Device } from "@/types";

import { DeviceInputDraft } from "../_types";

// デバイス用途の説明テキスト出し分け（フォーム）
export const deviceStatusDescription = (
  initialData: DeviceInputDraft | Device,
  selectedMainDevice: boolean,
  isAlreadyMainDevice: boolean | undefined,
  isRetired: boolean,
): string | undefined => {
  // メインデバイス未登録＆売却日を指定していない場合
  if (!isAlreadyMainDevice && !isRetired) {
    return "メインデバイスが未登録です。この端末を登録しませんか？";
  }

  // 別のデバイスをメインデバイスにする場合
  if (isAlreadyMainDevice && selectedMainDevice && !initialData.is_main) {
    return "現在登録されているメインデバイス設定が上書きされます。";
  }

  // 売却日の指定を行った場合
  if (isRetired && !selectedMainDevice) {
    return "変更する場合は、指定した売却日を削除またはリセットしてください。";
  }

  return undefined;
};

// メインデバイス設定の有無を返す
export const checkHasMainDevice = (devices: Device[]) => {
  return devices.filter((device) => device.is_main).length > 0;
};
