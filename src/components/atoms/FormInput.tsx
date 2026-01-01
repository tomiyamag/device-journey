import classNames from "classnames";
import { ComponentProps } from "react";

interface IFormInput extends ComponentProps<"input"> {
  className?: string;
  id: string;
  name?: string;
  type: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
}

export const InputClassNames =
  "border border-gray-300 rounded-lg h-11 w-full block px-3.5 bg-white shadow-xs focus:outline-2 focus:outline-teal-600";

const FormInput = ({
  className,
  id,
  name,
  type,
  value,
  placeholder,
  required,
  ...rest
}: IFormInput) => {
  return (
    <input
      className={classNames(InputClassNames, className)}
      id={id}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      required={required}
      {...rest}
    />
  );
};

export default FormInput;
