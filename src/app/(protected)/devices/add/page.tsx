import PageHeading from "@/components/common/PageHeading";

import AddDeviceForm from "./_components/AddDeviceForm";

export default function DeviceAddPage() {
  return (
    <section>
      <PageHeading label="デバイス情報の登録" />
      <AddDeviceForm />
    </section>
  );
}
