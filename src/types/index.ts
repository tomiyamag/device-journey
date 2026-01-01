import {
  Battery,
  Body,
  Camera,
  Comms,
  Display,
  Features,
  Image,
  Manufacturer,
  Memory,
  Misc,
  Network,
  Platform,
  Sound,
} from "./mobile-api";

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

export interface IGetDeviceMobileApiResult {
  id: number;
  name: string;
  manufacturer: Manufacturer;
  manufacturer_name: string;
  device_type: string;
  description: string;
  colors: string;
  storage: string;
  screen_resolution: string;
  weight: string;
  thickness: string;
  release_date: string;
  camera: string;
  battery_capacity: string;
  hardware: string;
  main_image_b64: string;
  images: Image[];
  network: Network;
  body: Body;
  display: Display;
  platform: Platform;
  memory: Memory;
  main_camera: Camera;
  selfie_camera: Camera;
  sound: Sound;
  comms: Comms;
  features: Features;
  battery: Battery;
  misc: Misc;
}
