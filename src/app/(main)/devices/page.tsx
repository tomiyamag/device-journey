import { Suspense } from "react";

import PageHeading from "@/components/atoms/PageHeading";
import BackHome from "@/components/molecules/BackHome";
import DeviceList from "@/components/molecules/DeviceList";

export default function DevicesPage() {
  return (
    <section>
      <PageHeading label="登録デバイス一覧" />

      <Suspense fallback={"ロード中"}>
        <DeviceList />
      </Suspense>

      <BackHome />
    </section>
  );
}
