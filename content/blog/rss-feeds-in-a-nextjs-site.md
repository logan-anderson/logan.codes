---
title: RSS Feeds in a nextjs site
author: Logan Anderson
description: 'How to add an RSS feed for blog posts into a nextjs site. Simple and easy. '
date: 'Sat Jun 13 2020 13:51:25 GMT-0300 (Atlantic Daylight Time)'
---
# Adding an RSS feed to a nextjs Site

Recently, I took on the task of adding an **RSS feed to a nextjs site** (this site). After searching around google for a solution  I quickly realized that all the solutions were outdated or not as in dept. Frustrated, I noted that [nextjs.org](https://logana.dev) has an RSS feed so I looked around there code to see how they dogfood nextjs and more importantly how they added an RSS feed.  I am posting my finding here to document them and to save others the Saturday morning I spent doing this. 

## The process
### 1. Make a function to generate the RSS feed
If you want to read over the [RSS standards](https://en.wikipedia.org/wiki/RSS) and generate everything your self Feel free! Personally, I used the [RSS npm package](https://www.npmjs.com/package/rss) to help me deal with the details of an RSS feed. You can install this package with ```yarn add rss``` or ```npm i --save rss```. In my case the function looked like this.
```ts
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
  fs.writeFileSync('./.next/static/feed.xml', rss);
}

generate();
```
You will have to make your own function to get the blog posts and all of there metadata. (It will be different or every use case) You can take a look at the one I [used for this blog](https://github.com/logan-anderson/blog-nextjs-tina-tailwind/blob/master/utils/getPostsSync.ts) as an example. 

Notes:
- the function is synchronous (it does not have to be though)
- Write output to ```./.next/static/feed.xml```


### 2. 