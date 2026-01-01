"use server";

import { IAutocompleteMobileApiResult } from "@/types";

/**
 * @see https://mobileapi.dev/docs/
 */
export async function autocompleteMobileDevices(query: string) {
  // TODO: 仮 response。あとで消す
  const mockApi = [
    {
      id: 862,
      name: "iPhone",
      brand: "Apple",
      full_name: "Apple iPhone",
    },
    {
      id: 29,
      name: "iPhone 11",
      brand: "Apple",
      full_name: "Apple iPhone 11",
    },
    {
      id: 31,
      name: "iPhone 11 Pro",
      brand: "Apple",
      full_name: "Apple iPhone 11 Pro",
    },
    {
      id: 30,
      name: "iPhone 11 Pro Max",
      brand: "Apple",
      full_name: "Apple iPhone 11 Pro Max",
    },
    {
      id: 750,
      name: "iPhone 12",
      brand: "Apple",
      full_name: "Apple iPhone 12",
    },
    {
      id: 752,
      name: "iPhone 12 Pro",
      brand: "Apple",
      full_name: "Apple iPhone 12 Pro",
    },
    {
      id: 751,
      name: "iPhone 12 Pro Max",
      brand: "Apple",
      full_name: "Apple iPhone 12 Pro Max",
    },
    {
      id: 32,
      name: "iPhone 12 mini",
      brand: "Apple",
      full_name: "Apple iPhone 12 mini",
    },
    {
      id: 753,
      name: "iPhone 13",
      brand: "Apple",
      full_name: "Apple iPhone 13",
    },
    {
      id: 755,
      name: "iPhone 13 Pro",
      brand: "Apple",
      full_name: "Apple iPhone 13 Pro",
    },
    {
      id: 756,
      name: "Text Device 1",
      brand: "Apple",
      full_name: "Apple iPhone 13 Pro",
    },
    {
      id: 757,
      name: "Text Device 2",
      brand: "Apple",
      full_name: "Apple iPhone 13 Pro",
    },
    {
      id: 758,
      name: "Text Device 3",
      brand: "Apple",
      full_name: "Apple iPhone 13 Pro",
    },
  ] as IAutocompleteMobileApiResult[];

  return mockApi;

  if (!query) {
    return [];
  }

  const apiKey = process.env.MOBILE_API_KEY;

  try {
    const url = `https://api.mobileapi.dev/devices/search?name=${encodeURIComponent(query)}&key=${apiKey}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("API Error");
    }

    const data = await res.json();
    return data as IAutocompleteMobileApiResult[];
  } catch (error) {
    console.error("Search failed:", error);
    return [];
  }
}
