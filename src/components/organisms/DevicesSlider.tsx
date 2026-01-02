"use client";

import "swiper/css";

import Image from "next/image";
import Link from "next/link";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";

import { Device } from "@/types";

import InformationCard from "../atoms/InformationCard";
import OthersDeviceDetails from "../molecules/OthersDeviceDetails";

interface IDevicesSlider {
  devices: Device[];
}

const DevicesSlider = ({ devices }: IDevicesSlider) => {
  return (
    <>
      {devices.length > 0 ? (
        <div className="w-[calc(100%+1.5rem+1.5rem)] sm:w-[calc(100%+4.25rem+4.25rem)] -ml-7 sm:-ml-18">
          <Swiper slidesPerView={"auto"} className="px-5! sm:px-16!">
            {devices.map((device: Device) => (
              <SwiperSlide key={device.id} className="px-2 w-auto!">
                <Link
                  href=""
                  className="block w-60 sm:w-3xs transition-opacity hover:opacity-80"
                >
                  <section>
                    <InformationCard
                      footer={
                        <OthersDeviceDetails
                          name={`${device.brand} ${device.name}`}
                          status={device.status}
                        />
                      }
                    >
                      <div className="bg-white overflow-hidden h-28 relative">
                        {device.image_url ? (
                          <Image
                            src={device.image_url}
                            alt=""
                            fill
                            className="top-1/2! left-1/2! w-auto! h-3/4! sm:h-4/5! -translate-1/2"
                          />
                        ) : (
                          <MdOutlineImageNotSupported className="absolute top-1/2 left-1/2 -translate-1/2 text-gray-300 text-5xl" />
                        )}
                      </div>
                    </InformationCard>
                  </section>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="w-60 sm:w-3xs">
          <Link
            href="/devices/search"
            className="transition-opacity hover:opacity-80"
          >
            <InformationCard
              footer={
                <div className="font-bold text-sm sm:text-base">
                  デバイスを登録する
                </div>
              }
            >
              <div className="h-28 flex items-center justify-center">
                <IoAddCircleOutline className="text-4xl text-teal-600" />
              </div>
            </InformationCard>
          </Link>
        </div>
      )}
    </>
  );
};

export default DevicesSlider;
