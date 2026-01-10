"use server";

import { revalidatePath } from "next/cache";
import { cache } from "react";

import { createClient } from "@/lib/supabase/server";
import { UserProfileInput } from "@/types";

import { getUser } from "./user";

export const getUserProfile = cache(async () => {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    throw new Error();
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("DB Error: ", error);
    throw new Error("プロフィールの取得に失敗しました");
  }

  return data;
});

export const updateUserProfile = cache(
  async (userProfileData: UserProfileInput) => {
    const supabase = await createClient();
    const user = await getUser();

    if (!user) {
      throw new Error();
    }

    const { error } = await supabase.from("profiles").upsert({
      ...userProfileData,
      id: user.id,
    });

    if (error) {
      console.error("DB Error: ", error);
      return {
        error: "プロフィールの更新に失敗しました",
      };
    }

    // キャッシュの更新
    revalidatePath("/", "layout");

    return { success: true };
  },
);

export const uploadUserAvatar = cache(async (filePath: string, file: File) => {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    throw new Error();
  }

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  if (error) {
    console.error("DB Error: ", error);
    return {
      error: "プロフィール画像のアップロードに失敗しました",
    };
  }

  // キャッシュの更新
  revalidatePath("/", "layout");

  return { success: true };
});
