import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@validar/core"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
    ],
  },
};

export default nextConfig;
