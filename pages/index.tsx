import Layout from "../components/layout/Layout";
import BlogCard from "../components/BlogCard";
import { Hero } from "../components/Hero";
import { AllPostsQuery, AllPostsQueryRes } from "../graphql-queries";
import { createLocalClient } from "../utils";

interface props {
  data: AllPostsQueryRes;
}
const IndexPage = ({ data }: props) => {
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
                {data?.getPostsList?.slice(0, 3).map((post) => {
                  return (
                    <BlogCard
                      post={{
                        fileName: post.sys?.filename || "",
                        fileRelativePath: post.sys?.filename || "",
                        data: {
                          markdownBody: post.data?._body || "",
                          frontmatter: {
                            author: post.data?.author?.data?.name || "",
                            avatar: post.data?.author?.data?.avatar || "",
                            date: post.data?.date || "",
                            description: post.data?.description || "",
                            minRead: post.data?.minRead || "",
                            tags: post.data?.tags as string[],
                            title: post.data?.title || "",
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

const client = createLocalClient();
/**
 * Fetch data with getStaticProps based on 'preview' mode
 */

export const getStaticProps = async function () {
  const data = await client.request<AllPostsQueryRes>(AllPostsQuery, {
    variables: {},
  });
  // sort based on date added
  data.getPostsList.sort(
    (x, y) =>
      new Date(y.data?.date || "").getTime() -
      new Date(x.data?.date || "").getTime()
  );
  data.getPostsList = data.getPostsList.slice(0, 3);
  return {
    props: {
      data: data,
    },
  };
};

export default IndexPage;
