import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/layout/Layout";
import { Projects } from "./index";
const data = require("../../content/projects.json");
const projects: Projects[] = data.projects;

const ProjectPage: React.FC<{ markdown: string; project: Projects }> = ({
  markdown,
  project,
}) => {
  return (
    <Layout preview={false} title="Projects" description={project.excerpt}>
      {markdown}
    </Layout>
  );
};
export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug: string = ctx.params?.slug as string;
  const project = projects.find((item) => item.slug === slug);
  if (!project) {
    throw new Error(`url ${project} not in config`);
  }
  const markdown = await (await fetch(project.url)).text();
  return {
    props: {
      project,
      markdown,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const paths = projects.map((item) => {
    return {
      params: {
        slug: item.slug,
      },
    };
  });

  return {
    fallback: false,
    paths,
  };
};

export default ProjectPage;
