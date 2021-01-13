import { GetStaticPaths, GetStaticProps } from "next";
import { BreadCrumb } from "../../components/BreadCrumb";
import Layout from "../../components/layout/Layout";
import { MarkdownBody } from "../../components/Markdown";
import { Projects } from "./index";
const data = require("../../content/projects.json");
const projects: Projects[] = data.projects;

const ProjectPage: React.FC<{ markdown: string; project: Projects }> = ({
  markdown,
  project,
}) => {
  return (
    <Layout preview={false} title="Projects" description={project.excerpt}>
      <BreadCrumb
        links={[
          { label: "Projects", href: "/projects" },
          { label: project.label, href: `/projects/${project.slug}` },
        ]}
      />
      <div className="relative py-16">
        <MarkdownBody source={markdown} escapeHtml={false} skipHtml={false} />
      </div>
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

export const getStaticPaths: GetStaticPaths = async () => {
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
