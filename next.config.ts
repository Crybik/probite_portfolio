import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Without this, Turbopack walks up to C:\Users\jim, finds a stray
  // package-lock.json there and adopts the home directory as the project root.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
