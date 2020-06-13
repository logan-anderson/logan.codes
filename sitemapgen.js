const sitemap = require("nextjs-sitemap-generator");
const fs = require("fs");
const BUILD_ID = fs.readFileSync(".next/BUILD_ID").toString();
(async function() {
    await Promise.resolve(sitemap({
        baseUrl: "https://logana.dev",
        ignoredPaths: ['[slug]', 'api', 'github'],
        pagesDirectory: __dirname + "/.next/server/static/" + BUILD_ID + "/pages",
        targetDirectory: "public/",
        extraPaths: ['/'],
        pagesConfig: {
            '/': {
                priority: '1',
            },
            '/blog': {
                priority: '0.5',
                changefreq: 'daily'
            }
        },
    }));
    // → 🎉
  }());
