import { ReactNode } from "react";

import FormLabel, { IFormLabel } from "../atoms/FormLabel";

interface IFromField extends IFormLabel {
  description?: ReactNode;
  children: ReactNode;
  error?: string;
}

const FormField = ({
  htmlFor,
  labelText,
  description,
  error,
  children,
}: IFromField) => {
  return (
    <div>
      <FormLabel htmlFor={htmlFor} labelText={labelText} />
      {description && (
        <p className="text-xs text-gray-600 mb-3">{description}</p>
      )}
      {children}
      {error && <p className="text-xs text-red-500 font-bold mt-3">{error}</p>}
    </div>
  );
};

export default FormField;
