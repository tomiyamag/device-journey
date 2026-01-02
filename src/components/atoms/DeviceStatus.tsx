import classNames from "classnames";

import { DeviceStatus } from "@/types";

interface DeviceStatus {
  className?: string;
  status?: DeviceStatus;
}

const DEVICE_STATUS_MAP: Record<
  DeviceStatus,
  {
    label: string;
    theme: string;
  }
> = {
  in_use: {
    label: "使用中",
    theme: "bg-emerald-500 text-white",
  },
  sold: {
    label: "売却済み",
    theme: "border border-gray-400 bg-white text-gray-500",
  },
  sub: {
    label: "サブ機",
    theme: "bg-yellow-400 text-white",
  },
};

const DeviceStatus = ({ className, status }: DeviceStatus) => {
  if (!status) return;

  const { label, theme } = DEVICE_STATUS_MAP[status];

  return (
    <div
      className={classNames(
        "text-xs rounded-sm px-2 py-1 font-bold",
        theme,
        className,
      )}
    >
      {label}
    </div>
  );
};

export default DeviceStatus;
