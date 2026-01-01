import Pickups from "@/components/molecules/Pickups";
import ActiveDevice from "@/components/organisms/ActiveDevice";
import OtherDevices from "@/components/organisms/OtherDevices";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col gap-2">
        <ActiveDevice />
        <Pickups />
      </div>

      <div>
        <OtherDevices />
      </div>
    </div>
  );
}
