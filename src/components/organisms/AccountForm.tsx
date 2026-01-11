"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { updateUserProfile, uploadUserAvatar } from "@/actions/profile";
import { updateUserEmail } from "@/actions/user";
import FormInput from "@/components/atoms/FormInput";
import FormField from "@/components/molecules/FormField";
import { accountFormSchema } from "@/schemas/accountForm";
import { UserProfile, UserProfileInput } from "@/types";

import Button from "../atoms/Button";
import FormAvatarField from "../molecules/FormAvatarField";

type AccountSchemaType = z.input<typeof accountFormSchema>;

interface IAccountForm {
  profile: UserProfile;
  email: string;
}

const randomValue = Math.random();

export default function AccountForm({ profile, email }: IAccountForm) {
  const queryClient = useQueryClient();

  // 初期値の生成
  const defaultValues = useMemo(() => {
    return {
      avatar_url: profile.avatar_url,
      username: profile.username,
    } as AccountSchemaType;
  }, [profile.avatar_url, profile.username]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<AccountSchemaType>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  // 画像アップロード用 Mutation
  const { mutateAsync: uploadAvatarMutate, isPending: isAvatarUploading } =
    useMutation({
      mutationFn: async ({
        filePath,
        file,
      }: {
        filePath: string;
        file: File;
      }) => {
        return await uploadUserAvatar(filePath, file);
      },
      onSuccess: async (result) => {
        if (result?.error) {
          toast.error(result?.error);
          return;
        }
      },
      onError: (err) => {
        console.error(err);
        toast.error("予期せぬエラーが発生しました。");
      },
    });

  // プロフィール更新用 Mutation
  const { mutateAsync: updateProfileMutate, isPending: isProfileUpdating } =
    useMutation({
      mutationFn: (data: UserProfileInput) => updateUserProfile(data),
      onSuccess: async (result) => {
        if (result?.error) {
          toast.error(result.error);
          return;
        }

        // クライアント側のキャッシュを無効化
        await queryClient.invalidateQueries({ queryKey: ["profile"] });

        toast.success("アカウント情報を変更しました。");
      },
      onError: (err) => {
        console.error(err);
        toast.error("予期せぬエラーが発生しました。");
      },
    });

  const handleFormSubmit = async (data: AccountSchemaType) => {
    try {
      let finalAvatarUrl: string | null = defaultValues.avatar_url as string;

      const { avatar_url: avatar_files } = data;

      // アバター画像が選択された場合はファイル名を生成して送信
      if (avatar_files instanceof FileList && data.avatar_url.length > 0) {
        const file = avatar_files[0];
        console.log(avatar_files[0]);
        const fileExt = file.name.split(".").pop();
        const filePath = `${profile.id}-${randomValue}.${fileExt}`;

        // 画像をストレージにアップ
        await uploadAvatarMutate({ filePath, file });

        finalAvatarUrl = filePath;
      }

      const submitData: UserProfileInput = {
        avatar_url: finalAvatarUrl,
        username: data.username,
      } as UserProfileInput;

      // プロフィール更新
      await updateProfileMutate(submitData);
      reset(submitData as AccountSchemaType);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6">
      <FormAvatarField
        key={profile.avatar_url}
        {...register("avatar_url")}
        error={errors?.avatar_url?.message}
      />

      <FormField
        htmlFor="username"
        labelText="あなたの名前"
        error={errors?.username?.message}
      >
        <FormInput
          id="username"
          type="text"
          placeholder="名前を入力してください"
          autoComplete="off"
          {...register("username")}
          isError={!!errors.username}
        />
      </FormField>

      <FormField
        htmlFor="email"
        labelText="メールアドレス"
        description="現在、メールアドレスの変更は行えません。"
      >
        <FormInput id="email" type="text" value={email} readOnly />
      </FormField>

      <FormField
        htmlFor="password"
        labelText="パスワード"
        description="現在、パスワードの変更は行えません。"
      >
        <FormInput
          id="password"
          type="password"
          value="************"
          readOnly
        />
      </FormField>

      <div className="mt-3">
        <Button
          type="button"
          onClick={handleSubmit(handleFormSubmit)}
          loading={isAvatarUploading || isProfileUpdating}
          disabled={!isDirty}
        >
          変更を保存
        </Button>
      </div>
    </form>
  );
}
