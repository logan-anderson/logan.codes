import React from "react";
import Layout from "~/components/layout/Layout";
import BlogCard from "~/components/BlogCard";
import { Hero } from "~/components/Hero";
import { client } from "~/tina/__generated__/client";
import type { PostConnectionEdges } from "../tina/__generated__/types";
import Link from "next/link";
import { NextPage } from "next";
import { ExperienceCards } from "~/components/ui/experience-cards";

interface Props {
  featuredPosts: PostConnectionEdges[];
}

const IndexPage: NextPage<Props> = ({ featuredPosts }) => {
  // Sort featured posts without mutating props
  const sortedFeaturedPosts = React.useMemo(
    () =>
      [...featuredPosts].sort(
        (a, b) =>
          new Date(b.node?.date || "").getTime() -
          new Date(a.node?.date || "").getTime()
      ),
    [featuredPosts]
  );

  return (
    <>
      <Layout title="Home" preview={false}>
        <Hero />
        <div className="flex flex-col gap-12 mt-12">
          <section>
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-12">
              Experience
            </h2>
            <ExperienceCards />
            <div className="mt-12 text-center">
              <Link
                href="/experience"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                View All Experience
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </section>
          <section>
            <div className="relative bg-gray-50 dark:bg-gray-800 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8 rounded-3xl">
              <div className="relative max-w-7xl mx-auto">
                <div className="text-center">
                  <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                    Latest Blog Posts
                  </h2>
                  <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
                    Thoughts on web development, machine learning, and
                    technology
                  </p>
                </div>
                <div className="mt-12 max-w-lg mx-auto grid gap-8 lg:grid-cols-3 lg:max-w-none">
                  {sortedFeaturedPosts.map((postData) => {
                    const post = postData.node;
                    return (
                      <BlogCard
                        key={post?._sys?.filename}
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
                <div className="mt-12 text-center">
                  <Link
                    href="/blog"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                  >
                    View All Posts
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */

export const getStaticProps = async function () {
  const res = await client.queries.postConnection({
    filter: {
      draft: { eq: false },
    },
    last: 3,
    sort: "date",
  });

  return {
    props: {
      featuredPosts: res.data.postConnection.edges,
    },
  };
};

export default IndexPage;
