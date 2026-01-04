"use client";

import { GoQuestion } from "react-icons/go";

interface IInfoButton {
  onClick: () => void;
}

const InfoButton = ({ onClick }: IInfoButton) => {
  return (
    <button
      className="text-sm text-gray-500 -mt-1.5 cursor-pointer"
      onClick={onClick}
    >
      <GoQuestion />
    </button>
  );
};

export default InfoButton;
