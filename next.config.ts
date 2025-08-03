import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {

    ignoreDuringBuilds: true,
  },
  typescript : {
    ignoreBuildErrors : true,
  },
  compiler :{
    removeConsole : true,
  },
  images : {
    remotePatterns : [
      {
        protocol : "https",
        hostname: "0ctxyijyhg.ufs.sh",
        pathname : "/f/*"
      }
    ]
  }
};

export default nextConfig;
