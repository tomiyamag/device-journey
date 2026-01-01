"use client";

import { useEffect, useState } from "react";
import { PiSmileySad } from "react-icons/pi";

import { getMobileDevice } from "@/actions/mobile-api";
import { IGetDeviceMobileApiResult } from "@/types";

interface ISearchDeviceResult {
  deviceId: number;
}

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

  if (isLoading) {
    return (
      <div className="font-bold text-sm py-10">
        <div className="flex justify-center items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-teal-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (!isLoading && isError) {
    return (
      <div className="font-bold text-sm flex flex-col gap-5 justify-center items-center py-10">
        <PiSmileySad size={100} className="text-gray-300" />
        <div className="text-gray-400">通信エラーが発生しました</div>
      </div>
    );
  }

  if (!isLoading && !deviceData) {
    return (
      <div className="font-bold text-sm flex flex-col gap-5 justify-center items-center py-10">
        <PiSmileySad size={100} className="text-gray-300" />
        <div className="text-gray-400">端末情報が見つかりませんでした</div>
      </div>
    );
  }

  return (
    <>
      {deviceData && (
        <div className="">
          <div className="bg-white p-8 rounded-lg border shadow-sm">
            <p className="font-bold text-xl">{deviceData.name}</p>
            <p className="text-gray-600">{deviceData.manufacturer_name}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchDeviceResult;
