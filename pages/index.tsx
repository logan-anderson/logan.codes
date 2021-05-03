import { PreviewData } from "next-tinacms-github";
import { Post } from "../interfaces";
import getPosts from "../utils/getPosts";
import Layout from "../components/layout/Layout";
import BlogCard from "../components/BlogCard";
import { GitFile } from "react-tinacms-github/dist/form/useGitFileSha";
import { Hero } from "../components/Hero";

interface props {
  posts: Array<Post>;
  preview: boolean;
  file: GitFile;
}
const IndexPage = ({ preview, posts }: props) => {
  return (
    <>
      <Layout title="Home" preview={preview} navDisable={true}>
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
                {posts.slice(0, 3).map((post: Post) => {
                  return <BlogCard post={post} />;
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

export const getStaticProps = async function ({
  preview,
  previewData,
}: {
  preview: boolean;
  previewData: PreviewData<any>;
}) {
  const { posts } = await getPosts(preview, previewData, "content/blog");
  return {
    props: {
      posts,
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: "content/home.json",
        data: (await import("../content/home.json")).default,
      },
    },
  };
};

export default IndexPage;
