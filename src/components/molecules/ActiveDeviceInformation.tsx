"use client";

import Link from "next/link";
import { IoAddCircleOutline } from "react-icons/io5";

import { useDevices } from "@/hooks/useDevices";

import InformationCard from "../atoms/InformationCard";
import ActiveDeviceDetail from "./ActiveDeviceDetail";
import ActiveDeviceFeatures from "./ActiveDeviceFeatures";

const WELCOME_MESSAGE = "Device Journey へようこそ 👋";

const ActiveDeviceInformation = () => {
  const { data: devices, isLoading } = useDevices();

  if (isLoading) {
    return <>ロード中</>;
  }

  if (!devices) {
    return null;
  }

  if (devices.length < 1) {
    return (
      <Link
        href="/devices/search"
        className="block transition-opacity hover:opacity-80"
      >
        <InformationCard
          footer={
            <div className="text-center font-bold">{WELCOME_MESSAGE}</div>
          }
        >
          <div className="h-62 sm:h-48 flex flex-col gap-5 items-center justify-center">
            <IoAddCircleOutline className="text-4xl text-teal-600" />
            <div className="text-sm font-bold text-center text-gray-600">
              まだデバイスが登録されていません。
              <br />
              まずは使用中のデバイスを登録してみましょう！
            </div>
          </div>
        </InformationCard>
      </Link>
    );
  }

  const device = devices.find((item) => item.is_main);

  if (!device) {
    return (
      <Link
        href="/devices"
        className="block transition-opacity hover:opacity-80"
      >
        <InformationCard
          footer={
            <div className="text-center font-bold">{WELCOME_MESSAGE}</div>
          }
        >
          <div className="h-62 sm:h-48 flex flex-col gap-5 items-center justify-center">
            <IoAddCircleOutline className="text-4xl text-teal-600" />
            <div className="text-sm font-bold text-center text-gray-600">
              メインデバイスが登録されていません。
              <br />
              デバイス一覧から登録する端末を選択してみましょう！
            </div>
          </div>
        </InformationCard>
      </Link>
    );
  }

  return (
    <InformationCard footer={<ActiveDeviceFeatures device={device} />}>
      <ActiveDeviceDetail device={device} />
    </InformationCard>
  );
};

export default ActiveDeviceInformation;
