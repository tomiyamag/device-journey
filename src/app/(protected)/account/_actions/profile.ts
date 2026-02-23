"use server";

import { revalidatePath } from "next/cache";

import { getUser } from "@/lib/queries/user";
import { createClient } from "@/lib/supabase/server";

import { UserProfileInput } from "../_types";

export const updateUserProfile = async (userProfileData: UserProfileInput) => {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    throw new Error("ユーザーが見つかりません。");
  }

  const { error } = await supabase.from("profiles").upsert({
    ...userProfileData,
    id: user.id,
  });

  if (error) {
    console.error("DB Error: ", error);
    return {
      error: "アカウント情報の更新に失敗しました。",
    };
  }

  // キャッシュの更新
  revalidatePath("/", "layout");

  return { success: true };
};

export const updateUserEmail = async (newEmail: string) => {
  const supabase = await createClient();

  const message = encodeURIComponent("メールアドレスを変更しました。");

  const { error } = await supabase.auth.updateUser(
    { email: newEmail },
    {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/account?message=${message}`,
    },
  );

  if (error) {
    console.error("DB Error: ", error);
    return {
      error: "メールアドレスの変更リクエストに失敗しました。",
    };
  }

  revalidatePath("/account");

  return { success: true };
};

export const uploadUserAvatar = async (filePath: string, file: File) => {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    throw new Error("ユーザーが見つかりません。");
  }

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  if (error) {
    console.error("DB Error: ", error);
    return {
      error: "プロフィール画像のアップロードに失敗しました。",
    };
  }

  // キャッシュの更新
  revalidatePath("/", "layout");

  return { success: true };
};
