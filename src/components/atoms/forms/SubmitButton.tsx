"use client";

import { useFormStatus } from "react-dom";

import Button, { IButton } from "../Button";

type ISubmitButton = IButton;

const SubmitButton = ({ children, ...rest }: ISubmitButton) => {
  const { pending } = useFormStatus();

  return (
    <Button loading={pending} type="submit" {...rest}>
      {children}
    </Button>
  );
};

export default SubmitButton;
