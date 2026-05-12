import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Whitelist of quality values used across `next/image` instances.
    qualities: [60, 70, 75, 80, 85, 88, 90],
  },
};

export default nextConfig;
