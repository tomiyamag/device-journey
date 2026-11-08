"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { useActionState, useEffect, useRef } from "react";
import z from "zod";

import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";
import FormField from "@/components/ui/FormField";
import FormInput from "@/components/ui/FormInput";
import { useFormResultToast } from "@/hooks/useFormResultToast";

import { updateUserEmail } from "../_actions/profile";
import { emailChangeSchema } from "../_lib/schema";

interface IChangeEmailDialog {
  isOpen: boolean;
  currentEmail: string;
  onClose: () => void;
}

type EmailChangeSchemaType = z.input<typeof emailChangeSchema>;

const ChangeEmailDialog = ({
  isOpen,
  currentEmail,
  onClose,
}: IChangeEmailDialog) => {
  const [lastResult, action, isPending] = useActionState(
    updateUserEmail,
    undefined,
  );

  const [form, fields] = useForm<EmailChangeSchemaType>({
    lastResult,
    defaultValue: {
      email: "",
      email_confirmation: "",
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: emailChangeSchema });
    },
  });

  useFormResultToast(lastResult);

  const handledTimestamp = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (
      lastResult?.status !== "success" ||
      !lastResult.timestamp ||
      handledTimestamp.current === lastResult.timestamp
    ) {
      return;
    }

    handledTimestamp.current = lastResult.timestamp;
    form.reset();
    onClose();
  }, [lastResult, form, onClose]);

  const handleClose = () => {
    if (isPending) return;

    form.reset();
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title="メールアドレスの変更"
      footer={
        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
          <Button
            type="button"
            variant="back"
            onClick={handleClose}
            disabled={isPending}
          >
            キャンセル
          </Button>
          <Button
            type="submit"
            form={form.id}
            loading={isPending}
            disabled={isPending || !form.dirty}
          >
            変更する
          </Button>
        </div>
      }
    >
      <form
        action={action}
        {...getFormProps(form)}
        className="flex flex-col gap-5"
      >
        <p className="text-xs text-gray-600">
          現在のメールアドレス：{currentEmail}
        </p>

        <FormField
          htmlFor={fields.email.id}
          labelText="新しいメールアドレス"
          error={fields.email.errors?.[0]}
        >
          <FormInput
            placeholder="new@example.com"
            autoComplete="email"
            {...getInputProps(fields.email, { type: "email" })}
            isError={!!fields.email.errors}
          />
        </FormField>

        <FormField
          htmlFor={fields.email_confirmation.id}
          labelText="新しいメールアドレス（確認）"
          error={fields.email_confirmation.errors?.[0]}
        >
          <FormInput
            placeholder="new@example.com"
            autoComplete="email"
            {...getInputProps(fields.email_confirmation, { type: "email" })}
            isError={!!fields.email_confirmation.errors}
          />
        </FormField>

        <p className="text-xs text-gray-600">
          新しいメールアドレスに確認メールを送信します。メール内のリンクを開くと変更が完了します。
        </p>
      </form>
    </Dialog>
  );
};

export default ChangeEmailDialog;
