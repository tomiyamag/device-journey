import { PiSmileySad } from "react-icons/pi";

interface IResultStatusMessage {
  message: string;
}

const ResultStatusMessage = ({ message }: IResultStatusMessage) => {
  return (
    <div className="font-bold text-sm flex flex-col gap-5 justify-center items-center py-10">
      <PiSmileySad size={100} className="text-gray-300" />
      <div className="text-gray-400">{message}</div>
    </div>
  );
};

export default ResultStatusMessage;
