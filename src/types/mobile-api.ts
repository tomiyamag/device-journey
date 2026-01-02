export type Battery = {
  id: number;
  type: string;
  charging: string;
};

export type Body = {
  id: number;
  dimensions: string;
  weight: string;
  build: string;
  sim: string;
  other: string;
};

export type Comms = {
  id: number;
  wlan: string;
  bluetooth: string;
  positioning: string;
  nfc: string;
  radio: string;
  usb: string;
};

export type Display = {
  id: number;
  type: string;
  size: string;
  resolution: string;
  protection: string;
  other: string;
};

export type Features = {
  id: number;
  sensors: string;
  other: string;
};

export type Image = {
  id: number;
  image_url: string;
  image_b64: string;
  caption: string;
  is_official: boolean;
  order: number;
};

export type Camera = {
  id: number;
  modules: string;
  features: string;
  video: string;
};

export type Manufacturer = {
  id: number;
  name: string;
  logo_b64: null;
  website_url: null;
};

export type Memory = {
  id: number;
  card_slot: string;
  internal: string;
  other: string;
};

export type Misc = {
  id: number;
  model_numbers: string;
  sar_us: string;
  sar_eu: string;
  price: string;
};

export type Network = {
  id: number;
  technology: string;
  bands_2g: string;
  bands_3g: string;
  bands_4g: string;
  bands_5g: string;
  speed: string;
};

export type Platform = {
  id: number;
  os: string;
  chipset: string;
  cpu: string;
  gpu: string;
};

export type Sound = {
  id: number;
  loudspeaker: string;
  audio_jack: string;
};
