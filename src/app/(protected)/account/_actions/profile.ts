"use server";

import { parseWithZod } from "@conform-to/zod/v4";
import { SupabaseClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

import { getUser } from "@/lib/queries/user";
import { createClient } from "@/lib/supabase/server";
import { FormState } from "@/types";

import { accountSchema, emailChangeSchema } from "../_lib/schema";

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

export const updateUserEmail = async (
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) {
    return {
      status: "error",
      error: { "": ["ユーザーが見つかりません。"] },
      timestamp: Date.now(),
    };
  }

  const submission = parseWithZod(formData, { schema: emailChangeSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { email } = submission.value;
  const currentEmail = user.email ?? "";

  if (!currentEmail) {
    return {
      status: "error",
      error: { "": ["現在のメールアドレスを取得できませんでした。"] },
      timestamp: Date.now(),
    };
  }

  if (email.toLowerCase() === currentEmail.toLowerCase()) {
    return {
      status: "error",
      error: { email: ["現在のメールアドレスと同じです。"] },
      timestamp: Date.now(),
    };
  }

  if (user.new_email && email.toLowerCase() === user.new_email.toLowerCase()) {
    return {
      status: "error",
      error: {
        email: [
          "このメールアドレスへの変更は既にリクエストされています。確認メールをご確認ください。",
        ],
      },
      timestamp: Date.now(),
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) {
    console.error("NEXT_PUBLIC_BASE_URL is not set.");

    return {
      status: "error",
      error: { "": ["メールアドレスの変更リクエストに失敗しました。"] },
      timestamp: Date.now(),
    };
  }

  const emailRedirectTo = new URL("/auth/confirm", baseUrl).toString();

  const { error } = await supabase.auth.updateUser(
    { email },
    { emailRedirectTo },
  );

  if (error) {
    console.error("Auth Error: ", error);

    let message = "メールアドレスの変更リクエストに失敗しました。";

    if (error.code === "email_exists" || error.code === "user_already_exists") {
      message = "このメールアドレスは既に使用されています。";
    }

    if (error.code === "over_email_send_rate_limit") {
      message =
        "確認メールの送信回数が上限に達しました。しばらく待ってから再度お試しください。";
    }

    return {
      status: "error",
      error: { "": [message] },
      timestamp: Date.now(),
    };
  }

  revalidatePath("/account");

  return {
    status: "success",
    message:
      "確認メールを送信しました。メール内のリンクから変更を完了してください。",
    timestamp: Date.now(),
  };
};
