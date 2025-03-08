import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { RESUME_INFO } from "~/data/resume";
import Link from "next/link";

import Layout from "../../components/layout/Layout";

const ALL_HISTORY = [...RESUME_INFO.experience, ...RESUME_INFO.education];

const WorkHistory = () => {
  return (
    <Layout preview={false} title="Work History">
      <div className="max-w-prose mx-auto">
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {ALL_HISTORY.map((item, index) => {
            const description =
              item.bullets.length === 1 ? (
                item.bullets[0].content
              ) : (
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet.label}>{bullet.content}</li>
                  ))}
                </ul>
              );
            return (
              <li className="ml-6" key={index}>
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <item.Icon className="w-3 h-3 text-blue-800 dark:text-blue-300" />
                </span>
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {item.title}{" "}
                  {"company" in item && (
                    <a
                      href={item.url}
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      @ {item.company}
                    </a>
                  )}
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  {"company" in item ? item.company : item.degree}
                  {"dates" in item && ` | ${item.dates}`}
                </time>
                <div className="text-base font-normal text-gray-500 dark:text-gray-400 prose dark:prose-dark">
                  {description}
                </div>
                {item.moreInfoLink && (
                  <Link href={item.moreInfoLink}>
                    <button
                      type="button"
                      className="my-4 inline-flex items-center gap-x-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      See More
                      <ArrowRightIcon
                        className="-mr-0.5 h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </Layout>
  );
};

export default WorkHistory;
