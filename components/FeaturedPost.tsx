import Link from "next/link";
import { Post } from "../interfaces";
import { formatPostDate } from "~/utils/homepage";

interface Props {
  post: Post;
}

export const FeaturedPost: React.FC<Props> = ({ post }) => {
  const { title, description, tags, minRead, date } = post.data.frontmatter;
  const dateLabel = formatPostDate(date);
  const href = `/blog/${post.fileName}`;

  return (
    <article className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-900 sm:p-10">
      <div className="flex flex-col gap-4">
        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-sm font-medium text-blue-600 dark:text-blue-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          <Link href={href} className="hover:text-blue-600 dark:hover:text-blue-400">
            {title}
          </Link>
        </h3>
        {description && (
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-3">
            {description}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
          {dateLabel && (
            <time dateTime={date}>{dateLabel}</time>
          )}
          {dateLabel && <span aria-hidden="true">·</span>}
          <span>{minRead} min read</span>
        </div>
        <div className="mt-2">
          <Link
            href={href}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            Read article
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};
