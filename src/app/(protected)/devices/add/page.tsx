import { Suspense } from "react";

import PageHeading from "@/components/common/PageHeading";
import Spinner from "@/components/ui/Spinner";

import AddDeviceFormContainer from "./_components/AddDeviceFormContainer";

export default function DeviceAddPage() {
  return (
    <section>
      <PageHeading label="デバイス情報の登録" />

      <Suspense fallback={<Spinner className="py-34" />}>
        <AddDeviceFormContainer />
      </Suspense>
    </section>
  );
}
