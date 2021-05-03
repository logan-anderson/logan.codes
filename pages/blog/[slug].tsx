import { GetStaticProps } from "next";
import Layout from "../../components/layout/Layout";
import { BreadCrumb } from "../../components/BreadCrumb";
import { MarkdownBody } from "../../components/Markdown";
import { createLocalClient } from "../../utils";
import { getPostQuery, getPostQueryRes } from "../../graphql-queries";
import { BlogHeader } from "../../components/blog";

interface PageProps {
  post: getPostQueryRes;
}
const BlogPage = ({ post }: PageProps) => {
  console.log({ post });
  const { data, sys, id } = post.getPostsDocument;
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
      <div className="relative py-16 overflow-hidden">
        <BlogHeader />
        <div className="relative px-4 sm:px-6 lg:px-8">
          <MarkdownBody source={data?._body || ""} />
        </div>
      </div>
    </Layout>
  );
};

const client = createLocalClient();
/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps: GetStaticProps = async function ({ params }) {
  const relativePath = (params?.slug as string) + ".md";
  const post = await client.request<getPostQueryRes>(getPostQuery, {
    variables: {
      relativePath,
    },
  });
  return {
    props: {
      post,
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
