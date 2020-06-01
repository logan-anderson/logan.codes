import { getGithubPreviewProps, parseJson } from "next-tinacms-github";
import { GetStaticProps } from "next";
import matter from 'gray-matter'
import {
  useGithubJsonForm,
  useGithubToolbarPlugins,
} from "react-tinacms-github";

import Layout from "../components/layout/Layout";
import BlogCard from '../components/BlogCard';

const IndexPage = ({ file }: any) => {
  console.log('index page')

  const formOptions = {
    label: 'Home Page',
    fields: [
      {
        label: 'Title',
        name: 'tagline',
        component: 'text',
      }
    ]
  }
  const [data, form] = useGithubJsonForm(file, formOptions);

  useGithubToolbarPlugins()


  return (
  <Layout title="Home">

    <section className="py-12 px-4 text-center">
      <div className="w-full max-w-2xl mx-auto">
        <h2 className="text-5xl mt-2 mb-6 leading-tight font-heading">
          A simple blog about coding <img className="icon-lg" src="/icons/programmer.svg"/>, coffee<img className="icon-lg" src="/icons/tea-hot.svg"/>, and more
        </h2>
        <a className="text-blue-700 hover:underline" href="#">
          Learn more &raquo;
        </a>
      </div>
    </section>

    <section className="py-12 px-4">
      <h2 className="text-3xl text-center mb-8 font-heading">Latest posts</h2>
      <div className="flex flex-wrap -mx-4">
      <BlogCard post={{ fileName: 'test', description:'test', author:"Logan Anderson",content: '', date:"June 1st 2020", title: "test"  }} small={true}/>
      <BlogCard post={{ fileName: 'test', description:'test', author:"Logan Anderson",content: '', date:"June 1st 2020", title: "test"  }} small={true}/>
      <BlogCard post={{ fileName: 'test', description:'test', author:"Logan Anderson",content: '', date:"June 1st 2020", title: "test"  }} small={true}/>
      </div>
    </section>
  </Layout>
);
}

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps: GetStaticProps = async function ({
  preview,
  previewData,
}) {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/home.json',
      parse: parseJson,
    })
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/home.json',
        data: (await import('../content/home.json')).default,
      },
    },
  }
}


export default IndexPage;
