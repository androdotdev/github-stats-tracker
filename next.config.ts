import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [process.env.AUTH_URL as string],

};



export default nextConfig;
