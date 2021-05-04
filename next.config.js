// const path = require("path")
const withSvgr = require("next-svgr");
require("dotenv").config();
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(
  withPWA(
    withSvgr({
      images: {
        loader: "cloudinary",
        domains: ["res.cloudinary.com"],
      },
      pwa: {
        dest: "public",
      },
      runtimeCaching,
      webpack: (config) => {
        config.node = {
          fs: "empty",
        };
        config.module.rules.push({
          test: /\.md$/,
          use: "raw-loader",
        });
        // config.resolve.alias = {
        //   ...config.resolve.alias,
        //   "@components": path.resolve(__dirname, "./components"),
        //   "@utils": path.resolve(__dirname, "./utils"),
        //   "@docs": path.resolve(__dirname, "./docs"),
        //   "@hooks": path.resolve(__dirname, "./hooks"),
        // }

        return config;
      },
      env: {
        GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
        REPO_FULL_NAME: process.env.REPO_FULL_NAME,
        BASE_BRANCH: process.env.BASE_BRANCH,
        G_MEASUREMENT_ID: process.env.G_MEASUREMENT_ID,
      },
    })
  )
);
