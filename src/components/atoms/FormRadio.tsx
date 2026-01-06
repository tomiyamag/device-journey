import { ComponentProps, forwardRef } from "react";

interface IFormRadio extends ComponentProps<"input"> {
  id: string;
  name?: string;
  value?: string;
  label: string;
  checked?: boolean;
}

const FormRadio = forwardRef<HTMLInputElement, IFormRadio>(
  ({ id, name, value, label, checked = false, ...rest }, ref) => {
    return (
      <label
        htmlFor={id}
        className="inline-flex items-center gap-2 cursor-pointer group"
      >
        <input
          ref={ref}
          type="radio"
          id={id}
          value={value}
          name={name}
          defaultChecked={checked}
          className="hidden"
          {...rest}
        />

        <span className="w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center group-has-disabled:border-gray-400">
          <span className="w-2 h-2 bg-teal-600 rounded-full opacity-0 group-has-checked:opacity-100 group-has-disabled:bg-gray-300"></span>
        </span>

        <span className="flex-1 group-has-disabled:text-gray-400">{label}</span>
      </label>
    );
  },
);

// デバッグ用
FormRadio.displayName = "FormRadio";

export default FormRadio;
