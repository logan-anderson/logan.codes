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
          <div className="flex flex-wrap -mx-4">
            {posts.map((post: Post) => {
              return <BlogCard post={post} />;
            })}
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
