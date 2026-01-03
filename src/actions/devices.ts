"use server";

import { revalidatePath } from "next/cache";
import { cache } from "react";

import { createClient } from "@/lib/supabase/server";
import { Device, DeviceInput } from "@/types";

import { getUser } from "./user";

export const getDevices = cache(async () => {
  const supabase = await createClient();
  const user = await getUser();

  const { data: rawData, error } = await supabase
    .from("devices")
    .select("*")
    .eq("user_id", user?.id);

  if (error) {
    console.error("DB Error: ", error);
    throw new Error("デバイス一覧の取得に失敗しました");
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

  const { data, error } = await supabase
    .from("devices")
    .select("*")
    .eq("id", id)
    .eq("user_id", user?.id)
    .single();

  if (error) {
    console.error("DB Error: ", error);
    throw new Error("デバイス情報の取得に失敗しました");
  }

  return data as Device;
});

export async function registerDevice(deviceData: DeviceInput) {
  const supabase = await createClient();
  const user = await getUser();

  // メインデバイスとして登録された場合は、他のデバイスの is_main を全て false にする
  if (deviceData.is_main) {
    const { error: updateError } = await supabase
      .from("devices")
      .update({ is_main: false })
      .eq("user_id", user?.id);

    if (updateError) {
      console.error("DB Error: ", updateError);
      return {
        error: "メインデバイスの切り替えに失敗しました",
      };
    }
  }

  const payload = {
    ...deviceData,
    user_id: user?.id,
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
