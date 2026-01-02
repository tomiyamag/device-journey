"use client";

import PickupButton from "../atoms/PickupButton";

const Pickups = () => {
  return (
    <div className="flex gap-2">
      <PickupButton emoji="📱" label="デバイス登録" href="/devices/search" />
      <PickupButton emoji="📍" label="チェックイン" onClick={() => {}} />
      <PickupButton emoji="📈" label="コスト推移" onClick={() => {}} />
    </div>
  );
};

export default Pickups;
