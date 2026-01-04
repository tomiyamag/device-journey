import { FaMoneyBills } from "react-icons/fa6";

import { Device } from "@/types";

import Feature from "../atoms/Feature";

interface IFeaturePrice {
  device: Device;
}

const FeaturePrice = ({ device }: IFeaturePrice) => {
  const purchasePrice = device.purchase_price;

  const price = () => {
    if (!purchasePrice) {
      return "--";
    }
    return Number(purchasePrice).toLocaleString();
  };

  return (
    <Feature icon={FaMoneyBills} title="購入金額" className="text-sky-500">
      <div>¥ {price()}</div>
    </Feature>
  );
};

export default FeaturePrice;
