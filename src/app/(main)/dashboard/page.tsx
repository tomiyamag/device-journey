import InformationHeading from "@/components/atoms/InformationHeading";
import ManageLink from "@/components/atoms/ManageLink";
import Pickups from "@/components/molecules/Pickups";
import ActiveDevice from "@/components/organisms/ActiveDevice";
import DevicesSlider from "@/components/organisms/DevicesSlider";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col gap-2">
        <ActiveDevice />
        <Pickups />
      </div>

      <div>
        <InformationHeading
          action={<ManageLink href="/devices" label="端末を管理" />}
        >
          その他のデバイス
        </InformationHeading>

        <DevicesSlider />
      </div>
    </div>
  );
}
