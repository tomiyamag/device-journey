import { cacheTag } from "next/cache";

import { createAdminClient } from "../supabase/server";

export const getDevices = async (userId: string) => {
  "use cache";

  cacheTag(`devices-${userId}`);

  const supabaseAdmin = createAdminClient();

  const { data: rawData, error } = await supabaseAdmin
    .from("devices")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("DB Error: ", error);
    throw new Error("登録済みデバイスの取得に失敗しました。");
  }

  // NOTE: 購入日が登録されていない場合は登録順、そうでない場合は購入日順に並べ替える
  const data = rawData.sort((a, b) => {
    const dateA = new Date(a.purchase_date || a.created_at).getTime();
    const dateB = new Date(b.purchase_date || b.created_at).getTime();
    return dateB - dateA;
  });

  return data;
};
