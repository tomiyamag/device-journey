import Link from "next/link";

interface IPickupButton {
  emoji: string;
  label: string;
  onClick?: () => void;
  href?: string;
  comingSoon?: boolean;
}

const PickupButton = ({
  emoji,
  label,
  onClick,
  href,
  comingSoon,
}: IPickupButton) => {
  const wrapperClassName =
    "flex flex-col gap-1 bg-gray-200 rounded-xl w-full py-5 px-2 cursor-pointer transition-opacity hover:opacity-80 items-center justify-center text-center disabled:cursor-auto disabled:hover:opacity-100 disabled:bg-gray-100 disabled:text-gray-400 relative group";

  const content = (
    <>
      <div className="text-2xl sm:text-3xl select-none group-disabled:opacity-40 group-disabled:grayscale-100">
        {emoji}
      </div>
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
    <button
      type="button"
      onClick={onClick}
      className={wrapperClassName}
      disabled={comingSoon}
    >
      {content}
      {comingSoon && (
        <span className="block font-bold text-[0.625rem] sm:text-[0.6875rem] whitespace-nowrap px-2 sm:px-2.5 py-1 bg-linear-to-r from-rose-400 to-rose-600 text-white w-auto rounded-sm rotate-5 opacity-80 absolute top-1/2 left-1/2 -translate-1/2">
          COMING SOON
        </span>
      )}
    </button>
  );
};

export default PickupButton;
