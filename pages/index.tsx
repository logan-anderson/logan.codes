import {
  getGithubPreviewProps,
  parseJson,
  PreviewData,
} from "next-tinacms-github";
import { useGithubJsonForm } from "react-tinacms-github";
// import { TimelineLite, gsap } from "gsap";
import { TextPlugin } from "gsap/dist/TextPlugin";
// import * as gsap from 'gsap';
import { gsap } from "gsap";

import { Post } from "../interfaces";
import getPosts from "../utils/getPosts";
import Layout from "../components/layout/Layout";
import BlogCard from "../components/BlogCard";
import { GitFile } from "react-tinacms-github/dist/form/useGitFileSha";
import { useEffect, createRef } from "react";

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
  const words = ["Coding", "Coffee", "Math", "Frontend dev", "Backend dev"];
  let container = createRef<HTMLSpanElement>();
  let cursor = createRef<HTMLSpanElement>();
  const [data] = useGithubJsonForm(file, formOptions);

  useEffect(() => {
    gsap.killTweensOf({});
    gsap.registerPlugin(TextPlugin);
    gsap.to(cursor, 0.7, {
      opacity: 0,
      ease: "power2.inOut",
      repeat: -1,
    });

    // worlds
    const masterTL = gsap.timeline({ repeat: -1 });
    words.forEach((word) => {
      const animationLen = word.length * 0.2;
      let tl = gsap.timeline();
      tl.to(container, animationLen, {
        text: word,
        repeat: 1,
        yoyo: true,
        repeatDelay: 1.2,
      });
      masterTL.add(tl);
    });
  }, []);

  return (
    <Layout title="Home" preview={preview}>
      <section className="py-12 px-4 text-center">
        <div className="w-full max-w-3xl mx-auto">
          <h2 className="text-5xl mt-2 mb-6 leading-tight font-heading">
            A simple blog about{" "}
            <span
              className={"text-5xl mt-2 mb-6 leading-tight font-heading"}
              ref={(div) => {
                // @ts-ignore
                if (div) container = div;
              }}
            />
            <span
              ref={(span) => {
                // @ts-ignore
                if (span) cursor = span;
              }}
            >
              _
            </span>
            {/* coding{" "}
            <img className="icon-lg" src="/icons/programmer.svg" />, coffee
            <img className="icon-lg" src="/icons/tea-hot.svg" />, and more */}
          </h2>

          {/* <a className="text-blue-700 hover:underline" href="#">
          Learn more &raquo;
        </a> */}
        </div>
      </section>

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
