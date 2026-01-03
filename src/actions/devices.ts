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
    throw new Error("デバイス情報の取得に失敗しました");
  }

  // NOTE: 購入日が null の場合は追加順、そうでない場合は購入日順に並べ替える
  const data = rawData.sort((a, b) => {
    const dateA = new Date(a.purchase_date || a.created_at).getTime();
    const dateB = new Date(b.purchase_date || b.created_at).getTime();
    return dateB - dateA;
  });

  return data as Device[];
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
