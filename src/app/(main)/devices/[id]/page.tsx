import BackHome from "@/components/molecules/BackHome";
import DeviceDetailContainer from "@/components/organisms/DeviceDetailContainer";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DeviceDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <section>
      <DeviceDetailContainer id={id} />
      <BackHome
        prevItem={{
          href: "/devices",
          label: "マイデバイス",
        }}
      />
    </section>
  );
}
