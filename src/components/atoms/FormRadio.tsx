import { ComponentProps } from "react";

interface IFormRadio extends ComponentProps<"input"> {
  id: string;
  name?: string;
  value?: string;
  label: string;
  checked?: boolean;
}

const FormRadio = ({
  id,
  name,
  value,
  label,
  checked = false,
  ...rest
}: IFormRadio) => {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-2 cursor-pointer group"
    >
      <input
        type="radio"
        id={id}
        value={value}
        name={name}
        checked={checked}
        className="hidden"
        {...rest}
      />

      <span className="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center">
        <span className="w-2 h-2 bg-teal-600 rounded-full opacity-0 group-has-checked:opacity-100"></span>
      </span>

      <span className="flex-1">{label}</span>
    </label>
  );
};

export default FormRadio;
