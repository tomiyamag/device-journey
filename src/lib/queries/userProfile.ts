import { cacheTag } from "next/cache";

import { createAdminClient } from "../supabase/server";

export const getUserProfile = async (userId: string) => {
  "use cache";

  cacheTag(`user-${userId}`);

  const supabaseAdmin = createAdminClient();

  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("DB Error: ", error);
    throw new Error("アカウント情報の取得に失敗しました。");
  }

  return data;
};
