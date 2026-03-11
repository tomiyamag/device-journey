import {
  AutocompleteDeviceMobileApiResult,
  GetDeviceMobileApiResult,
} from "../_types";

const apiKey = process.env.MOBILE_API_KEY;
const baseUrl = "https://api.mobileapi.dev";

/**
 * @see https://mobileapi.dev/docs/
 */
export const autocompleteMobileDevices = async (query: string) => {
  if (!query) {
    return [];
  }

  try {
    const url = `${baseUrl}/devices/autocomplete/?q=${encodeURIComponent(query)}&limit=30&key=${apiKey}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("MobileAPI Error");
    }

    const data = await res.json();
    return data as AutocompleteDeviceMobileApiResult[];
  } catch (error) {
    console.error("Autocomplete failed: ", error);
    throw error;
  }
};

export const getMobileDevice = async (id: number) => {
  if (!id) {
    return null;
  }

  try {
    const url = `${baseUrl}/devices/${id}/?key=${apiKey}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("MobileAPI Error");
    }

    const data = await res.json();
    return data as GetDeviceMobileApiResult;
  } catch (error) {
    console.error("Get device failed: ", error);
    throw error;
  }
};

// デバイス画像を取得して Base64 に変換
export const resolveMobileDeviceImage = async (id: number) => {
  if (!id) {
    return null;
  }

  try {
    const url = `${baseUrl}/devices/${id}/image/?key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 300 } });

    if (!res.ok) {
      return null;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    return `data:${res.headers.get("Content-Type") || "image/jpeg"};base64,${buffer.toString("base64")}`;
  } catch (error) {
    console.error("Get device image failed: ", error);
    throw error;
  }
};
