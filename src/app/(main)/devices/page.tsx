import PageHeading from "@/components/atoms/PageHeading";
import BackHome from "@/components/molecules/BackHome";
import DeviceList from "@/components/molecules/DeviceList";

export default function DevicesPage() {
  return (
    <section>
      <PageHeading label="デバイス管理" />
      <DeviceList />
      <BackHome />
    </section>
  );
}
