import BackHome from "@/components/common/BackHome";
import PageHeading from "@/components/common/PageHeading";

import ResultDevice from "./_components/ResultDevice";
import SearchDevice from "./_components/SearchDevice";

export default function DevicesSearchPage() {
  return (
    <section>
      <div className="flex flex-col gap-9">
        <div>
          <PageHeading label="新規追加するデバイスを検索" />
          <SearchDevice />
        </div>

        <ResultDevice />
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
