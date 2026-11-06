import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pin the project root (there is an unrelated package-lock.json in the home folder)
  turbopack: { root: __dirname },
  images: {
    // allow the couple photo hosted on Cloudinary to be optimised by next/image
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
};

export default nextConfig;
