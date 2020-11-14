// import fs from "fs";
// import RSS from "rss";
// import getPostsSync from "../utils/getPostsSync";

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
