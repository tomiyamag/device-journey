"use client";

import dynamic from "next/dynamic";

import ContentLoadingSpinner from "../atoms/ContentLoadingSpinner";

const InteractiveFormContent = dynamic(
  () => import("./SearchDeviceFormContent"),
  {
    ssr: false,
    loading: () => <ContentLoadingSpinner className="py-6" />,
  },
);

const SearchDeviceForm = () => {
  return <InteractiveFormContent />;
};

export default SearchDeviceForm;
