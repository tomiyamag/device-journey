import { ComponentProps, forwardRef } from "react";
import { FaCheck } from "react-icons/fa";

interface IFormCheckbox extends ComponentProps<"input"> {
  id: string;
  label: string;
}

const FormCheckbox = forwardRef<HTMLInputElement, IFormCheckbox>(
  ({ id, label, ...rest }, ref) => {
    return (
      <label
        htmlFor={id}
        className="inline-flex items-center gap-2 cursor-pointer group"
      >
        <input ref={ref} type="checkbox" id={id} className="hidden" {...rest} />

        <span className="w-4.5 h-4.5 border border-gray-400 rounded-sm flex items-center justify-center group-has-disabled:border-gray-400">
          <span className="opacity-0 group-has-checked:opacity-100">
            <FaCheck
              size={10}
              className="text-teal-600 group-has-disabled:bg-gray-400"
            />
          </span>
        </span>

        <span className="flex-1 group-has-disabled:text-gray-400">{label}</span>
      </label>
    );
  },
);

// デバッグ用
FormCheckbox.displayName = "FormCheckbox";

export default FormCheckbox;
