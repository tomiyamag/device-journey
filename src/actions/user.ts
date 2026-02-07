"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

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
