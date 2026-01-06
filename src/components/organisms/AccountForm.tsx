"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { updateUserProfile } from "@/actions/profile";
import FormInput from "@/components/atoms/FormInput";
import FormSubmitButton from "@/components/atoms/FormSubmitButton";
import FormField from "@/components/molecules/FormField";
import { UserProfile, UserProfileInput } from "@/types";

import Avatar from "../../app/(main)/account/avatar";

interface IAccountForm {
  profile: UserProfile;
}

export default function AccountForm({ profile }: IAccountForm) {
  const queryClient = useQueryClient();

  const [username, setUsername] = useState<string | null>(profile.username);
  const [avatar_url, setAvatarUrl] = useState<string | null>(
    profile.avatar_url,
  );

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UserProfileInput) => updateUserProfile(data),
    onSuccess: async (result) => {
      if (result?.error) {
        alert(result.error);
        return;
      }

      alert("プロフィールを更新しました。");

      // クライアント側のキャッシュを無効化
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (err) => {
      console.error(err);
      alert("予期せぬエラーが発生しました");
    },
  });

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6">
      <div>
        <Avatar
          uid={profile.id ?? null}
          url={avatar_url}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url);
            mutate({ username, avatar_url: url });
          }}
        />
      </div>

      <FormField htmlFor="username" labelText="あなたの名前">
        <FormInput
          id="username"
          name="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
        />
      </FormField>

      <FormField
        htmlFor="email"
        labelText="メールアドレス"
        description={
          <>
            メールアドレスを変更する場合は、
            <span className="underline hover:no-underline">こちら</span>
            から再設定用のメールを受け取ってください。
          </>
        }
      >
        <FormInput
          id="email"
          name="email"
          type="text"
          value={"メールアドレスが表示されます"}
          readOnly
        />
      </FormField>

      <div className="mt-3">
        <FormSubmitButton
          type="button"
          loading={isPending}
          onClick={() => mutate({ username, avatar_url })}
        >
          更新する
        </FormSubmitButton>
      </div>
    </form>
  );
}
