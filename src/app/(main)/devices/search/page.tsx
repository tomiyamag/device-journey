"use client";

import PageHeading from "@/components/atoms/PageHeading";
import BackHome from "@/components/molecules/BackHome";
import SearchDeviceForm from "@/components/molecules/SearchDeviceForm";
import SearchDeviceResult from "@/components/molecules/SearchDeviceResult";
import { useDeviceSearchStore } from "@/store/useDeviceSearchStore";

export default function DevicesSearchPage() {
  const { selectedDeviceId } = useDeviceSearchStore();

  return (
    <section>
      <div className="flex flex-col gap-9">
        <div>
          <PageHeading label="新規登録するデバイスを検索" />
          <SearchDeviceForm />
        </div>

        {selectedDeviceId && <SearchDeviceResult deviceId={selectedDeviceId} />}
      </div>

      <BackHome />
    </section>
  );
}
