import { ComponentProps } from "react";
import { FaCheck } from "react-icons/fa";

interface IFormCheckbox extends ComponentProps<"input"> {
  id: string;
  name?: string;
  value?: string;
  label: string;
  checked?: boolean;
}

const FormCheckbox = ({
  id,
  name,
  value,
  label,
  checked = false,
  ...rest
}: IFormCheckbox) => {
  return (
    <label
      htmlFor={id}
      className="inline-flex items-center gap-2 cursor-pointer group"
    >
      <input
        type="checkbox"
        id={id}
        value={value}
        name={name}
        checked={checked}
        className="hidden"
        {...rest}
      />

      <span className="w-4.5 h-4.5 border border-gray-400 rounded-sm flex items-center justify-center">
        <span className="opacity-0 group-has-checked:opacity-100">
          <FaCheck size={10} className="text-teal-600" />
        </span>
      </span>

      <span className="flex-1">{label}</span>
    </label>
  );
};

export default FormCheckbox;
