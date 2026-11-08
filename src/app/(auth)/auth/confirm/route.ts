import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

// /auth/confirm への GET リクエストを処理するハンドラー
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const nextParam = searchParams.get("next");
  const next =
    nextParam?.startsWith("/") && !nextParam.startsWith("//")
      ? nextParam
      : "/account";

  // シークレットトークンを含めないリダイレクト先を作成する
  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete("token_hash");
  redirectTo.searchParams.delete("type");
  redirectTo.searchParams.delete("next");

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      const successMessage =
        type === "email_change"
          ? "メールアドレスを変更しました。"
          : "メールアドレスの確認が完了しました。";

      redirectTo.searchParams.set("successMessage", successMessage);

      return NextResponse.redirect(redirectTo);
    }
  }

  // エラーメッセージを付けてエラーページへリダイレクトする
  if (type === "email_change") {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();

    redirectTo.pathname = userData.user ? "/account" : "/login";
  } else {
    redirectTo.pathname = "/login";
  }

  redirectTo.searchParams.set(
    "errorMessage",
    "リンクが無効か、期限切れです。もう一度お試しください。",
  );
  return NextResponse.redirect(redirectTo);
}
