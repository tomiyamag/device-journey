"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { useActionState, useEffect, useRef, useState } from "react";
import z from "zod";

import Button from "@/components/ui/Button";
import Dialog from "@/components/ui/Dialog";
import FormField from "@/components/ui/FormField";
import FormPassword from "@/components/ui/FormPassword";
import { useFormResultToast } from "@/hooks/useFormResultToast";

import { updateUserPassword } from "../_actions/profile";
import { passwordChangeSchema } from "../_lib/schema";

interface IChangePasswordDialog {
  isOpen: boolean;
  onClose: () => void;
}

type PasswordChangeSchemaType = z.input<typeof passwordChangeSchema>;

const ChangePasswordDialog = ({ isOpen, onClose }: IChangePasswordDialog) => {
  const [lastResult, action, isPending] = useActionState(
    updateUserPassword,
    undefined,
  );

  const [isCurrentPasswordShow, setIsCurrentPasswordShow] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isPasswordConfirmationShow, setIsPasswordConfirmationShow] =
    useState(false);

  const [form, fields] = useForm<PasswordChangeSchemaType>({
    lastResult,
    defaultValue: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: passwordChangeSchema });
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
      title="パスワードの変更"
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
        <FormField
          htmlFor={fields.current_password.id}
          labelText="現在のパスワード"
          error={fields.current_password.errors?.[0]}
        >
          <FormPassword
            isPasswordShow={isCurrentPasswordShow}
            setIsPasswordShow={setIsCurrentPasswordShow}
            autoComplete="current-password"
            {...getInputProps(fields.current_password, { type: "password" })}
            isError={!!fields.current_password.errors}
          />
        </FormField>

        <FormField
          htmlFor={fields.password.id}
          labelText="新しいパスワード"
          error={fields.password.errors?.[0]}
        >
          <FormPassword
            isPasswordShow={isPasswordShow}
            setIsPasswordShow={setIsPasswordShow}
            autoComplete="new-password"
            {...getInputProps(fields.password, { type: "password" })}
            isError={!!fields.password.errors}
          />
        </FormField>

        <FormField
          htmlFor={fields.password_confirmation.id}
          labelText="新しいパスワード（確認用）"
          error={fields.password_confirmation.errors?.[0]}
        >
          <FormPassword
            isPasswordShow={isPasswordConfirmationShow}
            setIsPasswordShow={setIsPasswordConfirmationShow}
            autoComplete="new-password"
            {...getInputProps(fields.password_confirmation, {
              type: "password",
            })}
            isError={!!fields.password_confirmation.errors}
          />
        </FormField>

        <p className="text-xs text-gray-600">
          パスワードは 8
          文字以上で、英大文字・小文字・数字・記号を全て含めてください。
        </p>
      </form>
    </Dialog>
  );
};

export default ChangePasswordDialog;
