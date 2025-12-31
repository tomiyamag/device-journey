import InformationHeading from "@/components/atoms/InformationHeading";
import ManageLink from "@/components/atoms/ManageLink";
import DevicesSlider from "@/components/molecules/DevicesSlider";
import Pickups from "@/components/molecules/Pickups";
import ActiveDevice from "@/components/organisms/ActiveDevice";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col gap-2">
        <ActiveDevice />
        <Pickups />
      </div>

      {/* <div className="flex flex-col gap-4">
        <InformationCard header={<>iPhone 15 Pro</>}>
          <></>
        </InformationCard>

        <InformationCard header={<>Google Pixel 4</>}>
          <></>
        </InformationCard>

        <InformationCard header={<>Google Pixel 5a</>}>
          <></>
        </InformationCard>
      </div> */}

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
