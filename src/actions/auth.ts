"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function login(
  prevSate: { errorMessage: string },
  formData: FormData,
) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    // メールアドレス未確認の場合
    if (error.code === "email_not_confirmed") {
      await supabase.auth.signOut();

      return {
        errorMessage:
          "メールアドレスの確認が完了していません。送信されたメールをご確認ください。",
      };
    }

    // それ以外
    return {
      errorMessage: "アカウントが存在しないか、ログイン情報が間違っています。",
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(
  prevSate: { errorMessage: string },
  formData: FormData,
) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: signUpData, error } = await supabase.auth.signUp(data);

  // 既存ユーザーの場合
  if (signUpData.user && signUpData.user.identities?.length === 0) {
    return {
      errorMessage: "このメールアドレスは既に登録されています。",
    };
  }

  if (error) {
    return {
      errorMessage: "アカウントの作成に失敗しました。",
    };
  }

  revalidatePath("/", "layout");

  const message = encodeURIComponent(
    "確認メールを送信しました。メール内のリンクから登録を完了してください。",
  );

  redirect(`/auth/login?message=${message}`);
}

export async function signout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/auth/login");
  }

  revalidatePath("/", "layout");
  redirect("/auth/login");
}
