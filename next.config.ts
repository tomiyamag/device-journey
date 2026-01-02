import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "fdn2.gsmarena.com",
      },
    ],
  },
};

export default nextConfig;
