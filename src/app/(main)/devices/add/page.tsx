import PageHeading from "@/components/atoms/PageHeading";
import AddDeviceForm from "@/components/organisms/AddDeviceForm";

export default function DeviceAddPage() {
  return (
    <section>
      <PageHeading label="デバイス情報の登録" />
      <AddDeviceForm />
    </section>
  );
}
