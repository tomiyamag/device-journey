export interface IFormLabel {
  htmlFor?: string;
  labelText: string;
}

const FormLabel = ({ htmlFor, labelText }: IFormLabel) => {
  return (
    <label
      htmlFor={htmlFor}
      className="font-bold text-sm text-gray-600 mb-3 inline-block"
    >
      {labelText}
    </label>
  );
};

export default FormLabel;
