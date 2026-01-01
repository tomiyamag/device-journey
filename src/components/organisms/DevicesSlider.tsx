"use client";

import "swiper/css";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

import InformationCard from "../atoms/InformationCard";
import OthersDeviceDetails from "../molecules/OthersDeviceDetails";

const DevicesSlider = () => {
  return (
    <div className="w-[calc(100%+1.25rem+1.25rem)] sm:w-[calc(100%+4rem+4rem)] -ml-5 sm:-ml-16">
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={16}
        className="px-5! sm:px-16!"
      >
        <SwiperSlide className="w-auto!">
          <Link
            href=""
            className="block w-60 sm:w-3xs transition-opacity hover:opacity-80"
          >
            <section>
              <InformationCard
                footer={
                  <OthersDeviceDetails name="Google Pixel 5" status={"sub"} />
                }
              >
                <div className="rounded-xl bg-white overflow-hidden h-28 relative">
                  <img
                    src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg"
                    alt=""
                    className="absolute top-1/2 left-1/2 -translate-1/2 h-3/4"
                  />
                </div>
              </InformationCard>
            </section>
          </Link>
        </SwiperSlide>

        <SwiperSlide className="w-auto!">
          <Link
            href=""
            className="block w-60 sm:w-3xs transition-opacity hover:opacity-80"
          >
            <section>
              <InformationCard
                footer={<OthersDeviceDetails name="Google Pixel 4 XL" />}
              >
                <div className="rounded-xl bg-white overflow-hidden h-28 relative">
                  <img
                    src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg"
                    alt=""
                    className="absolute top-1/2 left-1/2 -translate-1/2 h-3/4"
                  />
                </div>
              </InformationCard>
            </section>
          </Link>
        </SwiperSlide>

        <SwiperSlide className="w-auto!">
          <Link
            href=""
            className="block w-60 sm:w-3xs transition-opacity hover:opacity-80"
          >
            <section>
              <InformationCard
                footer={
                  <OthersDeviceDetails
                    name="Google Pixel 3 XL"
                    status={"sold"}
                  />
                }
              >
                <div className="rounded-xl bg-white overflow-hidden h-28 relative">
                  <img
                    src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg"
                    alt=""
                    className="absolute top-1/2 left-1/2 -translate-1/2 h-3/4"
                  />
                </div>
              </InformationCard>
            </section>
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default DevicesSlider;
