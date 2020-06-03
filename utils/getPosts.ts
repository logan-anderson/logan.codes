import matter from "gray-matter";
import {
  getFiles as getGithubFiles,
  PreviewData,
  getGithubPreviewProps,
  parseMarkdown,
} from "next-tinacms-github";

import { Post } from "../interfaces";
export default async (
  preview: boolean,
  previewData: PreviewData<any>,
  contentDir: string
): Promise<Array<Post>> => {
  const fs = require("fs");
  const files = preview
    ? await getGithubFiles(
        contentDir,
        previewData.working_repo_full_name,
        previewData.head_branch,
        previewData.github_access_token
      )
    : await getLocalFiles(contentDir);
  const posts: Array<Post> = await Promise.all(
    files.map(async (file: string) => {
      if (preview) {
        const previewProps = await getGithubPreviewProps({
          ...previewData,
          fileRelativePath: file,
          parse: parseMarkdown,
        });
        return {
          fileName: file.substring(contentDir.length + 1, file.length - 3),
          fileRelativePath: file,
          data: previewProps.props.file?.data,
        };
      }
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
    })
  );
  return posts;
};

const getLocalFiles = async (filePath: string) => {
  // grab all md files
  const fg = require("fast-glob");
  const files = await fg(`${filePath}**/*.md`);
  return files;
};
