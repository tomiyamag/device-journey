import classNames from "classnames";

interface IInput {
  className?: string;
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}

const Input = ({
  className,
  id,
  name,
  type,
  placeholder,
  required,
}: IInput) => {
  return (
    <input
      className={classNames(
        "border border-gray-300 rounded-lg h-11 w-full block px-3.5 bg-white shadow-xs focus:outline-2 focus:outline-teal-600",
        className,
      )}
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
    />
  );
};

export default Input;
