import Link from "next/link";

interface IPickupButton {
  emoji: string;
  label: string;
  onClick?: () => void;
  href?: string;
}

const PickupButton = ({ emoji, label, onClick, href }: IPickupButton) => {
  const wrapperClassName =
    "flex flex-col gap-1 bg-gray-200 rounded-xl w-full py-5 px-4 cursor-pointer transition-opacity hover:opacity-80 items-center justify-center text-center";

  const content = (
    <>
      <div className="text-2xl sm:text-3xl select-none">{emoji}</div>
      <div>
        <strong className="text-xs sm:text-sm">{label}</strong>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={wrapperClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={wrapperClassName}>
      {content}
    </button>
  );
};

export default PickupButton;
