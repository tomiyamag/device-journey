"use client";

import dynamic from "next/dynamic";

import Spinner from "@/components/ui/Spinner";

const SearchDeviceContent = dynamic(() => import("./SearchDeviceContent"), {
  ssr: false,
  loading: () => <Spinner className="py-6" />,
});

const SearchDevice = () => {
  return <SearchDeviceContent />;
};

export default SearchDevice;
