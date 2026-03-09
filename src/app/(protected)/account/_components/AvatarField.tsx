"use client";

import { ChangeEvent, forwardRef, InputHTMLAttributes, useState } from "react";
import { FiPlus } from "react-icons/fi";

import { Avatar } from "@/components/ui/Avatar";
import FormFile from "@/components/ui/FormFile";
import { UserProfile } from "@/types";

interface IAvatarField extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  profile: UserProfile;
}

const AvatarField = forwardRef<HTMLInputElement, IAvatarField>(
  ({ error, profile, ...rest }, ref) => {
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
    };

    return (
      <div>
        <div className="flex flex-col gap-6">
          <Avatar userProfile={profile} preview={avatarPreview} />

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

AvatarField.displayName = "AvatarField";

export default AvatarField;
