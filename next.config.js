require("dotenv").config();

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  rewrites: async () => [
    { source: "/admin", destination: "/admin/index.html" },
  ],
  redirects: async () => [
    {
      source: "/blog/[slug]",
      destination: "/blog",
      permanent: true,
    },
  ],
};
module.exports = nextConfig;
