import { Suspense } from "react";

import EditDeviceFormContainer from "./_components/EditDeviceFormContainer";
import EditDeviceFormSkeleton from "./_components/EditDeviceFormSkeleton";

interface Props {
  params: Promise<{ id: string }>;
}

export default function DeviceEditPage({ params }: Props) {
  return (
    <section>
      <Suspense fallback={<EditDeviceFormSkeleton />}>
        <EditDeviceFormContainer params={params} />
      </Suspense>
    </section>
  );
}
