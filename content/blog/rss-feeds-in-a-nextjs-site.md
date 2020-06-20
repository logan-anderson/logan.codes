---
title: RSS Feeds in a nextjs site
author: Logan Anderson
description: "How to add an RSS feed for blog posts into a nextjs site. Simple and easy. "
date: "Sat Jun 13 2020 13:51:25 GMT-0300 (Atlantic Daylight Time)"
tags:
  - code
  - react
  - nextjs
---

# Adding an RSS feed to a nextjs Site

Recently, I took on the task of adding an **RSS feed to a nextjs site** (this site). After searching around google for a solution I quickly realized that all the solutions were outdated or not in dept. Frustrated, I noted that [nextjs.org](https://logana.dev) has an RSS feed so I looked around there code to see how they dogfood nextjs and more importantly how they added an RSS feed. I am posting my finding here to document them and to save others the Saturday morning I spent doing this.

## The process

### 1. Make a function to generate the RSS feed

If you want to read over the [RSS standards](https://en.wikipedia.org/wiki/RSS) and generate everything your self Feel free! Personally, I used the [RSS npm package](https://www.npmjs.com/package/rss) to help me deal with the details of an RSS feed. You can install this package with `yarn add rss` or `npm i --save rss`. In my case, the function looked like this.

```typescript
import fs from "fs";
import RSS from "rss";
import getPostsSync from "../utils/getPostsSync";

function dateSortDesc(a, b) {
  const date1 = new Date(a.data.frontmatter.date);
  const date2 = new Date(b.data.frontmatter.date);
  if (date1 > date2) return -1;
  if (date1 < date2) return 1;
  return 0;
}

function generate() {
  const previewItems = getPostsSync(false, null, "content/blog");
  const feed = new RSS({
    title: "Logan's blog",
    site_url: "https://logana.dev",
    feed_url: "https://logana.dev/feed.xml",
  });

  previewItems.sort(dateSortDesc).map((post) => {
    feed.item({
      title: post.data.frontmatter.title,
      guid: post.fileName,
      url: `https://logana.dev/blog/${post.fileName}`,
      date: post.data.frontmatter.date,
      description: post.data.frontmatter.description,
      author: post.data.frontmatter.author,
    });
  });

  const rss = feed.xml({ indent: true });
  fs.writeFileSync("./.next/static/feed.xml", rss);
}

generate();
```

You will have to make your own function to get the blog posts and all of there metadata. (It will be different or every use case) You can take a look at the one I [used for this blog](https://github.com/logan-anderson/blog-nextjs-tina-tailwind/blob/master/utils/getPostsSync.ts) as an example.

Notes:

- the function is synchronous (it does not have to be though)
- Write output to `./.next/static/feed.xml`

### 2. Tell webpack about this file so it gets compiled

This is pretty simple. We just have to change our `next.config.js` to include this.

```js
module.exports = {
  //...
  webpack: (config, { isServer, dev }) => {
    //...
    if (isServer && !dev) {
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = { ...(await originalEntry()) };
        // This script imports components from the Next app, so it's transpiled to `.next/server/scripts/build-rss.js`
        entries["./scripts/generate-rss.js"] = "./scripts/generate-rss.js";
        return entries;
      };
    }
    return config;
  },
  //...
};
```

the main point here is that we are telling webpack to compile our file by writing `entries['./scripts/generate-rss.js'] = './scripts/generate-rss.js';`. Now if we build our project with `yarn build` or `next build` or `npm run build` we will see that this file gets compiled

### 3. rewrite ./.next/static/feed.xml to the root of our site

to do this we will use an experimental feature called **rewrite** so that `feed.xml` is rewritten to the root of the project and served under <yourdomain>/feed.xml

We will again add more to our `next.config.json`. This time adding this

```js
module.exports = {
  target: "serverless",
  experimental: {
    modern: true,
    rewrites() {
      return [
        {
          source: "/feed.xml",
          destination: "/_next/static/feed.xml",
        },
      ];
    },
  },
  //...
};
```

If you want to see this in action you can look at the [next.config.js for my blog](https://github.com/logan-anderson/blog-nextjs-tina-tailwind/blob/master/next.config.js) to the [one for nextjs.org](https://github.com/vercel/next-site/blob/master/next.config.js)

### 4. update build scripts

Finally, you need to update the build scripts so all of the goodness we just wrote will actually happen. In my case I updated the `package.json` to look something like this

```json
//...
"scripts": {
    "build": "next build && yarn build:rss",
    "build:rss": "node ./.next/serverless/scripts/generate-rss.js",
    //...
  },
//...
```

This will build the site and then run the generate the RSS feed.

Now just run `yarn build` or `npm run build` and you should see the feed.xml. IF you run `yarn start` and go you localhost:3000/feed.xml you should see your RSS feed.

If you prefer to just see the code you [**can see the PR for all of this code here**](https://github.com/logan-anderson/blog-nextjs-tina-tailwind/pull/3). Feel free to leave a comment there if you run into an issue or [open a GitHub issue](https://github.com/logan-anderson/blog-nextjs-tina-tailwind/issues/new).

Thanks for reading. As always if you see anything wrong with this post feel free to edit this site (button below) and make a PR!
