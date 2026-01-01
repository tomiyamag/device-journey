"use client";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { PiSmileySad } from "react-icons/pi";

import { getMobileDevice } from "@/actions/mobile-api";
import { IGetDeviceMobileApiResult } from "@/types";

import Button from "../atoms/Button";
import DeviceSpec from "../atoms/DeviceSpec";

interface IStatusMessage {
  message: string;
}

interface ISearchDeviceResult {
  deviceId: number;
}

const StatusMessage = ({ message }: IStatusMessage) => {
  return (
    <div className="font-bold text-sm flex flex-col gap-5 justify-center items-center py-10">
      <PiSmileySad size={100} className="text-gray-300" />
      <div className="text-gray-400">{message}</div>
    </div>
  );
};

const SearchDeviceResult = ({ deviceId }: ISearchDeviceResult) => {
  const [deviceData, setDeviceData] =
    useState<IGetDeviceMobileApiResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const data = await getMobileDevice(deviceId);
        setDeviceData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [deviceId]);

  const formatReleaseDate = (dateString: string) => {
    if (!dateString) return "";

    const cleanedDate = dateString.replace("Released ", "");
    return dayjs(cleanedDate).format("YYYY年MM月DD日");
  };

  if (isLoading) {
    return (
      <div className="font-bold text-sm py-24">
        <div className="flex justify-center items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-teal-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <StatusMessage message="通信エラーが発生しました" />;
  }

  if (!isLoading && !isError && !deviceData) {
    return <StatusMessage message="端末情報が見つかりませんでした" />;
  }

  return (
    <>
      {deviceData && (
        <>
          <div className="bg-gray-100 rounded-xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
              <div className="w-full sm:w-52 h-42 sm:h-72 relative overflow-hidden">
                {deviceData?.images[0]?.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={deviceData.images[0].image_url}
                    alt=""
                    className="absolute top-1/2 left-1/2 -translate-1/2 w-auto sm:w-full h-full sm:h-auto"
                  />
                ) : (
                  <MdOutlineImageNotSupported className="absolute top-1/2 left-1/2 -translate-1/2 text-gray-300 text-5xl sm:text-6xl" />
                )}
              </div>

              <div className="flex-1 flex flex-col gap-2 text-center sm:text-left w-full">
                <div className="font-bold text-lg">
                  {deviceData.manufacturer_name} {deviceData.name}
                </div>

                <div className="flex flex-col gap-1 text-xs text-gray-500 font-bold">
                  <div>
                    発売日 :{" "}
                    {deviceData.release_date &&
                    deviceData.release_date !== "Cancelled"
                      ? formatReleaseDate(deviceData.release_date)
                      : "不明"}
                  </div>
                  <div>色 : {deviceData.colors || "不明"}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3 sm:mt-2 text-left">
                  <DeviceSpec
                    title="📱 Display"
                    detail={deviceData.screen_resolution || "--"}
                  />
                  <DeviceSpec
                    title="📷 Camera"
                    detail={deviceData.camera || "--"}
                  />
                  <DeviceSpec
                    title="🔋 Battery"
                    detail={deviceData.battery_capacity || "--"}
                  />
                  <DeviceSpec
                    title="⚖️ Weight"
                    detail={deviceData.weight || "--"}
                  />
                  <DeviceSpec
                    title="⚙️ Hardware"
                    detail={deviceData.hardware || "--"}
                  />
                  <DeviceSpec
                    title="💾 Storage"
                    detail={deviceData.storage || "--"}
                  />
                </div>
              </div>
            </div>
          </div>

          <Button onClick={() => {}}>この端末を登録する</Button>
        </>
      )}
    </>
  );
};

export default SearchDeviceResult;
