import { Post } from "../interfaces";
const matter = require("gray-matter");
const fs = require("fs");

module.exports = (): Post[] => {
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
