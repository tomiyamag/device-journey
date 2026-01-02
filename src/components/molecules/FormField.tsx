import { ReactNode } from "react";

import FormLabel, { IFormLabel } from "../atoms/FormLabel";

interface IFromField extends IFormLabel {
  description?: string;
  children: ReactNode;
}

const FormField = ({
  htmlFor,
  labelText,
  description,
  children,
}: IFromField) => {
  return (
    <div>
      <FormLabel htmlFor={htmlFor} labelText={labelText} />
      {description && (
        <p className="text-xs text-gray-600 mb-3">{description}</p>
      )}
      {children}
    </div>
  );
};

export default FormField;
