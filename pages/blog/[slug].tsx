import { InlineForm, useInlineForm } from "react-tinacms-inline";
import { useMemo } from "react";
import matter from "gray-matter";
import { GetStaticProps } from "next";
import Error from "next/error";
import { useGithubMarkdownForm } from "react-tinacms-github";
import { getGithubPreviewProps, parseMarkdown } from "next-tinacms-github";
import { InlineWysiwyg } from "react-tinacms-editor";
import ReactMarkdown from "react-markdown";

import Layout from "../../components/layout/Layout";
import { usePlugin } from "tinacms";

const InlineWrapper = ({ children, preview }: any) => {
  const { deactivate, activate } = useInlineForm();

  function handleInlineEdit() {
    preview ? activate() : deactivate();
  }
  useMemo(handleInlineEdit, [preview]);
  return children;
};
const BlogPage = (props: any) => {
  if (!props.file) {
    return <Error statusCode={404} />;
  }
  const formOptions = {
    label: "Edit doc page",
    fields: [
      {
        name: "frontmatter.title",
        label: "Title",
        component: "text",
      },
    ],
  };

  const [data, form] = useGithubMarkdownForm(props.file, formOptions);
  usePlugin(form);

  return (
    <Layout title={data.frontmatter.title} preview={props.preview}>
      <InlineForm form={form}>
        <InlineWrapper preview={props.preview}>
          {/* @ts-ignore */}
          <InlineWysiwyg name="markdownBody" sticky={"65px"}>
            <ReactMarkdown source={data.markdownBody} />
          </InlineWysiwyg>
        </InlineWrapper>
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
