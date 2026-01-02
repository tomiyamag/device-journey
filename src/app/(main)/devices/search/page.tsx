"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import PageHeading from "@/components/atoms/PageHeading";
import BackHome from "@/components/molecules/BackHome";
import SearchDeviceForm from "@/components/molecules/SearchDeviceForm";
import SearchDeviceResult from "@/components/molecules/SearchDeviceResult";
import { useDeviceSearchStore } from "@/store/useDeviceSearchStore";

const queryClient = new QueryClient();

export default function DevicesSearchPage() {
  const { selectedDeviceId } = useDeviceSearchStore();

  return (
    <QueryClientProvider client={queryClient}>
      <section>
        <div className="flex flex-col gap-9">
          <div>
            <PageHeading label="新規登録する端末を検索" />
            <SearchDeviceForm />
          </div>

          {selectedDeviceId && (
            <SearchDeviceResult deviceId={selectedDeviceId} />
          )}
        </div>

        <BackHome />
      </section>
    </QueryClientProvider>
  );
}
