"use server";

import { SupabaseClient } from "@supabase/supabase-js";
import { revalidatePath, revalidateTag } from "next/cache";

import { getUser } from "@/lib/queries/user";
import { createClient } from "@/lib/supabase/server";

import { DeviceInput } from "../_types";

// 全デバイスの is_main フラグを false にリセットする
const resetMainDeviceFlags = async (
  supabase: SupabaseClient,
  userId: string,
) => {
  const { error } = await supabase
    .from("devices")
    .update({ is_main: false })
    .eq("user_id", userId);

  return error;
};

// デバイス画像を Base64 に変換
async function resolveDeviceImage(endpoint: string | null | undefined) {
  if (!endpoint) {
    return null;
  }

  // デバイス ID 抽出
  const id = endpoint.split("/").pop();

  if (!id) {
    return null;
  }

  const apiKey = process.env.MOBILE_API_KEY;
  const url = `https://api.mobileapi.dev/devices/${id}/image/?key=${apiKey}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return null;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    return `data:${res.headers.get("Content-Type") || "image/jpeg"};base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

export async function registerDevice(deviceData: DeviceInput) {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    throw new Error("ユーザーが見つかりません。");
  }

  // メインデバイスとして登録された場合
  if (deviceData.is_main) {
    const error = await resetMainDeviceFlags(supabase, user.id);

    if (error) {
      console.error("DB Error: ", error);
      return { error: "メインデバイスの切り替えに失敗しました。" };
    }
  }

  const payload = {
    ...deviceData,
    user_id: user.id,
    image_url: await resolveDeviceImage(deviceData.image_url),
  };

  const { error } = await supabase.from("devices").insert(payload);

  if (error) {
    console.error("DB Error: ", error);
    return {
      error: "デバイスの登録に失敗しました。",
    };
  }

  // キャッシュの更新
  revalidatePath("/");
  revalidatePath("/devices");

  return { success: true };
}

export async function updateDevice(deviceId: string, deviceData: DeviceInput) {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    throw new Error("ユーザーが見つかりません。");
  }

  // メインデバイスとして登録された場合
  if (deviceData.is_main) {
    const error = await resetMainDeviceFlags(supabase, user.id);

    if (error) {
      console.error("DB Error: ", error);
      return { error: "メインデバイスの切り替えに失敗しました。" };
    }
  }

  const payload = {
    ...deviceData,
  };

  const { error } = await supabase
    .from("devices")
    .update(payload)
    .eq("id", deviceId)
    .eq("user_id", user.id);

  if (error) {
    console.error("DB Error: ", error);
    return {
      error: "デバイス情報の更新に失敗しました。",
    };
  }

  revalidateTag(`devices-${user.id}`, "max");

  return { success: true };
}

export async function deleteDevice(deviceId: string) {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    throw new Error("ユーザーが見つかりません。");
  }

  const { error } = await supabase
    .from("devices")
    .delete()
    .eq("id", deviceId)
    .eq("user_id", user.id);

  if (error) {
    console.error("DB Error: ", error);
    return {
      error: "デバイスの削除に失敗しました。",
    };
  }

  revalidateTag(`devices-${user.id}`, "max");

  return { success: true };
}
