"use client";

import { GoQuestion } from "react-icons/go";

import { cn } from "@/lib/utils/cn";

interface IInfoButton {
  className?: string;
  onClick: () => void;
}

const InfoButton = ({ className, onClick }: IInfoButton) => {
  return (
    <button
      type="button"
      className={cn(
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
