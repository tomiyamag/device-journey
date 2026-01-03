"use client";

import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { PiSmileySad } from "react-icons/pi";

import { useGetMobileDevice } from "@/hooks/useMobileApi";
import { useDeviceDraftStore } from "@/store/useDeviceDraftStore";
import { useDeviceSearchStore } from "@/store/useDeviceSearchStore";

import Button from "../atoms/Button";
import ContentLoadingSpinner from "../atoms/ContentLoadingSpinner";
import DeviceSpec from "../atoms/DeviceSpec";

interface IStatusMessage {
  message: string;
}

const StatusMessage = ({ message }: IStatusMessage) => {
  return (
    <div className="font-bold text-sm flex flex-col gap-5 justify-center items-center py-10">
      <PiSmileySad size={100} className="text-gray-300" />
      <div className="text-gray-400">{message}</div>
    </div>
  );
};

const SearchDeviceResult = () => {
  const router = useRouter();

  const [isNavigating, setIsNavigating] = useState(false);
  const { selectedDeviceId: deviceId } = useDeviceSearchStore();
  const { data, isFetching, isError } = useGetMobileDevice(deviceId);
  const setDraft = useDeviceDraftStore((state) => state.setDraft);

  if (!deviceId) {
    return null;
  }

  // "," で区切られた文字列を配列に分解する
  const parseMultipleData = (multipleDataString: string): string[] => {
    if (!multipleDataString) return [];

    return multipleDataString
      .split(",")
      .map((c) => c.trim()) // 半角スペース削除
      .filter((c) => c.length > 0); // 空文字を除外
  };

  // 発売日データをフォーマットする
  const formatReleaseDate = (dateString: string) => {
    if (!dateString) return "";

    const cleanedDate = dateString.replace("Released ", "");
    return dayjs(cleanedDate).format("YYYY年MM月DD日");
  };

  const handleProceed = () => {
    if (!data) return;

    setIsNavigating(true);

    setDraft({
      name: data.name || "",
      brand: data.manufacturer_name || "",
      purchase_price: "",
      purchase_date: null,
      retire_date: null,
      image_url: data?.images[0]?.image_url || null,
      spec: {
        display: data.screen_resolution || "",
        camera: data.camera || "",
        battery: data.battery_capacity || "",
        weight: data.weight || "",
        hardware: data.hardware || "",
        storage: data.storage || "",
      },
      release_date:
        data.release_date && data.release_date !== "Cancelled"
          ? formatReleaseDate(data.release_date)
          : "不明",
      candidate_colors: parseMultipleData(data.colors || ""),
      colors: data.colors || "不明",
      color: "",
      candidate_storages: parseMultipleData(data.storage || ""),
      storage: "",
      is_sub: false,
      is_main: false,
    });

    router.push("/devices/add");
  };

  if (isFetching) {
    return <ContentLoadingSpinner className="py-24" />;
  }

  if (isError) {
    return <StatusMessage message="通信エラーが発生しました" />;
  }

  if (!isFetching && !isError && !data) {
    return <StatusMessage message="デバイス情報が見つかりませんでした" />;
  }

  return (
    <>
      {data && (
        <div className="flex flex-col gap-9">
          <div className="bg-gray-100 rounded-xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
              <div className="w-full sm:w-52 h-42 sm:h-72 relative overflow-hidden">
                {data?.images[0]?.image_url ? (
                  <Image
                    src={data.images[0].image_url}
                    alt=""
                    fill
                    className="top-1/2! left-1/2! w-auto! sm:w-full! h-full! sm:h-auto! -translate-1/2"
                  />
                ) : (
                  <MdOutlineImageNotSupported className="absolute top-1/2 left-1/2 -translate-1/2 text-gray-300 text-5xl sm:text-6xl" />
                )}
              </div>

              <div className="flex-1 flex flex-col gap-2 text-center sm:text-left w-full">
                <div className="font-bold text-lg">
                  {data.manufacturer_name} {data.name}
                </div>

                <div className="flex flex-col gap-1 text-xs text-gray-500 font-bold">
                  <div>
                    発売日 :{" "}
                    {data.release_date && data.release_date !== "Cancelled"
                      ? formatReleaseDate(data.release_date)
                      : "不明"}
                  </div>
                  <div>色 : {data.colors || "不明"}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3 sm:mt-2 text-left">
                  <DeviceSpec
                    title="📱 Display"
                    detail={data.screen_resolution || "--"}
                  />
                  <DeviceSpec title="📷 Camera" detail={data.camera || "--"} />
                  <DeviceSpec
                    title="🔋 Battery"
                    detail={data.battery_capacity || "--"}
                  />
                  <DeviceSpec title="⚖️ Weight" detail={data.weight || "--"} />
                  <DeviceSpec
                    title="⚙️ Hardware"
                    detail={data.hardware || "--"}
                  />
                  <DeviceSpec
                    title="💾 Storage"
                    detail={data.storage || "--"}
                  />
                </div>
              </div>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleProceed}
            loading={isNavigating}
            disabled={isNavigating}
          >
            このデバイスを登録する
          </Button>
        </div>
      )}
    </>
  );
};

export default SearchDeviceResult;
