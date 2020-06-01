import React from 'react'
// import { getGithubPreviewProps, parseMarkdown } from "next-tinacms-github";
// import { InlineForm } from 'react-tinacms-inline'
// import { InlineWysiwyg } from 'react-tinacms-editor'
import matter from "gray-matter"
import { GetStaticProps } from "next";
// import {
//   useGithubJsonForm,
//   useGithubToolbarPlugins,
// } from "react-tinacms-github";
import ReactMarkdown from 'react-markdown'

import Layout from "../../components/layout/Layout";
// import BlogCard from "../components/BlogCard";

const BlogPage = ({ file }: { file: any }) => {
  return (
    <Layout title={file.data.frontmatter.title}>

      {/* <InlineForm form={}> */}
        {/* <InlineWysiwyg name='markdownBody'> */}
        {/* <div className="text-center"> */}
          <ReactMarkdown source={file.data.markdownBody} />
        {/* </div> */}
        {/* </InlineWysiwyg> */}
      {/* </InlineForm> */}

    </Layout>
  )
}

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps: GetStaticProps = async function ({
  // preview,
  // previewData,
  params,
}: any) {
  const { slug } = params;
  const fileRelativePath = `content/blog/${slug}.md`;

  const content = await import(`../../content/blog/${slug}.md`)
  const data = matter(content.default)
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      // the markdown file
      file: {
        fileRelativePath,
        data: {
          frontmatter: data.data,
          markdownBody: data.content,
        },
      },
    },
  };
};


export const getStaticPaths = async function () {
  const fg = require("fast-glob")
  const contentDir = "content/blog"
  const files = await fg(`${contentDir}**/*.md`)
  const paths = files
    .filter((file: string) => !file.endsWith('index.md'))
    .map((file: string) => {
      const path = file.substring(contentDir.length + 1, file.length - 3)
      return { params: { slug: path } }
    });
  return {
    fallback: false,
    paths,
  }
}

export default BlogPage;
