import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "portfolio-cache",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 86400,
        },
      },
    },
  ],
});

// next-intl plugin — points to i18n/request.ts for server-side locale config
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    domains: [],
  },
  // pdfjs-dist and mammoth must run as native Node.js modules —
  // excluding them from bundling prevents worker/filesystem conflicts.
  // pdf-parse has been removed in favour of pdfjs-dist.
  // serverExternalPackages: ["pdfjs-dist", "mammoth"],
  // webpack: (config) => {
  //   config.resolve.alias.pdfjs = false;
  //   return config;
  // },
};

export default withNextIntl(withPWA(nextConfig));