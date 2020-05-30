import matter from "gray-matter";
import { GetStaticProps } from "next";
import Layout from "../../components/layout/Layout";
import BlogCard from "../../components/BlogCard";

const BlogList = ({ posts }: any) => {
  return (
    <Layout title="Blog">
      {posts.map((post: any) => {
        return (
        <BlogCard title={post.title}/>
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
  const posts = files.map((file: string) => {
      const content = fs.readFileSync(`${file}`, 'utf8')
      const data = matter(content)
      return {
          title: data.data.title,
          img: data.data.img,
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
