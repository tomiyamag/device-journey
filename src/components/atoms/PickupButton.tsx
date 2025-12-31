interface IPickupButton {
  emoji: string;
  label: string;
  onClick: () => void;
}

const PickupButton = ({ emoji, label, onClick }: IPickupButton) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-1 bg-gray-200 rounded-xl w-full py-5 px-4 cursor-pointer transition-opacity hover:opacity-80"
    >
      <div className="text-2xl sm:text-3xl select-none">{emoji}</div>
      <div>
        <strong className="text-xs sm:text-sm">{label}</strong>
      </div>
    </button>
  );
};

export default PickupButton;
