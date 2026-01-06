"use server";

import { SupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { cache } from "react";

import { createClient } from "@/lib/supabase/server";
import { Device, DeviceInput } from "@/types";

import { getUser } from "./user";

export const getDevices = cache(async () => {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return [];
  }

  const { data: rawData, error } = await supabase
    .from("devices")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    console.error("DB Error: ", error);
    throw new Error("登録済みデバイスの取得に失敗しました");
  }

  // NOTE: 購入日が登録されていない場合は登録順、そうでない場合は購入日順に並べ替える
  const data = rawData.sort((a, b) => {
    const aHasPurchase = !!a.purchase_date;
    const bHasPurchase = !!b.purchase_date;

    // 購入日ありを優先
    if (aHasPurchase && !bHasPurchase) {
      return -1;
    }
    if (!aHasPurchase && bHasPurchase) {
      return 1;
    }

    // 購入日ありの場合は購入日の新しい順
    if (aHasPurchase && bHasPurchase) {
      return (
        new Date(b.purchase_date!).getTime() -
        new Date(a.purchase_date!).getTime()
      );
    }

    // 購入日なしの場合は登録日の新しい順
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return data as Device[];
});

export const getDeviceById = cache(async (id: string) => {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    throw new Error();
  }

  const { data, error } = await supabase
    .from("devices")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error("DB Error: ", error);
    throw new Error("デバイス情報の取得に失敗しました");
  }

  return data as Device;
});

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

export async function registerDevice(deviceData: DeviceInput) {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    throw new Error();
  }

  // メインデバイスとして登録された場合
  if (deviceData.is_main) {
    const error = await resetMainDeviceFlags(supabase, user.id);

    if (error) {
      console.error("DB Error: ", error);
      return { error: "メインデバイスの切り替えに失敗しました" };
    }
  }

  const payload = {
    ...deviceData,
    user_id: user.id,
  };

  const { error } = await supabase.from("devices").insert(payload);

  if (error) {
    console.error("DB Error: ", error);
    return {
      error: "デバイスの登録に失敗しました",
    };
  }

  // キャッシュの更新
  revalidatePath("/dashboard");
  revalidatePath("/devices");

  return { success: true };
}

export async function updateDevice(deviceId: string, deviceData: DeviceInput) {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    throw new Error();
  }

  // メインデバイスとして登録された場合
  if (deviceData.is_main) {
    const error = await resetMainDeviceFlags(supabase, user.id);

    if (error) {
      console.error("DB Error: ", error);
      return { error: "メインデバイスの切り替えに失敗しました" };
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
      error: "デバイス情報の更新に失敗しました",
    };
  }

  // キャッシュの更新
  revalidatePath("/dashboard");
  revalidatePath("/devices");
  revalidatePath(`/devices/${deviceId}`);

  return { success: true };
}

export async function deleteDevice(deviceId: string) {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    throw new Error();
  }

  const { error } = await supabase
    .from("devices")
    .delete()
    .eq("id", deviceId)
    .eq("user_id", user.id);

  if (error) {
    console.error("DB Error: ", error);
    return {
      error: "デバイスの削除に失敗しました",
    };
  }

  // キャッシュの更新
  revalidatePath("/dashboard");
  revalidatePath("/devices");
  revalidatePath(`/devices/${deviceId}`);

  return { success: true };
}
