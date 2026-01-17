"use client";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { PiSmileySad } from "react-icons/pi";

import { useGetMobileDevice } from "@/hooks/useMobileApi";
import { useDeviceDraftStore } from "@/store/useDeviceDraftStore";
import { useDeviceSearchStore } from "@/store/useDeviceSearchStore";
import { DeviceInputDraft } from "@/types";
import { formatReleaseDate } from "@/utils/formatReleaseDate";
import { parseMultipleData } from "@/utils/parseMultipleData";

import Button from "../atoms/Button";
import ContentLoadingSpinner from "../atoms/ContentLoadingSpinner";
import DeviceSpec from "../atoms/DeviceSpec";

interface IStatusMessage {
  message: string;
}

// NOTE: iOS Safari でも日付文字列をパースするため拡張
dayjs.extend(customParseFormat);

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

  const result = useMemo<DeviceInputDraft | null>(() => {
    if (!data) return null;

    return {
      name: data.name ?? "",
      brand: data.manufacturer_name ?? "",
      purchase_price: null,
      purchase_date: null,
      retire_date: null,
      // image_url: data.images[0]?.image_url
      //   ? data.images[0].image_url
      //   : data.main_image_b64
      //     ? `data:image/png;base64,${data.main_image_b64}`
      //     : null,
      image_url: `/api/device-image/${deviceId}`,
      spec: {
        display: data.screen_resolution || "--",
        camera: data.camera || "--",
        battery: data.battery_capacity || "--",
        weight: data.weight || "--",
        hardware: data.hardware || "--",
        storage: data.storage || "--",
      },
      release_date:
        data.release_date && data.release_date !== "Cancelled"
          ? formatReleaseDate(data.release_date)
          : "--",
      candidate_colors: parseMultipleData(data.colors ?? ""),
      colors: data?.colors || "不明",
      color: null,
      candidate_storages: parseMultipleData(data.storage ?? ""),
      storage: null,
      is_sub: false,
      is_main: false,
      resale_price: null,
    };
  }, [data, deviceId]);

  if (!deviceId) {
    return null;
  }

  const handleProceed = () => {
    if (!result) return;

    setIsNavigating(true);
    setDraft(result);

    router.push("/devices/add");
  };

  if (isFetching) {
    return <ContentLoadingSpinner className="py-24" />;
  }

  if (isError) {
    return <StatusMessage message="通信エラーが発生しました" />;
  }

  if (!data || !result) {
    return <StatusMessage message="デバイス情報が見つかりませんでした" />;
  }

  return (
    <div className="flex flex-col gap-9">
      <div className="bg-gray-100 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
          <div className="w-full sm:w-52 h-42 sm:h-72 relative overflow-hidden">
            {result.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={result.image_url}
                alt=""
                className="absolute top-1/2 left-1/2 w-auto max-h-full h-full sm:h-auto -translate-1/2"
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
              <div>発売日 : {result.release_date}</div>
              <div>色 : {result.colors}</div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3 sm:mt-2 text-left">
              <DeviceSpec title="📱 Display" detail={result.spec.display} />
              <DeviceSpec title="📷 Camera" detail={result.spec.camera} />
              <DeviceSpec title="🔋 Battery" detail={result.spec.battery} />
              <DeviceSpec title="⚖️ Weight" detail={result.spec.weight} />
              <DeviceSpec title="⚙️ Hardware" detail={result.spec.hardware} />
              <DeviceSpec title="💾 Storage" detail={result.spec.storage} />
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
        このデバイスを追加する
      </Button>
    </div>
  );
};

export default SearchDeviceResult;
