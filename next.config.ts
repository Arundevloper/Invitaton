import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pin the project root (there is an unrelated package-lock.json in the home folder)
  turbopack: { root: __dirname },
  // let `npm run dev` work when opened from the network address (e.g. on your phone),
  // not just http://localhost:3000. Update the IP if your machine's address changes.
  allowedDevOrigins: ["192.168.0.195"],
  // the bare link opens Arun's invitation; /kajal is Kajal's
  async redirects() {
    return [{ source: "/", destination: "/arun", permanent: false }];
  },
  images: {
    // allow the couple photo hosted on Cloudinary to be optimised by next/image
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
};

export default nextConfig;
