import dayjs from "dayjs";
import { FaFire } from "react-icons/fa";

import { Device } from "@/types";

import Feature from "../atoms/Feature";

interface IFeaturePeriod {
  device: Device;
}

const FeaturePeriod = ({ device }: IFeaturePeriod) => {
  const purchaseDate = device.purchase_date;

  const days = () => {
    if (!purchaseDate) {
      return "--";
    }
    return dayjs().diff(dayjs(purchaseDate), "day").toLocaleString();
  };

  return (
    <Feature icon={FaFire} title="使用期間" className="text-pink-500 w-1/3">
      <div>{days()} 日目</div>
    </Feature>
  );
};

export default FeaturePeriod;
