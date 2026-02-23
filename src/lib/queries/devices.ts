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

  return data;
};
