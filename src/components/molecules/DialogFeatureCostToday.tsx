import Dialog from "./Dialog";

interface IDialogFeatureCostToday {
  isOpen: boolean;
  onClose: () => void;
}

const DialogFeatureCostToday = ({
  isOpen,
  onClose,
}: IDialogFeatureCostToday) => {
  return (
    <Dialog title="コストの算出方法" isOpen={isOpen} onClose={onClose}>
      <div className="w-full flex flex-col gap-5 text-gray-600">
        <p>
          デバイスの購入金額を使用期間で日割り計算した金額です。
          <br />
          売却済みのデバイスについては、購入金額から売却金額を差し引いた実質負担額を元に計算されます。
        </p>
        <ul className="text-xs/relaxed pb-1.5 relative [&_li]:pl-3.5 [&_li]:before:content-['※'] [&_li]:before:absolute [&_li]:before:top-auto [&_li]:before:left-0">
          <li>購入日と金額が未登録の場合は、コスト算出が無効になります。</li>
          <li>購入日（または売却日）当日も1日分としてカウントします。</li>
        </ul>
      </div>
    </Dialog>
  );
};

export default DialogFeatureCostToday;
