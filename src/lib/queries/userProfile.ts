import { cache } from "react";

import { createClient } from "../supabase/server";
import { getUser } from "./user";

export const getUserProfile = cache(async () => {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    throw new Error("ユーザーが見つかりません。");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("DB Error: ", error);
    throw new Error("アカウント情報の取得に失敗しました。");
  }

  return data;
});
