import { GetStaticProps } from "next";
import React from "react";
import { Slide } from "react-awesome-reveal";
import { BreadCrumb } from "../../components/BreadCrumb";
import Layout from "../../components/layout/Layout";
import { ProjectCard } from "../../components/ProjectCard";

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
      <div className="max-w-prose mx-auto">
        <BreadCrumb links={[{ label: "Projects", href: "/projects" }]} />
        <Slide cascade direction="up" duration={700} damping={0.1} triggerOnce>
          {props.projects?.map((item) => (
            <ProjectCard key={item.slug} project={item} />
          ))}
        </Slide>
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
