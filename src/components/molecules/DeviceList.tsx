import { getDevices } from "@/actions/devices";
import { Device } from "@/types";

import DeviceListItem from "./DeviceListItem";

const DeviceList = async () => {
  const devices = await getDevices();

  return (
    <div className="flex flex-col gap-9">
      {devices.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4">
          {/* メイン端末が先頭になるようソート */}
          {[...devices]
            .sort((a, b) => Number(b.is_main) - Number(a.is_main))
            .map((device: Device) => (
              <li key={device.id}>
                <DeviceListItem device={device} />
              </li>
            ))}
        </ul>
      ) : (
        <div className="text-center mt-4.5">デバイスが登録されていません。</div>
      )}
    </div>
  );
};

export default DeviceList;
