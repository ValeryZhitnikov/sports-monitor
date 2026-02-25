import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.api-sports.io',
        pathname: '/football/**',
      },
      {
        protocol: 'https',
        hostname: 'media-1.api-sports.io',
        pathname: '/football/**',
      },
      {
        protocol: 'https',
        hostname: 'media-2.api-sports.io',
        pathname: '/football/**',
      },
    ],
  },
};

export default nextConfig;
