import { ReactNode } from "react";

import FormLabel, { IFormLabel } from "../atoms/FormLabel";

interface IFromField extends IFormLabel {
  children: ReactNode;
}

const FormField = ({ htmlFor, labelText, children }: IFromField) => {
  return (
    <div>
      <FormLabel htmlFor={htmlFor} labelText={labelText} />
      {children}
    </div>
  );
};

export default FormField;
