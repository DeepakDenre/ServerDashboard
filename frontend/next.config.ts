import type { NextConfig } from "next";

const port = process.env.PORT ?? '4000';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_PORT: port,
  },
};

export default nextConfig;
