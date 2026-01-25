import Link from "next/link";
import { IoAddCircleOutline } from "react-icons/io5";

import Panel from "@/components/ui/Panel";

const NoOtherDevices = () => {
  return (
    <div className="w-60 sm:w-3xs">
      <Link
        href="/devices/search"
        className="transition-opacity hover:opacity-80"
      >
        <Panel
          footer={
            <div className="font-bold text-sm sm:text-base">
              デバイスを追加する
            </div>
          }
        >
          <div className="h-28 flex items-center justify-center">
            <IoAddCircleOutline className="text-4xl text-teal-600" />
          </div>
        </Panel>
      </Link>
    </div>
  );
};

export default NoOtherDevices;
