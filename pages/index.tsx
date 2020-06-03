import { getGithubPreviewProps, parseJson, PreviewData } from "next-tinacms-github";
import {
  useGithubJsonForm,
} from "react-tinacms-github";

import { Post } from '../interfaces'
import getPosts from '../utils/getPosts'
import Layout from "../components/layout/Layout";
import BlogCard from '../components/BlogCard';
import { GitFile } from "react-tinacms-github/dist/form/useGitFileSha";

interface props {
  posts: Array<Post>;
  preview: boolean;
  file: GitFile
}
const IndexPage = ({ file, preview, posts }: props) => {
  console.log('index page')

  const formOptions = {
    label: 'Home Page',
    fields: [
      {
        label: 'Subtitle',
        name: 'posts_title',
        component: 'text',
      }
    ]
  }
  const [data, ] = useGithubJsonForm(file, formOptions);

  return (
  <Layout title="Home" preview={preview}>

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
      <h2 className="text-3xl text-center mb-8 font-heading">{data.posts_title}</h2>
      <div className="flex flex-wrap -mx-4">
      {posts.map((post: Post) => {
        return <BlogCard post={post} />;
      })}
      </div>
    </section>
  </Layout>
);
}

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps = async function ({
  preview,
  previewData,
}:{preview: boolean, previewData: PreviewData<any>}) {
  const posts = await getPosts(preview, previewData, 'content/blog');
  if (preview) {
    const previewProps = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'content/home.json',
      parse: parseJson,
    })
    previewProps.props.file 
    return {
      props: {
        posts,
        ...previewProps.props 
      }
    }
  }
  return {
    props: {
      posts,
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
