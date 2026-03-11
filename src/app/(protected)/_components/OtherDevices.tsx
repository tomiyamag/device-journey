"use client";

import "swiper/css";

import Image from "next/image";
import Link from "next/link";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";

import Panel from "@/components/ui/Panel";
import { getDeviceStatus } from "@/lib/utils/getDeviceStatus";
import { Device } from "@/types";

import NoOtherDevices from "./NoOtherDevices";
import OtherDevice from "./OtherDevice";

interface IOtherDevices {
  devices: Device[];
}

const OtherDevices = ({ devices }: IOtherDevices) => {
  const displayDevices = devices.filter((device) => !device.is_main);
  const hadDisplayDevices = displayDevices.length > 0;

  return (
    <>
      {hadDisplayDevices ? (
        <div className="w-[calc(100%+1.5rem+1.5rem)] sm:w-[calc(100%+4.5rem+4.5rem)] -ml-7 sm:-ml-18">
          <Swiper slidesPerView={"auto"} className="px-5! sm:px-16!">
            {displayDevices.map((device: Device) => (
              <SwiperSlide key={device.id} className="px-2 w-auto!">
                <Link
                  href={`/devices/${device.id}`}
                  className="block w-60 sm:w-3xs transition-opacity hover:opacity-80"
                >
                  <section>
                    <Panel
                      footer={
                        <OtherDevice
                          name={`${device.brand} ${device.name}`}
                          status={getDeviceStatus(device)}
                        />
                      }
                    >
                      <div className="bg-white overflow-hidden h-28 relative">
                        {device.image_url ? (
                          <Image
                            src={device.image_url}
                            alt=""
                            fill
                            className="top-1/2! left-1/2! w-auto! max-w-none h-3/4! sm:h-4/5! -translate-1/2"
                          />
                        ) : (
                          <MdOutlineImageNotSupported className="absolute top-1/2 left-1/2 -translate-1/2 text-gray-300 text-5xl" />
                        )}
                      </div>
                    </Panel>
                  </section>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <NoOtherDevices />
      )}
    </>
  );
};

export default OtherDevices;
