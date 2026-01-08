import DeviceEditContainer from "@/components/organisms/DeviceEditContainer";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DeviceEditPage({ params }: Props) {
  const { id } = await params;

  return (
    <section>
      <DeviceEditContainer id={id} />
    </section>
  );
}
