import { createClient } from "@/lib/supabase/client";

// TODO: 非認証ユーザーでも画像にアクセス可能となるため、DB 側の設定を変更して実装を調整する
export const getAvatarUrl = (path: string | null) => {
  if (!path) {
    return null;
  }

  const supabase = createClient();
  const { data } = supabase.storage.from("avatars").getPublicUrl(path);

  return data.publicUrl;
};
