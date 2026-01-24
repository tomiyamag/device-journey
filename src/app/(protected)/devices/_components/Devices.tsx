import Link from "next/link";
import { useMemo } from "react";
import { FiPlus } from "react-icons/fi";

import { Device as DeviceType } from "@/types";

import Device from "./Device";
import NoDevices from "./NoDevices";

interface IDevices {
  devices: DeviceType[];
}

const Devices = ({ devices }: IDevices) => {
  const hasDevices = devices.length > 0;

  // メイン端末が先頭になるようソート
  const sortedDevices = useMemo(() => {
    return [...devices].sort((a, b) => Number(b.is_main) - Number(a.is_main));
  }, [devices]);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center text-sm">
        {hasDevices
          ? `全 ${devices.length} 件`
          : "デバイスが登録されていません。"}
      </div>

      <div className="text-right text-sm">
        <Link
          href="/devices/search"
          className="inline-block transition-opacity hover:opacity-80"
        >
          <div className="inline-flex items-center gap-1.5 text-teal-600 font-bold">
            <FiPlus />
            <span>新規追加</span>
          </div>
        </Link>
      </div>

      <div className="flex flex-col gap-9">
        {hasDevices ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4">
            {sortedDevices.map((device: DeviceType) => (
              <li key={device.id}>
                <Device device={device} />
              </li>
            ))}
          </ul>
        ) : (
          <NoDevices />
        )}
      </div>
    </div>
  );
};

export default Devices;
