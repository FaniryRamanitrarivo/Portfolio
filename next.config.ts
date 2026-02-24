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
  experimental: {
    serverActions: {
      allowedOrigins: [
        "silver-pancake-4j59xgvwx49h77pj-3000.app.github.dev", // ton Codespace
        "localhost:3000" // Good to keep for local dev outside of Codespaces
      ],
    },
  },
};

export default nextConfig;
