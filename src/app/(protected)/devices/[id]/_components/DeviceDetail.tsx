import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { GrStorage } from "react-icons/gr";
import { IoMdColorPalette } from "react-icons/io";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";

import DeviceSpec from "@/components/common/DeviceSpec";
import DeviceStatusBadge from "@/components/common/DeviceStatusBadge";
import DeviceTag from "@/components/common/DeviceTag";
import FeatureCostToday from "@/components/common/FeatureCostToday";
import FeaturePeriod from "@/components/common/FeaturePeriod";
import { cn } from "@/lib/utils/cn";
import { getDeviceStatus } from "@/lib/utils/getDeviceStatus";
import { Device } from "@/types";

import DeviceDetailTable from "./DeviceDetailTable";
import DeviceDetailTableRow from "./DeviceDetailTableRow";

interface IDeviceDetail {
  device: Device;
}

const DeviceDetail = ({ device }: IDeviceDetail) => {
  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-wrap gap-2 justify-center">
        <DeviceStatusBadge status={getDeviceStatus(device)} />

        <DeviceTag size="lg">
          <GrStorage />
          <span className="font-bold">
            {device.storage ?? "ストレージ容量未登録"}
          </span>
        </DeviceTag>

        <DeviceTag size="lg">
          <IoMdColorPalette />
          <span className="font-bold">{device.color ?? "カラー未登録"}</span>
        </DeviceTag>
      </div>

      <div className="relative overflow-hidden h-54">
        {device.image_url ? (
          <Image
            src={device.image_url}
            alt=""
            className="top-1/2! left-1/2! w-auto! max-h-full h-full! -translate-1/2"
            fill
          />
        ) : (
          <MdOutlineImageNotSupported className="absolute top-1/2 left-1/2 -translate-1/2 text-gray-300 text-6xl" />
        )}
      </div>

      <div className="flex gap-10 justify-center">
        <div className="w-auto">
          <FeaturePeriod device={device} />
        </div>
        <div className="w-auto">
          <FeatureCostToday device={device} />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <DeviceSpec title="📱 Display" detail={device.spec.display} size="lg" />
        <DeviceSpec title="📷 Camera" detail={device.spec.camera} size="lg" />
        <DeviceSpec title="🔋 Battery" detail={device.spec.battery} size="lg" />
        <DeviceSpec title="⚖️ Weight" detail={device.spec.weight} size="lg" />
        <DeviceSpec
          title="⚙️ Hardware"
          detail={device.spec.hardware}
          size="lg"
        />
        <DeviceSpec
          title="💾 Storage"
          detail={
            <>
              {device.spec.storage === "--" && device.storage ? (
                <span className="font-bold">{device.storage}</span>
              ) : (
                <>
                  {device.spec.storage.split(", ").map((item, index) => (
                    <span
                      key={item}
                      className={cn({
                        "font-bold": item === device.storage,
                      })}
                    >
                      {item}
                      {index === device.spec.storage.split(", ").length - 1
                        ? ""
                        : ", "}
                    </span>
                  ))}
                </>
              )}
            </>
          }
          size="lg"
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="text-right text-sm">
          <Link
            href={`/devices/${device.id}/edit`}
            className="inline-block transition-opacity hover:opacity-80"
            prefetch
          >
            <div className="inline-flex items-center gap-1.5 text-teal-600 font-bold">
              <RiEditFill />
              <span>編集</span>
            </div>
          </Link>
        </div>

        <DeviceDetailTable>
          <DeviceDetailTableRow head="発売日">
            {device.release_date}
          </DeviceDetailTableRow>

          <DeviceDetailTableRow head="本体カラー">
            {!device.colors ? (
              <span className="font-bold">{device.color}</span>
            ) : (
              <>
                {device.colors.split(", ").map((color, index) => (
                  <span
                    key={color}
                    className={cn({
                      "font-bold": color === device.color,
                    })}
                  >
                    {color}
                    {index === device.colors.split(", ").length - 1 ? "" : ", "}
                  </span>
                ))}
              </>
            )}
          </DeviceDetailTableRow>

          <DeviceDetailTableRow head="購入日">
            {device.purchase_date
              ? dayjs(device.purchase_date).format("YYYY年MM月DD日")
              : "未登録"}
          </DeviceDetailTableRow>

          <DeviceDetailTableRow head="購入金額">
            {device.purchase_price !== null
              ? `¥ ${Number(device.purchase_price).toLocaleString()}`
              : "未登録"}
          </DeviceDetailTableRow>

          {device.retire_date && (
            <>
              <DeviceDetailTableRow head="売却日">
                {dayjs(device.retire_date).format("YYYY年MM月DD日")}
              </DeviceDetailTableRow>

              <DeviceDetailTableRow head="売却金額">
                {device.resale_price !== null
                  ? `¥ ${Number(device.resale_price).toLocaleString()}`
                  : "未登録"}
              </DeviceDetailTableRow>
            </>
          )}
        </DeviceDetailTable>
      </div>
    </div>
  );
};

export default DeviceDetail;
