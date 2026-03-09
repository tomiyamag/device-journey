"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { useActionState } from "react";

import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import FormInput from "@/components/ui/FormInput";
import { useFormResultToast } from "@/hooks/useFormResultToast";
import { UserProfile } from "@/types";

import { updateUserProfile } from "../_actions/profile";
import { accountSchema } from "../_lib/schema";
import AvatarField from "./AvatarField";

interface IAccountForm {
  profile: UserProfile;
  email: string;
}

const AccountForm = ({ profile, email }: IAccountForm) => {
  const [lastResult, action, isPending] = useActionState(
    updateUserProfile,
    undefined,
  );

  const [form, fields] = useForm({
    lastResult,
    defaultValue: {
      username: profile.username,
      avatar_url: undefined,
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: accountSchema });
    },
  });

  useFormResultToast(lastResult);

  return (
    <form
      key={form.id}
      action={action}
      {...getFormProps(form)}
      className="flex flex-col gap-6"
      onKeyDown={(e) => {
        if (e.key === "Enter") e.preventDefault();
      }}
    >
      <AvatarField
        profile={profile}
        {...getInputProps(fields.avatar_url, { type: "file" })}
        error={fields.avatar_url.errors?.[0]}
      />

      <FormField
        htmlFor={fields.username.id}
        labelText="あなたの名前"
        error={fields.username.errors?.[0]}
      >
        <FormInput
          placeholder="名前を入力してください"
          autoComplete="off"
          {...getInputProps(fields.username, { type: "text" })}
          isError={!!fields.username.errors}
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
          type="submit"
          loading={isPending}
          disabled={isPending || !form.dirty}
        >
          変更を保存
        </Button>
      </div>
    </form>
  );
};

export default AccountForm;
