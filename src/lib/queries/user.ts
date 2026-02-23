import { cache } from "react";

import { createClient } from "@/lib/supabase/server";

// レンダリング用
// NOTE: getSession() を使用してネットワーク通信を行わなずにユーザー情報を取得する
export const getSessionUser = cache(async () => {
  const supabase = await createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    return null;
  }

  return session.user;
});

// アクション用
// NOTE: getUser() を使用してセキュリティチェックを行う
export const getUser = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  return user;
};
