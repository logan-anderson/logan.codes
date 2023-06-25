import React from "react";
import Link from "next/link";
import { Post } from "../interfaces";

interface Props {
  post: Post;
  small?: Boolean;
}

const BlogCardNew = ({ post }: Props) => {
  return (
    <Link href="/blog/[slug]" as={`/blog/${post.fileName}`}>
      <div className="flex flex-col rounded-lg shadow-lg overflow-hidden mb-3 transition duration-500 ease-in-out transform  hover:scale-105 cursor-pointer">
        {/* <div className="flex-shrink-0">
        <img
        className="h-48 w-full object-cover"
        src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80"
        alt=""
        />
      </div> */}
        <div className="flex-1 bg-white dark:bg-gray-700 p-6 flex flex-col justify-between">
          <div className="flex-1">
            <a href="#" className="block">
              <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900 dark:text-gray-200">
                {post.data.frontmatter.title}
              </h3>
              <p className="text-sm leading-5 font-medium text-blue-600">
                {post?.data?.frontmatter?.tags?.map((tag, i) => (
                  <a href="#" className="hover:underline">
                    {/* TODO: make tag links go to /blog with the tag selected */}
                    {tag}
                    {i == post.data.frontmatter.tags.length - 1 ? " " : ", "}
                  </a>
                ))}
              </p>
              <p className="mt-3 text-base leading-6 text-gray-500 dark:text-gray-300 ">
                {post.data.frontmatter.description}
              </p>
            </a>
          </div>
          <div className="mt-6 flex items-center">
            <div className="flex-shrink-0">
              <a href="/">
                <img
                  className="h-10 w-10 rounded-full"
                  width="40px"
                  height="40px"
                  src={post.data.frontmatter.avatar}
                  alt="A picture of logan anderson"
                />
              </a>
            </div>
            <div className="ml-3">
              <p className="text-sm leading-5 font-medium text-gray-900 dark:text-gray-300">
                <a href="#" className="hover:underline">
                  {/* TODO: about about me page and have this link to it */}
                  {post.data.frontmatter.author}
                </a>
              </p>
              <div className="flex text-sm leading-5 text-gray-500 dark:text-gray-400">
                {/* <time dateTime={post.data.frontmatter.date}>
                  {new Date(post.data.frontmatter.date).toDateString()}
                </time> */}
                {/* <span className="mx-1">·</span> */}
                <span>{post.data.frontmatter.minRead} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCardNew;
