"use client";

import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";

import { useDevices } from "@/hooks/useDevices";
import { Device } from "@/types";

import ErrorText from "../atoms/ErrorText";
import InformationCard from "../atoms/InformationCard";
import DeviceListItem from "./DeviceListItem";
import DeviceListSkeleton from "./DeviceListSkeleton";

const DeviceList = () => {
  const { data: devices, isLoading, isError, error } = useDevices();

  if (isLoading) {
    return <DeviceListSkeleton />;
  }

  if (isError) {
    return <ErrorText>{error.message}</ErrorText>;
  }

  if (!devices) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center text-sm">
        {devices.length > 0
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4 mt-5">
            <Link
              href="/devices/search"
              className="transition-opacity hover:opacity-80"
            >
              <InformationCard
                footer={
                  <div className="font-bold text-sm sm:text-base">
                    デバイスを追加する
                  </div>
                }
              >
                <div className="h-40 flex items-center justify-center">
                  <IoAddCircleOutline className="text-4xl text-teal-600" />
                </div>
              </InformationCard>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceList;
