import { PreviewData } from "next-tinacms-github";
import { useState } from 'react' 

import getPosts from "../../utils/getPosts";
import Layout from "../../components/layout/Layout";
import useCreateBlogPage from "../../hooks/useCreateBlogPage";
import { Post, Tag } from "../../interfaces";
import PostList from '../../components/PostList'

import { TagContext } from "../../components/Context/Tagcontext";
import Tags from "../../components/Tags";

interface BlogListProps {
  posts: Array<Post>;
  tags: Tag[];
  preview: boolean;
}

const BlogList = ({ posts, preview, tags : initalTags }: BlogListProps) => {
  useCreateBlogPage(posts);
  const [tags, setTags] = useState<Tag[]>(initalTags)

  return (
    <Layout title="Blog" preview={preview}>
      <TagContext.Provider value={{
            tags,
            setTags
        }}>
        <main>
          <Tags/>
          <PostList posts={posts} />
        </main>
      </TagContext.Provider>
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
    const { posts, tags } = await getPosts(
      preview,
      previewData,
      "content/blog"
    );

    return {
      props: {
        posts,
        tags,
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
