"use server";

import { parseWithZod } from "@conform-to/zod/v4";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { authSchema } from "@/app/(auth)/_lib/schema";
import { createClient } from "@/lib/supabase/server";
import { FormState } from "@/types";

export const login = async (
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const supabase = await createClient();

  const submission = parseWithZod(formData, { schema: authSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { email, password } = submission.value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // メールアドレス未確認の場合
    if (error.code === "email_not_confirmed") {
      await supabase.auth.signOut();

      return {
        status: "error",
        error: {
          "": [
            "メールアドレスの確認が完了していません。送信されたメールをご確認ください。",
          ],
        },
        timestamp: Date.now(),
      };
    }

    // それ以外
    return {
      status: "error",
      error: {
        "": ["アカウントが存在しないか、ログイン情報が間違っています。"],
      },
      timestamp: Date.now(),
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
};

export const signup = async (
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const supabase = await createClient();

  const submission = parseWithZod(formData, { schema: authSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { email, password } = submission.value;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  // 既存ユーザーの場合
  if (data.user && data.user.identities?.length === 0) {
    return {
      status: "error",
      error: {
        "": ["このメールアドレスは既に登録されています。"],
      },
      timestamp: Date.now(),
    };
  }

  if (error) {
    return {
      status: "error",
      error: {
        "": ["アカウントの作成に失敗しました。"],
      },
      timestamp: Date.now(),
    };
  }

  revalidatePath("/", "layout");

  const message = encodeURIComponent(
    "確認メールを送信しました。メール内のリンクから登録を完了してください。",
  );

  redirect(`/login?message=${message}`);
};

export const signout = async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/login");
  }

  revalidatePath("/", "layout");
  redirect("/login");
};
