import Link from "next/link";
import { Suspense } from "react";
import { FiPlus } from "react-icons/fi";

import PageHeading from "@/components/atoms/PageHeading";
import BackHome from "@/components/molecules/BackHome";
import DeviceList from "@/components/molecules/DeviceList";

export default function DevicesPage() {
  return (
    <section>
      <PageHeading label="登録デバイス一覧" />

      <div className="flex flex-col gap-4">
        <div className="text-right text-sm">
          <Link
            href="/devices/search"
            className="inline-block transition-opacity hover:opacity-80"
          >
            <div className="inline-flex items-center gap-1.5 text-teal-600 font-bold">
              <FiPlus />
              <span>新規追加</span>
            </div>
          </Link>
        </div>

        <Suspense fallback={"ロード中"}>
          <DeviceList />
        </Suspense>
      </div>

      <BackHome />
    </section>
  );
}
