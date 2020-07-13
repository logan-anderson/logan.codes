// @ts-ignore
import * as Prism from "prismjs";
import { useEffect } from "react";
import { InlineForm } from "react-tinacms-inline";
import matter from "gray-matter";
import { GetStaticProps } from "next";
import Error from "next/error";
import { useGithubMarkdownForm } from "react-tinacms-github";
import {
  getGithubPreviewProps,
  parseMarkdown,
  GithubFile,
} from "next-tinacms-github";
import { InlineWysiwyg } from "react-tinacms-editor";
import ReactMarkdown from "react-markdown";

import Layout from "../../components/layout/Layout";
import { usePlugin } from "tinacms";
import { Post } from "../../interfaces";
import { createMarkdownDeleteAction } from "../../plugins/DeleteActions";
import DeleteAction from "../../plugins/delete-test";
// import { createMarkdownDeleteAction } from "react-tinacms-github";

const InlineWrapper = ({ children }: any) => {
  useEffect(() => {
    // doesn't work =(
    // const loadLanguages = require('prismjs/components/index');
    // console.log(loadLanguages)
    // loadLanguages(['ts']);
    Prism.highlightAll();
  });

  // function handleInlineEdit() {
  //   preview ? activate() : deactivate();
  // }
  // useMemo(handleInlineEdit, [preview]);
  return children;
};

interface PageProps {
  preview: boolean;
  post: Post;
  file: GithubFile<any>;
}
const BlogPage = (props: PageProps) => {
  if (!props.file) {
    return <Error statusCode={404} />;
  }
  const deleteAction = createMarkdownDeleteAction();
  const formOptions = {
    label: "Edit doc page",
    actions: [DeleteAction],
    fields: [
      {
        name: "frontmatter.title",
        label: "Title",
        component: "text",
      },
      {
        name: "frontmatter.author",
        label: "Title",
        component: "text",
      },
      {
        name: "frontmatter.date",
        label: "Date",
        component: "date",
        dateFormat: "MMMM DD YYYY",
        timeFormat: false,
        required: true,
      },
      {
        name: "frontmatter.description",
        label: "Description",
        component: "textarea",
        required: false,
      },
      {
        name: "frontmatter.tags",
        component: "tags",
        label: "Tags",
        description: "Tags for this post",
      },
    ],
  };

  const [data, form] = useGithubMarkdownForm(props.file, formOptions);
  usePlugin(form);

  return (
    <Layout
      title={data.frontmatter.title}
      description={data.frontmatter.description}
    >
      <InlineForm form={form}>
        <InlineWrapper preview={props.preview}>
          <InlineWysiwyg name="markdownBody">
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
    fallback: true,
    paths,
  };
};

export default BlogPage;
