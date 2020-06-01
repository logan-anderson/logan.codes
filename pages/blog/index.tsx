import matter from "gray-matter";
import { GetStaticProps } from "next";
import Layout from "../../components/layout/Layout";
import BlogCard from "../../components/BlogCard";
import { Post } from '../../interfaces'


interface props {
  posts: Array<Post>
}

const BlogList = ({ posts }: props) => {
  return (
    <Layout title="Blog">
      {posts.map((post: any) => {
        return (
        <BlogCard post={post}/>
        )
      })}
    </Layout>
  );
};

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps: GetStaticProps = async function ({
  // preview,
  // previewData,
  // params,
}) {
  const fg = require("fast-glob");
  const contentDir = "content/blog";
  const files = await fg(`${contentDir}**/*.md`);
  const fs = require('fs')
  const posts : Array<Post> = files.map((file: string) => {
      const content = fs.readFileSync(`${file}`, 'utf8')
      const data = matter(content)
      return {
          title: data.data.title,
          content: data.content,
          description: data.data.description || '',
          fileName: file.substring(contentDir.length + 1, file.length - 3),
          date: data.data.date || '',
          author: data.data.author || '',
      };
  });
  // get the list of blog posts
  return {
    props: {
      posts,
    },
  };
};

export default BlogList;
