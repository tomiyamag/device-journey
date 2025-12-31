import Link from "next/link";
import { FaCircle } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { GrStorage } from "react-icons/gr";
import { IoIosArrowForward, IoMdColorPalette } from "react-icons/io";

import ActiveDeviceTag from "../atoms/ActiveDeviceTag";
import DeviceSpec from "../atoms/DeviceSpec";
import InformationCard from "../atoms/InformationCard";
import InformationHeading from "../atoms/InformationHeading";
import ActiveDeviceFeatures from "../molecules/ActiveDeviceFeatures";

const ActiveDevice = () => {
  return (
    <div>
      <InformationHeading>
        <span className="flex gap-2 items-center">
          <FaCircle size={8} className="text-teal-600" />
          メインのアクティブデバイス
        </span>
      </InformationHeading>

      <InformationCard footer={<ActiveDeviceFeatures />}>
        <div className="flex gap-3.5 items-center sm:items-start">
          <div className="rounded-lg overflow-hidden w-48 h-44 relative hidden sm:block">
            <img
              src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg"
              alt=""
              className="absolute top-1/2 left-1/2 -translate-1/2 h-full"
            />
          </div>

          <div className="flex-1">
            <div className="mb-4 sm:mb-2.5 flex items-center gap-3">
              <div className="rounded-lg overflow-hidden w-24 h-22 relative sm:hidden">
                <img
                  src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg"
                  alt=""
                  className="absolute top-1/2 left-1/2 -translate-1/2 h-full"
                />
              </div>

              <div>
                <div className="font-bold mb-1.5">
                  <Link
                    href="/dashboard"
                    className="inline-flex gap-2 items-center underline hover:no-underline"
                  >
                    iPhone 15 Pro
                    <IoIosArrowForward size={14} />
                  </Link>
                </div>

                <div className="flex flex-wrap gap-1">
                  <ActiveDeviceTag>
                    <GrStorage />
                    <span className="font-bold">128 GB</span>
                  </ActiveDeviceTag>

                  <ActiveDeviceTag>
                    <IoMdColorPalette />
                    <span className="font-bold">Natural Titanium</span>
                  </ActiveDeviceTag>

                  <ActiveDeviceTag>
                    <FaCalendarDays />
                    <span className="font-bold">2025/10/01 購入</span>
                  </ActiveDeviceTag>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <DeviceSpec
                title="📱 Display"
                detail={'6.0", 1080x2340 pixels'}
              />
              <DeviceSpec title="📷 Camera" detail={"16MP"} />
              <DeviceSpec title="🔋 Battery" detail={"4080 mAh"} />
              <DeviceSpec title="⚖️ Weight" detail={"151 g"} />
            </div>
          </div>
        </div>
      </InformationCard>
    </div>
  );
};

export default ActiveDevice;
