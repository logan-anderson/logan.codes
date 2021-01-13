import { InlineForm, useInlineForm } from "react-tinacms-inline";
import { useMemo } from "react";
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
import Layout from "../../components/layout/Layout";
import { usePlugin } from "tinacms";
import { Post } from "../../interfaces";
import { BreadCrumb } from "../../components/BreadCrumb";
import { MarkdownBody, STYLES } from "../../components/Markdown";

const InlineWrapper = ({ children, preview }: any) => {
  const { deactivate, activate } = useInlineForm();
  function handleInlineEdit() {
    preview ? activate() : deactivate();
  }
  useMemo(handleInlineEdit, [preview]);
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
  const formOptions = {
    label: "Edit doc page",
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
      preview={props.preview}
      description={data.frontmatter.description}
    >
      <BreadCrumb
        links={[
          { label: "Blog", href: "/blog" },
          {
            label: data.frontmatter.title,
          },
        ]}
      />
      <div className="relative py-16 bg-white overflow-hidden">
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
          <div className="relative h-full text-lg max-w-prose mx-auto">
            <svg
              className="absolute top-12 left-full transform translate-x-32"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
              />
            </svg>
            <svg
              className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
              />
            </svg>
            <svg
              className="absolute bottom-12 left-full transform translate-x-32"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="d3eb07ae-5182-43e6-857d-35c643af9034"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
              />
            </svg>
          </div>
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <InlineForm form={form}>
            <InlineWysiwyg name="markdownBody" className={STYLES}>
              <InlineWrapper preview={props.preview}>
                <MarkdownBody source={data.markdownBody} />
              </InlineWrapper>
            </InlineWysiwyg>
          </InlineForm>
        </div>
      </div>
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
