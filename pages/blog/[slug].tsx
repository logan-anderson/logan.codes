import { GetStaticPathsResult, GetStaticProps } from "next";

import { okaidia as Theme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import Layout from "../../components/layout/Layout";
import { BreadCrumb } from "../../components/BreadCrumb";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { STYLES } from "../../components/Markdown";
import { BlogHeader } from "../../components/blog";
import { Comments } from "../../components/Cmments";
import BlogCard from "../../components/BlogCard";

import { client } from "../../.tina/__generated__/client";
import type {
  PostAndFeaturePostsQuery,
  Exact,
  Author as AuthorType,
} from "../../.tina/__generated__/types";
import { Author } from "../../components/AuthorDetail";
import { useTina } from "tinacms/dist/react";
import { getPosts } from "../../utils/getPosts";
import { useRouter } from "next/router";
interface PageProps {
  data: PostAndFeaturePostsQuery;
  variables: Exact<{
    relativePath: string;
  }>;
  query: string;
}
const BlogPage = ({ data: postData, query, variables }: PageProps) => {
  const router = useRouter();

  const { data: tinaData } = useTina({ data: postData, query, variables });

  if (router.isFallback) {
    return <div>Loading</div>;
  }
  const data = tinaData.post;
  return (
    <Layout
      title={data?.title || ""}
      preview={false}
      description={data?.description || ""}
    >
      <BreadCrumb
        links={[
          { label: "Blog", href: "/blog" },
          {
            label: data?.title || "",
          },
        ]}
      />
      {/* @ts-ignore */}
      <Author author={data?.author || ({} as AuthorType)} post={data} />
      <div className="relative pb-16 overflow-hidden">
        <BlogHeader />
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className={STYLES}>
            <TinaMarkdown
              content={data?.body}
              components={{
                h1: (props) => {
                  return (
                    <h1 className="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 dark:text-gray-50">
                      {props?.children}
                    </h1>
                  );
                },
                p: (props) => {
                  return (
                    <p className="text-gray-500 mx-auto">{props?.children}</p>
                  );
                },
                code_block: (props) => {
                  return (
                    <SyntaxHighlighter style={Theme} language={props?.lang}>
                      {props?.value}
                    </SyntaxHighlighter>
                  );
                },
                // @ts-ignore
                Iframe: ({
                  url,
                  height,
                  width,
                }: {
                  url: string;
                  width: string;
                  height: string;
                }) => {
                  return (
                    <iframe width={width} height={height} src={url || ""} />
                  );
                },
              }}
            />
            <Comments />
          </div>
          <div className="text-center">
            <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-4xl sm:leading-10">
              Read more
            </h2>
          </div>
          <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
            {data?.featurePosts?.map((edge) => {
              const post = edge?.post;
              return (
                <BlogCard
                  post={{
                    fileName: post?._sys?.filename || "",
                    fileRelativePath: post?._sys?.filename || "",
                    data: {
                      markdownBody: "",
                      frontmatter: {
                        author: post?.author?.name || "",
                        avatar: post?.author?.avatar || "",
                        date: post?.date || "",
                        description: post?.description || "",
                        minRead: post?.minRead || 2,
                        tags: post?.tags as string[],
                        title: post?.title || "",
                      },
                    },
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps: GetStaticProps = async function ({ params }) {
  const relativePath = (params?.slug as string) + ".md";
  const tinaProps = await client.queries.postAndFeaturePosts({ relativePath });

  const today = new Date();
  const isDraft =
    new Date(tinaProps.data.post.date || "") >= today &&
    tinaProps.data.post.draft;

  const showDrafts = Boolean(process.env.NEXT_PUBLIC_SHOW_DRAFTS || "");
  return {
    notFound: isDraft && !showDrafts,
    props: {
      ...tinaProps,
    },
  };
};

export const getStaticPaths = async () => {
  const postsListData = await getPosts();

  const res: GetStaticPathsResult<{ slug: string }> = {
    paths:
      postsListData.data.postConnection?.edges?.map((post) => ({
        params: { slug: post?.node?._sys.filename || "" },
      })) || [],
    fallback: true,
  };

  return res;
};

export default BlogPage;
