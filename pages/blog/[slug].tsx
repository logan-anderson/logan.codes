import * as React from "react";
import { InlineForm, useInlineForm } from "react-tinacms-inline";
import matter from "gray-matter";
import { GetStaticProps } from "next";
import { useGithubMarkdownForm } from "react-tinacms-github";
import { getGithubPreviewProps, parseMarkdown } from "next-tinacms-github";
import { InlineWysiwyg } from 'react-tinacms-editor'
import ReactMarkdown from "react-markdown";
// import { usePlugins } from 'tinacms'



import Layout from "../../components/layout/Layout";
import { usePlugin, useCMS } from "tinacms";
// import BlogCard from "../components/BlogCard";

const BlogPage = ({ file }: { file: any }) => {
  const cms = useCMS()

  React.useEffect(() => {
    import('react-tinacms-editor').then(
      ({ HtmlFieldPlugin, MarkdownFieldPlugin }) => {
        cms.plugins.add(HtmlFieldPlugin)
        cms.plugins.add(MarkdownFieldPlugin)
      }
    )
  }, [])
  const formOptions = {
    label: "Edit doc page",
    fields: [
      {
        name: "frontmatter.title",
        label: "Title",
        component: "text",
      },
      {
        name: "markdownBody",
        label: "Doc Body",
        component: "markdown",
      },
    ],
  };

  const [data, form] = useGithubMarkdownForm(file, formOptions);
  // usePlugin(form)

  return (
    <Layout title={data.frontmatter.title}>
      <InlineForm form={form}>
        <InlineWysiwyg name="markdownBody">
          {/* <div className="text-center"> */}
          <ReactMarkdown source={data.markdownBody} />
          {/* </div> */}
        </InlineWysiwyg>
      </InlineForm>
    </Layout>
  );
};

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
  params,
}: any) {
  const { slug } = params;
  const fileRelativePath = `content/blog/${slug}.md`;

  if (preview) {
    const previewProps = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath,
      parse: parseMarkdown,
    });
    return {
      props: {
        ...previewProps.props,
      },
    };
  }

  const content = await import(`../../content/blog/${slug}.md`);
  const data = matter(content.default);
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
  const fg = require("fast-glob");
  const contentDir = "content/blog";
  const files = await fg(`${contentDir}**/*.md`);
  const paths = files
    .filter((file: string) => !file.endsWith("index.md"))
    .map((file: string) => {
      const path = file.substring(contentDir.length + 1, file.length - 3);
      return { params: { slug: path } };
    });
  return {
    fallback: false,
    paths,
  };
};

export default BlogPage;
