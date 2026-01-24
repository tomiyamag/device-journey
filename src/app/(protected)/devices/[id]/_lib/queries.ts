import { cache } from "react";

import { getUser } from "@/lib/queries/user";
import { createClient } from "@/lib/supabase/server";

export const getDeviceById = cache(async (id: string) => {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    throw new Error("ユーザーが見つかりません。");
  }

  const { data, error } = await supabase
    .from("devices")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) {
    console.error("DB Error: ", error);
    throw new Error("デバイス情報の取得に失敗しました。");
  }

  return data;
});
