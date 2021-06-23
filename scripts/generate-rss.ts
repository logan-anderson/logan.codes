// import fs from "fs";
// import RSS from "rss";
// import getPostsSync from "../utils/getPostsSync";

import { Post } from "../interfaces";

const fs = require("fs");
const RSS = require("rss");

const matter = require("gray-matter");

const getPostsSync = (): Post[] => {
  const contentDir = "content/blog";
  const files = getLocalFiles(contentDir);
  const posts: Array<Post> = files.map((file: string) => {
    const content = fs.readFileSync(`${file}`, "utf8");
    const data = matter(content);
    return {
      fileName: file.substring(contentDir.length + 1, file.length - 3),
      fileRelativePath: file,
      data: {
        frontmatter: {
          description: data.data.description || "",
          title: data.data.title,
          date: data.data.date || "",
          author: data.data.author || "",
        },
        markdownBody: data.content,
      },
    };
  });
  return posts;
};

const getLocalFiles = (filePath: string) => {
  // grab all md files
  const fg = require("fast-glob");
  const files = fg.sync(`${filePath}**/*.md`);
  return files;
};

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
