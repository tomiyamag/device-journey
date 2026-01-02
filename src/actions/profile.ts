import { cache } from "react";

import { createClient } from "@/lib/supabase/server";
import { UserProfile } from "@/types";

import { getUser } from "./user";

export const getUserProfile = cache(async () => {
  const supabase = await createClient();
  const user = await getUser();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  if (error) {
    console.error("DB Error: ", error);
    throw new Error("プロフィールの取得に失敗しました");
  }

  return data as UserProfile;
});
