import { ReactNode } from "react";

interface IFormRadioGroup {
  children: ReactNode;
}

const FormRadioGroup = ({ children }: IFormRadioGroup) => {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      {children}
    </div>
  );
};

export default FormRadioGroup;
