import {
  getGithubPreviewProps,
  parseJson,
  PreviewData,
} from "next-tinacms-github";
import { useGithubJsonForm } from "react-tinacms-github";
// import { TimelineLite, gsap } from "gsap";

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
const IndexPage = ({ file, preview, posts }: props) => {
  const formOptions = {
    label: "Home Page",
    fields: [
      {
        label: "Subtitle",
        name: "posts_title",
        component: "text",
      },
    ],
  };
  const [data] = useGithubJsonForm(file, formOptions);

  return (
    <>
      <Layout title="Home" preview={preview} navDisable={true}>
        <Hero />
        <section className="py-12 px-4">
          <h2 className="text-3xl text-center mb-8 font-heading">
            {data.posts_title}
          </h2>

          <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
            <div className="absolute inset-0">
              <div className="bg-white h-1/3 sm:h-2/3" />
            </div>
            <div className="relative max-w-7xl mx-auto">
              <div className="text-center">
                <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
                  Latest Blog posts
                </h2>
                <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
                  libero labore natus atque, ducimus sed.
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
  if (preview) {
    const previewProps = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: "content/home.json",
      parse: parseJson,
    });
    previewProps.props.file;
    return {
      props: {
        posts,
        ...previewProps.props,
      },
    };
  }
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
