import { PreviewData } from "next-tinacms-github";

import getPosts from "../../utils/getPosts";
import Layout from "../../components/layout/Layout";
import BlogCard from "../../components/BlogCard";
import useCreateBlogPage from "../../hooks/useCreateBlogPage";
import { Post } from "../../interfaces";

interface props {
  posts: Array<Post>;
  preview: boolean;
}

const BlogList = ({ posts, preview }: props) => {
  useCreateBlogPage(posts);
  return (
    <Layout title="Blog" preview={preview}>
      {posts.map((post: Post) => {
        return <BlogCard post={post} />;
      })}
    </Layout>
  );
};

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
interface Props {
  previewData: PreviewData<any>;
  preview: boolean;
}
export const getStaticProps = async function ({ preview, previewData }: Props) {
  try {
    const posts = await getPosts(preview, previewData, "content/blog");

    return {
      props: {
        posts,
        preview: preview ?? false,
      },
    };
  } catch (e) {
    return {
      props: {
        previewError: { ...e }, //workaround since we cant return error as JSON
      },
    };
  }
};

export default BlogList;
