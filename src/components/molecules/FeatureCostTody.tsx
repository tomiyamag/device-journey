"use client";

import dayjs from "dayjs";
import { useState } from "react";
import { FaCoffee } from "react-icons/fa";

import { Device } from "@/types";

import Feature from "../atoms/Feature";
import DialogFeatureCostToday from "./DialogFeatureCostToday";

interface IWrapper {
  title: string;
  dailyCost: string;
  dashboard?: boolean;
}

interface IFeatureCostToday {
  device: Device;
  dashboard?: boolean;
}

const Wrapper = ({ title, dailyCost, dashboard }: IWrapper) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <DialogFeatureCostToday isOpen={isOpen} setIsOpen={setIsOpen} />
      <Feature
        icon={FaCoffee}
        title={title}
        className="text-amber-900"
        info={{ onClick: handleClick }}
        dashboard={dashboard}
      >
        <div>¥ {dailyCost}</div>
      </Feature>
    </>
  );
};

const DEFAULT_TITLE_LABEL = "今日のコスト";

const FeatureCostToday = ({ device, dashboard }: IFeatureCostToday) => {
  const { purchase_date, purchase_price, retire_date, resale_price } = device;

  const today = dayjs().startOf("day");

  if (!purchase_date || !purchase_price) {
    return (
      <Wrapper
        title={DEFAULT_TITLE_LABEL}
        dailyCost="--"
        dashboard={dashboard}
      />
    );
  }

  const start = dayjs(purchase_date);

  // 売却日があればそこまで、なければ今日までを指定
  const end = retire_date ? dayjs(retire_date) : today;

  // 経過日数
  const diffDays = end.diff(start, "day") + 1;

  let costBasis = Number(purchase_price);

  // 売却日と売却金額の両方が登録されている場合は差し引く
  if (retire_date && resale_price) {
    costBasis = costBasis - Number(resale_price);
  }

  const dailyCost = Math.round(costBasis / diffDays);
  const title = retire_date ? "1日あたりのコスト" : DEFAULT_TITLE_LABEL;

  return (
    <Wrapper
      title={title}
      dailyCost={dailyCost.toLocaleString()}
      dashboard={dashboard}
    />
  );
};

export default FeatureCostToday;
