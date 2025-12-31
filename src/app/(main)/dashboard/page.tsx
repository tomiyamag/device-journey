"use client";

import InformationCard from "@/components/atoms/InformationCard";
import PickupButton from "@/components/atoms/PickupButton";
import ActiveDevice from "@/components/organisms/ActiveDevice";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col gap-2">
        <ActiveDevice />

        <div className="flex gap-2">
          <PickupButton emoji="📱" label="端末登録" onClick={() => {}} />
          <PickupButton emoji="📍" label="チェックイン" onClick={() => {}} />
          <PickupButton emoji="📈" label="コスト推移" onClick={() => {}} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <InformationCard header={<>iPhone 15 Pro</>}>
          <></>
        </InformationCard>

        <InformationCard header={<>Google Pixel 4</>}>
          <></>
        </InformationCard>

        <InformationCard header={<>Google Pixel 5a</>}>
          <></>
        </InformationCard>
      </div>
    </div>
  );
}
