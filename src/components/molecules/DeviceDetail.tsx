"use client";

import classNames from "classnames";
import dayjs from "dayjs";
import Image from "next/image";
import { GrStorage } from "react-icons/gr";
import { IoMdColorPalette } from "react-icons/io";
import { MdOutlineImageNotSupported } from "react-icons/md";

import { Device } from "@/types";

import DeviceSpec from "../atoms/DeviceSpec";
import DeviceStatusBadge from "../atoms/DeviceStatusBadge";
import DeviceTag from "../atoms/DeviceTag";
import { getDeviceStatus } from "../organisms/DevicesSlider";
import DeviceDetailTable from "./DeviceDetailTable";
import DeviceDetailTableRow from "./DeviceDetailTableRow";
import FeatureCostToday from "./FeatureCostTody";
import FeaturePeriod from "./FeaturePeriod";

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
            {device.storage || "ストレージ容量未登録"}
          </span>
        </DeviceTag>

        <DeviceTag size="lg">
          <IoMdColorPalette />
          <span className="font-bold">{device.color || "カラー未登録"}</span>
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
              {device.spec.storage.split(", ").map((item, index) => (
                <span
                  key={item}
                  className={classNames({
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
          }
          size="lg"
        />
      </div>

      <DeviceDetailTable>
        <DeviceDetailTableRow head="発売日">
          {device.release_date}
        </DeviceDetailTableRow>

        <DeviceDetailTableRow head="本体カラー">
          {device.colors.split(", ").map((color, index) => (
            <span
              key={color}
              className={classNames({
                "font-bold": color === device.color,
              })}
            >
              {color}
              {index === device.colors.split(", ").length - 1 ? "" : ", "}
            </span>
          ))}
        </DeviceDetailTableRow>

        <DeviceDetailTableRow head="購入日">
          {device.purchase_date
            ? dayjs(device.purchase_date).format("YYYY年MM月DD日")
            : "未登録"}
        </DeviceDetailTableRow>

        <DeviceDetailTableRow head="購入金額">
          {device.purchase_price
            ? `¥ ${Number(device.purchase_price).toLocaleString()}`
            : "未登録"}
        </DeviceDetailTableRow>

        {device.retire_date && (
          <>
            <DeviceDetailTableRow head="売却日">
              {dayjs(device.retire_date).format("YYYY年MM月DD日")}
            </DeviceDetailTableRow>

            <DeviceDetailTableRow head="売却金額">
              {device.resale_price
                ? `¥ ${Number(device.resale_price).toLocaleString()}`
                : "未登録"}
            </DeviceDetailTableRow>
          </>
        )}
      </DeviceDetailTable>
    </div>
  );
};

export default DeviceDetail;
