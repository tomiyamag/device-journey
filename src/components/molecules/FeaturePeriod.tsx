import dayjs from "dayjs";
import { FaFire } from "react-icons/fa";

import { Device } from "@/types";

import Feature from "../atoms/Feature";

interface IFeaturePeriod {
  device: Device;
}

const FeaturePeriod = ({ device }: IFeaturePeriod) => {
  const { purchase_date, retire_date } = device;

  const days = () => {
    if (!purchase_date) {
      return "--";
    }

    const start = dayjs(purchase_date).startOf("day");
    const end = retire_date
      ? dayjs(retire_date).startOf("day")
      : dayjs().startOf("day");
    const diff = (end.diff(start, "day") + 1).toLocaleString();

    return diff;
  };
  return (
    <Feature icon={FaFire} title="使用期間" className="text-pink-500 w-1/3">
      <div>{days()} 日</div>
    </Feature>
  );
};

export default FeaturePeriod;
