type Battery = {
  id: number;
  type: string;
  charging: string;
};

type Body = {
  id: number;
  dimensions: string;
  weight: string;
  build: string;
  sim: string;
  other: string;
};

type Comms = {
  id: number;
  wlan: string;
  bluetooth: string;
  positioning: string;
  nfc: string;
  radio: string;
  usb: string;
};

type Display = {
  id: number;
  type: string;
  size: string;
  resolution: string;
  protection: string;
  other: string;
};

type Features = {
  id: number;
  sensors: string;
  other: string;
};

type Image = {
  id: number;
  image_url: string;
  image_b64: string;
  caption: string;
  is_official: boolean;
  order: number;
};

type Camera = {
  id: number;
  modules: string;
  features: string;
  video: string;
};

type Manufacturer = {
  id: number;
  name: string;
  logo_b64: null;
  website_url: null;
};

type Memory = {
  id: number;
  card_slot: string;
  internal: string;
  other: string;
};

type Misc = {
  id: number;
  model_numbers: string;
  sar_us: string;
  sar_eu: string;
  price: string;
};

type Network = {
  id: number;
  technology: string;
  bands_2g: string;
  bands_3g: string;
  bands_4g: string;
  bands_5g: string;
  speed: string;
};

type Platform = {
  id: number;
  os: string;
  chipset: string;
  cpu: string;
  gpu: string;
};

type Sound = {
  id: number;
  loudspeaker: string;
  audio_jack: string;
};

export type AutocompleteDeviceMobileApiResult = {
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
