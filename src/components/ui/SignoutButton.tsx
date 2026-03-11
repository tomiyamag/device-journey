"use client";

import { useFormStatus } from "react-dom";

import Button from "./Button";

const SignoutButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      size="auto"
      variant="tertiary"
      className="w-28"
      loading={pending}
      disabled={pending}
    >
      ログアウト
    </Button>
  );
};

export default SignoutButton;
