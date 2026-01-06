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

export type UserProfileInput = {
  username: string | null;
  avatar_url: string | null;
};

export type UserProfile = UserProfileInput & {
  readonly id: string;
  readonly created_at: Date;
  readonly updated_at: Date;
};

export type DeviceSpec = {
  display: string;
  camera: string;
  battery: string;
  weight: string;
  hardware: string;
  storage: string;
};

export type DeviceInput = {
  name: string;
  brand: string;
  purchase_price: string | null;
  purchase_date: string | null;
  retire_date: string | null;
  image_url: string | null;
  spec: DeviceSpec;
  release_date: string | null;
  colors: string;
  color: string | null;
  storage: string | null;
  is_sub: boolean;
  is_main: boolean;
  resale_price: string | null;
};

export type DeviceInputDraft = DeviceInput & {
  candidate_colors: string[];
  candidate_storages: string[];
};

export type Device = DeviceInput & {
  readonly id: string;
  readonly created_at: Date;
  readonly user_id: string;
};

export type AutocompleteMobileApiResult = {
  id: number;
  name: string;
  brand: string;
  full_name: string;
};

/**
 * NOTE: 型定義未提供のため、実際のレスポンスをもとに定義
 * @remarks 使用時は値の存在チェックを行うこと
 */
export type GetDeviceMobileApiResult = {
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
};
