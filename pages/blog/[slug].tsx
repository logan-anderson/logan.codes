import { GetStaticProps } from "next";
import Layout from "../../components/layout/Layout";
import { BreadCrumb } from "../../components/BreadCrumb";
import { MarkdownBody, STYLES } from "../../components/Markdown";
import { getPostQuery, getPostQueryRes } from "../../graphql-queries";
import { BlogHeader } from "../../components/blog";
import { Author } from "../../components/AuthorDetail";
import { getStaticPropsForTina, staticRequest } from "tinacms";
import { Comments } from "../../components/Cmments";
import {
  PostsConnection,
  Author as AuthorType,
} from "../../.tina/__generated__/types";

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
      <Author author={data?.author?.data || ({} as AuthorType)} post={data} />
      <div className="relative pb-16 overflow-hidden">
        <BlogHeader />
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className={STYLES}>
            {data?.blocks?.map((block) => {
              if (block?.__typename === "PostsBlocksIframe") {
                return <iframe width="100%" src={block.url || ""} />;
              }
              if (block?.__typename === "PostsBlocksLongFormText") {
                return <MarkdownBody source={block.content || ""} />;
              }
              if (block?.__typename === "PostsBlocksImg") {
                return <img src={block.img || ""} />;
              }
            })}
            <MarkdownBody source={data?.body || ""} />
            <Comments />
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
  const tinaProps = await getStaticPropsForTina({
    query: getPostQuery,
    variables: {
      relativePath,
    },
  });
  return {
    props: {
      ...tinaProps,
    },
  };
};

export const getStaticPaths = async () => {
  const postsListData = (await staticRequest({
    query: `#graphql
      {
         getPostsList{
          edges {
            node {
              sys {
                filename 
              }
            }
          }
        }
      }
    `,
  })) as { getPostsList: PostsConnection };
  return {
    paths: postsListData.getPostsList?.edges?.map((post) => ({
      params: { slug: post?.node?.sys.filename },
    })),
    fallback: "blocking",
  };
};

export default BlogPage;
