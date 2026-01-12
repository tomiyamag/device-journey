import Pickups from "@/components/molecules/Pickups";
import ActiveDevice from "@/components/organisms/ActiveDevice";
import OtherDevices from "@/components/organisms/OtherDevices";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-9">
      <section>
        <div className="flex flex-col gap-2">
          <ActiveDevice />
          <Pickups />
        </div>
      </section>

      <section>{/* <OtherDevices /> */}</section>
    </div>
  );
}
