import { ReactNode } from "react";

interface IFormOptionGroup {
  children: ReactNode;
}

const FormOptionGroup = ({ children }: IFormOptionGroup) => {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      {children}
    </div>
  );
};

export default FormOptionGroup;
