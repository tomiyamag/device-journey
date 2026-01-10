"use client";

import { ChangeEvent, ComponentProps, forwardRef, useState } from "react";
import { FiPlus } from "react-icons/fi";

import Avatar from "@/components/atoms/Avatar";

import FormFile from "../atoms/FormFile";

interface IFormAvatarField extends ComponentProps<"input"> {
  error?: string;
}

const FormAvatarField = forwardRef<HTMLInputElement, IFormAvatarField>(
  ({ onChange, error, ...rest }, ref) => {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    // プレビュー表示
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (files && files.length > 0) {
        const file = files[0];
        setAvatarPreview(URL.createObjectURL(file));
      } else {
        // NOTE: キャンセルされた場合は前回の選択も取り消されるため、プレビューの挙動をブラウザの仕様と合わせる
        setAvatarPreview(null);
      }

      // 親コンポーネントから渡された React Hook Form の onChange を実行する
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div>
        <div className="flex flex-col gap-6">
          <Avatar preview={avatarPreview} />
          <div className="text-center">
            <FormFile
              ref={ref}
              id="avatar"
              label={
                <div className="text-center">
                  <div className="inline-flex items-center gap-1.5 text-teal-600 font-bold">
                    <FiPlus />
                    <span>プロフィール画像を選択</span>
                  </div>
                </div>
              }
              accept="image/*"
              onChange={handleChange}
              {...rest}
            />
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-500 font-bold mt-3 text-center">
            {error}
          </p>
        )}
      </div>
    );
  },
);

FormAvatarField.displayName = "FormAvatarField";

export default FormAvatarField;
