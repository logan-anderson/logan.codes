---
draft: false
minRead: '4'
title: RSS Feeds in a nextjs site
author: content/authors/logan_anderson.md
description: 'How to add an RSS feed for blog posts into a nextjs site. Simple and easy. '
tags:
  - code
  - react
  - nextjs
date: 'Sat Jun 13 2020 13:51:25 GMT-0300 (Atlantic Daylight Time)'
---


# Adding an RSS feed to a nextjs Site

Recently, I took on the task of adding an **RSS feed to a nextjs site** (this site). After searching around Google for a solution I quickly realized that all the solutions were outdated or not in dept. Frustrated, I noted that [nextjs.org](https://logana.dev) has an RSS feed so I looked around there code to see how they dogfood nextjs and more importantly how they added an RSS feed. I am posting my finding here to document them and to save others the Saturday morning I spent doing this.

## The process

### 1. Make a function to generate the RSS feed

If you want to read over the [RSS standards](https://en.wikipedia.org/wiki/RSS) and generate everything your self Feel free! Personally, I used the [RSS npm package](https://www.npmjs.com/package/rss) to help me deal with the details of an RSS feed. You can install this package with `yarn add rss` or `npm i --save rss`. In my case, the function looked like this. We are also going to use ts-node to run this script (you could also just use node and ignore the types). So in my case I will add this packaged by running `yarn add --dev ts-node`

```typescript
import { Post } from "../interfaces";

const fs = require("fs");
const RSS = require("rss");
const getPostsSync = require("../utils/getPostsSync");

function dateSortDesc(a: any, b: any) {
  const date1 = new Date(a.data.frontmatter.date);
  const date2 = new Date(b.data.frontmatter.date);
  if (date1 > date2) return -1;
  if (date1 < date2) return 1;
  return 0;
}

function generate() {
  const previewItems = getPostsSync();
  const feed = new RSS({
    title: "Logan's blog",
    site_url: "https://logana.dev",
    feed_url: "https://logana.dev/feed.xml",
  });

  previewItems.sort(dateSortDesc).map((post: Post) => {
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
  fs.writeFileSync("./public/feed.xml", rss);
}

generate();
```

You will have to make your own function to get the blog posts and all of their metadata. (It will be different or every use case) You can take a look at the one I [used for this blog](https://github.com/logan-anderson/blog-nextjs-tina-tailwind/blob/master/utils/getPostsSync.ts) as an example.

Notes:

- the function is synchronous (it does not have to be though)
- Write output to `./public/feed.xml`

###

### 2. update build scripts

Finally, you need to update the build scripts so all of the goodness we just wrote will actually happen. In my case I updated the `package.json` to look something like this

```json
//...
"scripts": {
    "build": "yarn build:rss && next build,
    "build:rss": "ts-node ./scripts/generate-rss.ts",
    //...
  },
//...
```

This will generate the RSS feed, write it to the public folder and then build the site.

Now just run `yarn build` or `npm run build` and you should see the feed.xml. If you run `yarn start` and go you localhost:3000/feed.xml you should see your RSS feed.

If you prefer to just see the code you [**can see the PR for all of this code here**](https://github.com/logan-anderson/blog-nextjs-tina-tailwind/pull/3). Feel free to leave a comment there if you run into an issue or [open a GitHub issue](https://github.com/logan-anderson/blog-nextjs-tina-tailwind/issues/new).

**Note: This blogpost was recently updated as nextjs 10 broke some of the behaviour. [Here is the PR went from the old code to the new code](https://github.com/logan-anderson/blog-nextjs-tina-tailwind/pull/46)**

Thanks for reading. As always if you see anything wrong with this post feel free to edit this site (button below) and make a PR!
