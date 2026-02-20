import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Le joker "**" autorise TOUS les domaines
      },
    ],
  },
};

export default nextConfig;
