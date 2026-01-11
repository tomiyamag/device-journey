"use client";

import classNames from "classnames";
import { GoQuestion } from "react-icons/go";

interface IInfoButton {
  className?: string;
  onClick: () => void;
}

const InfoButton = ({ className, onClick }: IInfoButton) => {
  return (
    <button
      type="button"
      className={classNames(
        "text-sm text-gray-500 -mt-1.5 cursor-pointer outline-none",
        className,
      )}
      onClick={onClick}
    >
      <GoQuestion />
    </button>
  );
};

export default InfoButton;
