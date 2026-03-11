import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineImageNotSupported } from "react-icons/md";

import DeviceStatusBadge from "@/components/common/DeviceStatusBadge";
import Panel from "@/components/ui/Panel";
import { getDeviceStatus } from "@/lib/utils/getDeviceStatus";
import { Device as DeviceType } from "@/types";

import DeviceDetailField from "./DeviceDetailField";

interface IDevice {
  device: DeviceType;
}

const Device = ({ device }: IDevice) => {
  return (
    <Link
      href={`/devices/${device.id}`}
      className="block h-full transition-opacity hover:opacity-80"
    >
      <section className="h-full">
        <Panel
          className="h-full"
          footer={
            <div className="flex flex-col gap-2">
              <h3 className="font-bold truncate">
                {device.brand} {device.name}
              </h3>

              <div className="absolute top-4 right-4">
                <DeviceStatusBadge status={getDeviceStatus(device)} />
              </div>

              <div className="flex flex-col gap-1 pb-0.5">
                <DeviceDetailField title="購入日">
                  {device.purchase_date
                    ? dayjs(device.purchase_date).format("YYYY年MM月DD日")
                    : "未登録"}
                </DeviceDetailField>

                <DeviceDetailField title="カラー">
                  {device.color ?? "未登録"}
                </DeviceDetailField>

                <DeviceDetailField title="ストレージ容量">
                  {device.storage ?? "未登録"}
                </DeviceDetailField>
              </div>
            </div>
          }
        >
          <div className="relative overflow-hidden h-36 sm:h-40">
            {device.image_url ? (
              <Image
                src={device.image_url}
                className="top-1/2! left-1/2! w-auto! max-w-none h-11/12! sm:h-10/12! -translate-1/2"
                alt=""
                fill
              />
            ) : (
              <MdOutlineImageNotSupported className="absolute top-1/2 left-1/2 -translate-1/2 text-gray-300 text-5xl sm:text-6xl" />
            )}
          </div>
        </Panel>
      </section>
    </Link>
  );
};

export default Device;
