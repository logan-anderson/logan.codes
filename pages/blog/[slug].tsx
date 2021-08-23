import { GetStaticProps } from "next";
import Layout from "../../components/layout/Layout";
import { BreadCrumb } from "../../components/BreadCrumb";
import { MarkdownBody, STYLES } from "../../components/Markdown";
import { getPostQuery, getPostQueryRes } from "../../graphql-queries";
import { BlogHeader } from "../../components/blog";
import { Author } from "../../components/AuthorDetail";
import { Author as AuthorType } from "../../.tina/__generated__/types";
import { LocalClient } from "tinacms";
import { Comments } from "../../components/Cmments";

interface PageProps {
  data: getPostQueryRes;
}
const BlogPage = ({ data: postData }: PageProps) => {
  const { data } = postData.getPostsDocument;
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
      <Author
        author={data?.author || ({} as AuthorType)}
        post={postData.getPostsDocument}
      />
      <div className="relative pb-16 overflow-hidden">
        <BlogHeader />
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className={STYLES}>
            {data?.blocks?.map((block) => {
              if (block?.__typename === "Iframe_Data") {
                return <iframe width="100%" src={block.url || ""} />;
              }
              if (block?.__typename === "LongFormText_Data") {
                return <MarkdownBody source={block.content || ""} />;
              }
              if (block?.__typename === "Img_Data") {
                return <img src={block.img || ""} />;
              }
            })}
            <MarkdownBody source={data?._body || ""} />
            <Comments />
          </div>
        </div>
      </div>
    </Layout>
  );
};

const client = new LocalClient();
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
      data: post,
      variables: {
        relativePath,
      },
      query: getPostQuery,
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
