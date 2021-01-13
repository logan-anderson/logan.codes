import { GetStaticProps } from "next";
import React from "react";
import { BreadCrumb } from "../../components/BreadCrumb";
import Layout from "../../components/layout/Layout";
import { ProjectCard } from "../../components/ProjectCard";

export interface Projects {
  url: string;
  label: string;
  excerpt: string;
  slug: string;
  imgUrl?: string;
}
const ProjectPage: React.FC<{ projects: Projects[]; preview: boolean }> = (
  props
) => {
  return (
    <Layout preview={props.preview} title="Projects">
      <BreadCrumb links={[{ label: "Projects", href: "/projects" }]} />
      <div className="prose prose-blue prose-lg text-lg max-w-prose mx-auto">
        {props.projects?.map((item) => (
          <ProjectCard project={item} />
        ))}
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
