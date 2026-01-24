import Link from "next/link";
import { IoAddCircleOutline } from "react-icons/io5";

import Panel from "@/components/ui/Panel";

const NoDevices = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-4 mt-5">
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
          <div className="h-40 flex items-center justify-center">
            <IoAddCircleOutline className="text-4xl text-teal-600" />
          </div>
        </Panel>
      </Link>
    </div>
  );
};

export default NoDevices;
