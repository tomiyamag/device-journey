import { cacheTag } from "next/cache";

import { createAdminClient } from "@/lib/supabase/server";

export const getDeviceById = async (userId: string, id: string) => {
  "use cache";

  cacheTag(`devices-${userId}`, `device-${id}`);

  const supabaseAdmin = createAdminClient();

  const { data, error } = await supabaseAdmin
    .from("devices")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    // uuid が不正の場合
    if (error.code === "22P02") {
      return null;
    }

    console.error("DB Error: ", error);
    throw new Error("デバイス情報の取得に失敗しました。");
  }

  return data;
};
