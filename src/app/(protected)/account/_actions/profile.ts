"use server";

import { parseWithZod } from "@conform-to/zod/v4";
import { SupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

import { getUser } from "@/lib/queries/user";
import { createClient } from "@/lib/supabase/server";
import { FormState } from "@/types";

import { accountSchema } from "../_lib/schema";

const uploadUserAvatar = async (
  supabase: SupabaseClient,
  filePath: string,
  file: File,
) => {
  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  if (error) {
    console.error("DB Error: ", error);

    return {
      error: "プロフィール画像のアップロードに失敗しました。",
    };
  }

  return { success: true };
};

export const updateUserProfile = async (
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return {
      status: "error",
      error: { "": ["ユーザーが見つかりません。"] },
    };
  }

  const submission = parseWithZod(formData, { schema: accountSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { username, avatar_url: avatarFile } = submission.value;

  let finalAvatarUrl: string | undefined = undefined;

  if (avatarFile instanceof File && avatarFile.size > 0) {
    const fileExt = avatarFile.name.split(".").pop();
    const filePath = `${user.id}-${crypto.randomUUID()}.${fileExt}`;

    const uploadResult = await uploadUserAvatar(supabase, filePath, avatarFile);

    if (uploadResult.error) {
      return {
        status: "error",
        error: { "": [uploadResult.error] },
        timestamp: Date.now(),
      };
    }

    finalAvatarUrl = filePath;
  }

  const { error } = await supabase.from("profiles").upsert({
    username,
    id: user.id,
    ...(finalAvatarUrl && { avatar_url: finalAvatarUrl }),
  });

  if (error) {
    console.error("DB Error: ", error);

    return {
      status: "error",
      error: {
        "": ["アカウント情報の更新に失敗しました。"],
      },
      timestamp: Date.now(),
    };
  }

  revalidatePath("/", "layout");

  return {
    status: "success",
    message: "アカウント情報を変更しました。",
    timestamp: Date.now(),
  };
};

// TODO: メールアドレス変更実装
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
