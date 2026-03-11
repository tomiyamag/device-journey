import PickupButton from "./PickupButton";

const Pickups = () => {
  return (
    <div className="flex gap-2">
      <PickupButton emoji="📱" label="デバイス追加" href="/devices/search" />
      <PickupButton emoji="📍" label="チェックイン" comingSoon />
      <PickupButton emoji="📈" label="コスト推移" comingSoon />
    </div>
  );
};

export default Pickups;
