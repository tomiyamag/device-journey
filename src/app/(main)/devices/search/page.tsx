"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import PageHeading from "@/components/atoms/PageHeading";
import SearchDeviceForm from "@/components/molecules/SearchDeviceForm";
import SearchDeviceResult from "@/components/molecules/SearchDeviceResult";

const queryClient = new QueryClient();

export default function DevicesSearchPage() {
  const [deviceId, setDeviceId] = useState<number | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <section>
        <div className="flex flex-col gap-9">
          <div>
            <PageHeading label="新規登録する端末を検索" />
            <SearchDeviceForm onDeviceSelected={(id) => setDeviceId(id)} />
          </div>

          {deviceId && <SearchDeviceResult deviceId={deviceId} />}
        </div>
      </section>
    </QueryClientProvider>
  );
}
