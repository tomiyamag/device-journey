import classNames from "classnames";

export type DeviceStatusType = "is_main" | "is_sub" | "is_sold";

interface IDeviceStatusBadge {
  className?: string;
  status: DeviceStatusType | null;
}

const DEVICE_STATUS_MAP: Record<
  DeviceStatusType,
  {
    label: string;
    theme: string;
  }
> = {
  is_main: {
    label: "使用中",
    theme: "bg-teal-600",
  },
  is_sold: {
    label: "売却済み",
    theme: "bg-stone-400",
  },
  is_sub: {
    label: "サブ機",
    theme: "bg-yellow-500",
  },
};

const DeviceStatusBadge = ({ className, status }: IDeviceStatusBadge) => {
  if (!status) {
    return null;
  }

  const { label, theme } = DEVICE_STATUS_MAP[status];

  return (
    <div
      className={classNames(
        "text-[0.6875rem] text-white rounded-sm px-2 py-1 font-bold",
        theme,
        className,
      )}
    >
      {label}
    </div>
  );
};

export default DeviceStatusBadge;
