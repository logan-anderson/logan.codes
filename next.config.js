// const path = require("path")
const withSvgr = require("next-svgr")
require("dotenv").config()
const tinaWebpackHelpers = require('@tinacms/webpack-helpers')


module.exports = withSvgr({
  target: 'serverless',
  experimental: {
    modern: true,
    rewrites() {
      return [
        {
          source: '/feed.xml',
          destination: '/_next/static/feed.xml'
        },
      ];
    },
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.node = {
      fs: "empty",
    }
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    })

    if (isServer && !dev) {
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = { ...(await originalEntry()) };
        // This script imports components from the Next app, so it's transpiled to `.next/server/scripts/build-rss.js`
        entries['./scripts/generate-rss.js'] = './scripts/generate-rss.js';
        return entries;
      };
    }

    if (dev) {
      tinaWebpackHelpers.aliasTinaDev(config, '../../tina-official/tinacms')
    }
    return config
    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   "@components": path.resolve(__dirname, "./components"),
    //   "@utils": path.resolve(__dirname, "./utils"),
    //   "@docs": path.resolve(__dirname, "./docs"),
    //   "@hooks": path.resolve(__dirname, "./hooks"),
    // }

    return config
  },
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    REPO_FULL_NAME: process.env.REPO_FULL_NAME,
    BASE_BRANCH: process.env.BASE_BRANCH,
  },
})


