"use client";

import { useFormStatus } from "react-dom";

import Button, { IButton } from "../ui/Button";

interface ISubmitButton extends IButton {
  loading?: boolean;
}

const SubmitButton = ({
  loading,
  children,
  type = "submit",
  ...rest
}: ISubmitButton) => {
  const { pending } = useFormStatus();

  const isLoading = loading || pending;

  return (
    <Button loading={isLoading} type={type} {...rest}>
      {children}
    </Button>
  );
};

export default SubmitButton;
