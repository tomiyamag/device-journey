import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarDays } from "react-icons/fa6";
import { GrStorage } from "react-icons/gr";
import { IoIosArrowForward, IoMdColorPalette } from "react-icons/io";
import { MdOutlineImageNotSupported } from "react-icons/md";

import { Device } from "@/types";

import ActiveDeviceTag from "../atoms/ActiveDeviceTag";
import DeviceSpec from "../atoms/DeviceSpec";

interface IActiveDeviceDetail {
  device: Device;
}

const ActiveDeviceDetail = ({ device }: IActiveDeviceDetail) => {
  return (
    <div className="flex gap-3.5 items-center sm:items-start">
      <div className="overflow-hidden w-48 h-44 relative hidden sm:block">
        {device.image_url ? (
          <Link
            href={`/devices/${device.id}`}
            className="transition-opacity hover:opacity-80"
          >
            <Image
              src={device.image_url}
              alt=""
              fill
              className="top-1/2! left-1/2! w-auto! h-full! -translate-1/2"
            />
          </Link>
        ) : (
          <MdOutlineImageNotSupported className="absolute top-1/2 left-1/2 -translate-1/2 text-gray-300 text-5xl" />
        )}
      </div>

      <div className="flex-1">
        <div className="mb-4 sm:mb-2.5 flex items-center gap-3">
          <div className="rounded-lg overflow-hidden w-30 h-28 relative sm:hidden">
            {device.image_url ? (
              <Link
                href={`/devices/${device.id}`}
                className="transition-opacity hover:opacity-80"
              >
                <Image
                  src={device.image_url}
                  alt=""
                  fill
                  className="top-1/2! left-1/2! w-auto! h-full! -translate-1/2"
                />
              </Link>
            ) : (
              <MdOutlineImageNotSupported className="absolute top-1/2 left-1/2 -translate-1/2 text-gray-300 text-4xl" />
            )}
          </div>

          <div className="flex-1">
            <h3 className="font-bold mb-1.5">
              <Link
                href={`/devices/${device.id}`}
                className="inline-flex gap-2 items-center underline hover:no-underline"
              >
                <span className="flex-1">{`${device.brand} ${device.name}`}</span>
                <IoIosArrowForward size={14} className="w-3.5" />
              </Link>
            </h3>

            {(device.storage || device.color || device.purchase_date) && (
              <div className="flex flex-wrap gap-1">
                {device.storage && (
                  <ActiveDeviceTag>
                    <GrStorage />
                    <span className="font-bold">{device.storage}</span>
                  </ActiveDeviceTag>
                )}

                {device.color && (
                  <ActiveDeviceTag>
                    <IoMdColorPalette />
                    <span className="font-bold">{device.color}</span>
                  </ActiveDeviceTag>
                )}

                {device.purchase_date && (
                  <ActiveDeviceTag>
                    <FaCalendarDays />
                    <span className="font-bold">
                      {dayjs(device.purchase_date).format("YYYY/MM/DD")} 購入
                    </span>
                  </ActiveDeviceTag>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <DeviceSpec title="📱 Display" detail={device.spec.display || "--"} />
          <DeviceSpec title="📷 Camera" detail={device.spec.camera || "--"} />
          <DeviceSpec title="🔋 Battery" detail={device.spec.battery || "--"} />
          <DeviceSpec title="⚖️ Weight" detail={device.spec.weight || "--"} />
        </div>
      </div>
    </div>
  );
};

export default ActiveDeviceDetail;
