/* eslint-disable @typescript-eslint/no-require-imports */
import type { NextConfig } from "next";
const { PrismaPlugin } = require("@prisma/nextjs-monorepo-workaround-plugin");

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
  images: {
    domains: ["avatars.githubusercontent.com", "media.licdn.com"],
  },
};

export default nextConfig;
