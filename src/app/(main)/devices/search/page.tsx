import PageHeading from "@/components/atoms/PageHeading";
import BackHome from "@/components/molecules/BackHome";
import SearchDeviceForm from "@/components/molecules/SearchDeviceForm";
import SearchDeviceResult from "@/components/molecules/SearchDeviceResult";

export default function DevicesSearchPage() {
  return (
    <section>
      <div className="flex flex-col gap-9">
        <div>
          <PageHeading label="新規追加するデバイスを検索" />
          <SearchDeviceForm />
        </div>

        <SearchDeviceResult />
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
