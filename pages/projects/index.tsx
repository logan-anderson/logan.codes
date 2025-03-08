import { GetStaticProps } from "next";
import React from "react";
import { BreadCrumb } from "~/components/BreadCrumb";
import Layout from "~/components/layout/Layout";
import { ProjectCard } from "~/components/ProjectCard";

export interface Projects {
  url?: string;
  label: string;
  excerpt: string;
  slug: string;
  imgUrl?: string;
  fromGithub?: boolean;
  rawMarkdown?: string;
}
const ProjectPage: React.FC<{ projects: Projects[]; preview: boolean }> = (
  props
) => {
  return (
    <Layout preview={props.preview} title="Projects">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Projects
          </h1>
          <BreadCrumb links={[{ label: "Projects", href: "/projects" }]} />
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            A collection of my work and experiments in web development, machine
            learning, and more.
          </p>
        </div>

        <div className="mt-16">
          <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
            {props.projects?.map((item) => (
              <div key={item.slug} className="break-inside-avoid mb-4">
                <ProjectCard project={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const data = require("../../content/projects.json");

  return {
    props: {
      projects: data.projects,
      preview: ctx.preview ?? false,
    },
  };
};

export default ProjectPage;
