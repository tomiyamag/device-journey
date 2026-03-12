import { PiDeviceMobileSlashBold } from "react-icons/pi";

import BackHome from "@/components/common/BackHome";
import PageHeading from "@/components/common/PageHeading";

export default function notFound() {
  return (
    <section>
      <PageHeading label="デバイスが見つかりません" />

      <div className="text-sm flex flex-col gap-12 justify-center items-center py-10">
        <PiDeviceMobileSlashBold size={100} className="text-neutral-400" />
        <div className="text-center">
          お探しのデバイス情報は存在しないか、
          <br className="md:hidden" />
          すでに削除された可能性があります。
        </div>
      </div>

      <BackHome
        prevItem={{
          href: "/devices",
          label: "マイデバイス",
        }}
      />
    </section>
  );
}
