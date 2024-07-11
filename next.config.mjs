import runtimeCaching from "next-pwa/cache.js";
import pwa from "next-pwa";

const withPWA = pwa({
  dest: "public",
  runtimeCaching,
  register: true,
  reloadOnOnline: true,
  cacheOnFrontEndNav: true,
  disable: process.env.NODE_ENV === "development",
  skipWaiting: true,
  fallbacks: {
    image: "/fallback.png",
    document: "/offline",
  },
});

const nextConfig = {
  poweredByHeader: false,
  swcMinify: true,
  reactStrictMode: true,
  compress: true,
  experimental: {
    turbo: {
      resolveExtensions: [
        ".mdx",
        ".tsx",
        ".ts",
        ".jsx",
        ".js",
        ".mjs",
        ".json",
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    };

    return config;
  },
};

export default withPWA(nextConfig);
