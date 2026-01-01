"use client";

import { useFormStatus } from "react-dom";

import Button, { IButton } from "./Button";

type IFormSubmitButton = IButton;

const FormSubmitButton = ({ children, ...rest }: IFormSubmitButton) => {
  const { pending } = useFormStatus();

  return (
    <Button loading={pending} type="submit" {...rest}>
      {children}
    </Button>
  );
};

export default FormSubmitButton;
