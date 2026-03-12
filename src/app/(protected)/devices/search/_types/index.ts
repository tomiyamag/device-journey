export interface Battery {
  id: number;
  type: string;
  charging: string;
}

export interface Body {
  id: number;
  dimensions: string;
  weight: string;
  build: string;
  sim: string;
  other: string;
}

export interface Comms {
  id: number;
  wlan: string;
  bluetooth: string;
  positioning: string;
  nfc: string;
  radio: string;
  usb: string;
}

export interface Display {
  id: number;
  type: string;
  size: string;
  resolution: string;
  protection: string;
  other: string;
}

export interface Features {
  id: number;
  sensors: string;
  other: string;
}

export interface Camera {
  id: number;
  modules: string;
  features: string;
  video: string;
}

export interface Manufacturer {
  id: number;
  name: string;
  logo_b64: null;
  website_url: null;
}

export interface Memory {
  id: number;
  card_slot: string;
  internal: string;
  other: string;
}

export interface Misc {
  id: number;
  model_numbers: string;
  sar_us: string;
  sar_eu: string;
  price: string;
}

export interface Network {
  id: number;
  technology: string;
  bands_2g: string;
  bands_3g: string;
  bands_4g: string;
  bands_5g: string;
  speed: string;
}

export interface Platform {
  id: number;
  os: string;
  chipset: string;
  cpu: string;
  gpu: string;
}

export interface Sound {
  id: number;
  loudspeaker: string;
  audio_jack: string;
}

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
  image_b64: string;
  image_url: string;
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
