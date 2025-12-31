export type DeviceStatusType = "in_use" | "sold" | "sub";

export interface DeviceSpec {
  display?: string;
  camera?: string;
  battery?: string;
  weight?: string;
  hardware?: string;
  storage?: string;
  colors?: string;
}

export interface Device {
  id: string;
  created_at: string;
  user_id: string;
  name: string;
  brand: string;
  model_name: string;
  price: number;
  image_url: string | null;
  purchase_date: string;
  retire_date: string | null;
  status: DeviceStatusType | null;
  spec: DeviceSpec | null;
}
