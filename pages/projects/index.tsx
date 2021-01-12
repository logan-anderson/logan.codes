import { GetStaticProps } from "next";
import Link from "next/link";
import Layout from "../../components/layout/Layout";

export interface Projects {
  url: string;
  label: string;
  excerpt: string;
  slug: string;
}
const ProjectPage: React.FC<{ projects: Projects[]; preview: boolean }> = (
  props
) => {
  return (
    <Layout preview={props.preview} title="Projects">
      <ul>
        {props.projects?.map((item) => (
          <li key={item.label}>
            <Link href={`/projects/${item.slug}`}>{item.label}</Link>
          </li>
        ))}
      </ul>
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
