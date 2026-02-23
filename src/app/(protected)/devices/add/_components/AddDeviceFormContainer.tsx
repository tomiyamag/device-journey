import { getDevices } from "@/lib/queries/devices";
import { getSessionUser } from "@/lib/queries/user";

import { checkHasMainDevice } from "../../_lib/utils";
import AddDeviceForm from "./AddDeviceForm";

const AddDeviceFormContainer = async () => {
  const user = await getSessionUser();

  if (!user) {
    return null;
  }

  // NOTE: メインデバイス設定の有無を判定するため全てのデバイスを取得
  const devices = await getDevices(user.id);
  const isAlreadyMainDevice = checkHasMainDevice(devices);

  return <AddDeviceForm isAlreadyMainDevice={isAlreadyMainDevice} />;
};

export default AddDeviceFormContainer;
