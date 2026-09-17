import React from "react";
import Layout from "~/components/layout/Layout";
import BlogCard from "~/components/BlogCard";
import { FeaturedPost } from "~/components/FeaturedPost";
import { Hero } from "~/components/Hero";
import { ProjectCard } from "~/components/ProjectCard";
import { client } from "~/tina/__generated__/client";
import Link from "next/link";
import { NextPage } from "next";
import { ExperienceCards } from "~/components/ui/experience-cards";
import {
  getHomepageProject,
  resolveHomepagePosts,
  toCardPost,
} from "~/utils/homepage";
import { Projects } from "~/pages/projects";
import projectsJson from "../content/projects.json";

interface Props {
  featuredPost: ReturnType<typeof toCardPost> | null;
  recentPosts: ReturnType<typeof toCardPost>[];
  homeProject: Projects | null;
}

const sectionLinkClassName =
  "inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200";

const IndexPage: NextPage<Props> = ({
  featuredPost,
  recentPosts,
  homeProject,
}) => {
  return (
    <>
      <Layout title="Home" preview={false}>
        <Hero />
        <div className="flex flex-col gap-16 mt-12 pb-8">
          <section id="experience">
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl mb-12">
              Where I've worked
            </h2>
            <ExperienceCards />
            <div className="mt-12 text-center">
              <Link href="/experience" className={sectionLinkClassName}>
                View all experience
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
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

          {featuredPost && (
            <section>
              <div className="relative bg-gray-50 dark:bg-gray-800 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8 rounded-3xl">
                <div className="relative max-w-7xl mx-auto">
                  <div className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                      Something I've written
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
                      From the notebook.
                    </p>
                  </div>
                  <div className="mt-12 max-w-3xl mx-auto">
                    <FeaturedPost post={featuredPost} />
                  </div>
                  {recentPosts.length > 0 && (
                    <div className="mt-10 max-w-3xl mx-auto grid gap-4 sm:grid-cols-2">
                      {recentPosts.map((post) => (
                        <BlogCard
                          key={post.fileName}
                          post={post}
                          small
                        />
                      ))}
                    </div>
                  )}
                  <div className="mt-12 text-center">
                    <Link href="/blog" className={sectionLinkClassName}>
                      View all posts
                      <svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
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
          )}

          {homeProject && (
            <section>
              <div className="text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  What I'm building
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
                  What I'm building now.
                </p>
              </div>
              <div className="mt-12 max-w-xl mx-auto">
                <ProjectCard project={homeProject} />
              </div>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                {homeProject.website && (
                  <a
                    href={homeProject.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-base font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Visit live site
                  </a>
                )}
                <Link href="/projects" className={sectionLinkClassName}>
                  View all projects
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
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
          )}
        </div>
      </Layout>
    </>
  );
};

export const getStaticProps = async function () {
  const postsRes = await client.queries.homepagePosts({
    filter: {
      draft: { eq: false },
    },
    last: 10,
    sort: "date",
  });

  const { featured, secondary } = resolveHomepagePosts(
    postsRes.data.postConnection.edges
  );
  const homeProject = getHomepageProject(
    projectsJson.projects as Projects[]
  );

  return {
    props: {
      featuredPost: featured?.node ? toCardPost(featured.node) : null,
      recentPosts: secondary
        .filter((edge) => edge.node)
        .map((edge) => toCardPost(edge.node!)),
      homeProject,
    },
  };
};

export default IndexPage;
