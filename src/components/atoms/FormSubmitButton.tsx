"use client";

import { useFormStatus } from "react-dom";

import Button, { IButton } from "./Button";

interface IFormSubmitButton extends IButton {
  loading?: boolean;
}

const FormSubmitButton = ({
  loading,
  children,
  type = "submit",
  ...rest
}: IFormSubmitButton) => {
  const { pending } = useFormStatus();

  const isLoading = loading || pending;

  return (
    <Button loading={isLoading} type={type} {...rest}>
      {children}
    </Button>
  );
};

export default FormSubmitButton;
