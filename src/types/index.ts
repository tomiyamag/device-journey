export type DeviceStatusType = "in_use" | "sold" | "sub";

// TODO: あとで直す
export interface IDeviceSpec {
  display?: string;
  camera?: string;
  battery?: string;
  weight?: string;
  hardware?: string;
  storage?: string;
  colors?: string;
}

// TODO: あとで直す
export interface IDevice {
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
  spec: IDeviceSpec | null;
}

export interface IAutocompleteMobileApiResult {
  id: number;
  name: string;
  brand: string;
  full_name: string;
}
