import Layout from "../components/layout/Layout";
import BlogCard from "../components/BlogCard";
import { Hero } from "../components/Hero";
import { client } from "../.tina/__generated__/client";
import type { PostConnectionEdges } from "../.tina/__generated__/types";

interface props {
  featuredPosts: PostConnectionEdges[];
}
const IndexPage = ({ featuredPosts }: props) => {
  // sort based on date added
  featuredPosts.sort(
    (x, y) =>
      new Date(y.node?.date || "").getTime() -
      new Date(x.node?.date || "").getTime()
  );
  return (
    <>
      <Layout title="Home" preview={false} navDisable={true}>
        <Hero />
        <section className="py-12 px-4">
          <div className="relative bg-gray-50 dark:bg-gray-800 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
            <div className="absolute inset-0">
              <div className="bg-white dark:bg-gray-900 h-1/3 sm:h-2/3" />
            </div>
            <div className="relative max-w-7xl mx-auto">
              <div className="text-center">
                <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-4xl sm:leading-10">
                  Latest Blog Posts
                </h2>
                <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
                  {/* {sub title here} */}
                </p>
              </div>
              <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
                {featuredPosts.map((postData) => {
                  const post = postData.node;
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
        </section>
      </Layout>
    </>
  );
};

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */

export const getStaticProps = async function () {
  const res = await client.queries.postConnection();

  return {
    props: {
      featuredPosts: res.data.postConnection.edges?.slice(0, 3),
    },
  };
};

export default IndexPage;
