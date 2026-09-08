import React from "react";
import Link from "next/link";
import { Post } from "../interfaces";
import { formatPostDate } from "~/utils/homepage";

interface Props {
  post: Post;
  small?: boolean;
}

const BlogCardNew = ({ post, small = false }: Props) => {
  const { title, description, tags, minRead, date, author, avatar } =
    post.data.frontmatter;
  const dateLabel = formatPostDate(date);

  if (small) {
    return (
      <Link href={`/blog/${post.fileName}`} className="block h-full">
        <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-5 transition duration-300 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600">
          <h3 className="text-lg font-semibold leading-snug text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          {description && (
            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-300 line-clamp-2">
              {description}
            </p>
          )}
          <div className="mt-auto pt-4 flex flex-wrap items-center gap-x-2 text-sm text-gray-500 dark:text-gray-400">
            {dateLabel && <time dateTime={date}>{dateLabel}</time>}
            {dateLabel && <span aria-hidden="true">·</span>}
            <span>{minRead} min read</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.fileName}`}>
      <div className="flex flex-col rounded-lg shadow-lg overflow-hidden mb-3 transition duration-500 ease-in-out transform  hover:scale-105 cursor-pointer">
        <div className="flex-1 bg-white dark:bg-gray-700 p-6 flex flex-col justify-between">
          <div className="flex-1">
            <div>
              <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900 dark:text-gray-200">
                {title}
              </h3>
              <div className="text-sm leading-5 font-medium text-blue-600">
                {tags?.map((tag, i) => (
                  <div className="hover:underline" key={tag}>
                    {/* TODO: make tag links go to /blog with the tag selected */}
                    {tag}
                    {i == tags.length - 1 ? " " : ", "}
                  </div>
                ))}
              </div>
              <div className="mt-3 text-base leading-6 text-gray-500 dark:text-gray-300 line-clamp-3">
                {description}
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                width="40px"
                height="40px"
                src={avatar}
                alt="A picture of logan anderson"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm leading-5 font-medium text-gray-900 dark:text-gray-300">
                {author}
              </p>
              <div className="flex text-sm leading-5 text-gray-500 dark:text-gray-400">
                {dateLabel && (
                  <time dateTime={date}>{dateLabel}</time>
                )}
                {dateLabel && <span className="mx-1">·</span>}
                <span>{minRead} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCardNew;
