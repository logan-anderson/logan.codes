require("dotenv").config();
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  rewrites: async () => [
    { source: "/admin", destination: "/admin/index.html" },
  ],
};
module.exports = withBundleAnalyzer(
  withPWA({
    ...nextConfig,
    pwa: {
      dest: "public",
    },
    runtimeCaching,
  })
);
