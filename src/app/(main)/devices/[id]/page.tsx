import { getDeviceById } from "@/actions/devices";
import BackHome from "@/components/molecules/BackHome";
import FeatureCostToday from "@/components/molecules/FeatureCostTody";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DeviceDetailPage({ params }: Props) {
  const { id } = await params;
  const device = await getDeviceById(id);

  return (
    <section>
      <div>デバイス詳細</div>

      <div>デバイス ID: {id}</div>

      <div>購入日: {device.purchase_date}</div>
      <div>購入金額: {device.purchase_price}</div>

      <div>売却日: {device.retire_date}</div>
      <div>売却金額: {device.resale_price}</div>

      <FeatureCostToday device={device} />

      <BackHome />
    </section>
  );
}
