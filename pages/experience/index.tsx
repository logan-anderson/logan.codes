import {
  CodeBracketIcon,
  AcademicCapIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

import Layout from "../../components/layout/Layout";

export const HISTORY: {
  title: string;
  company: string;
  date: string;
  workExperience: boolean;
  description: string;
  website?: string;
  moreInfoLink?: string;
  icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
}[] = [
  {
    title: "Full Stack Software Engineer",
    company: "TinaCMS",
    date: "April 2020 - Present",
    description:
      "As an open source maintainer of TinaCMS, I built and maintained tools that enhance the developer experience by generating GraphQL schema and client from user configurations. Additionally, I actively supported and ensured the success of the community through Discord while working on implementing and maintaining features in a React Frontend, as well as backend features utilizing AWS services like DynamoDB, S3, and Serverless Stack (SST) for data caching, validation, and business logic.",
    icon: CodeBracketIcon,
    workExperience: true,
    website: "https://tina.io/",
    moreInfoLink: "/experience/tinacms",
  },
  {
    title: "Lab / Tutorial Instructor",
    company: "University of Prince Edward Island | Part Time",
    date: "Sept 2020-April 2021",
    description:
      "I created engaging and informative Python practice problems, delivered them to students, and provided thoughtful and thorough explanations in response to their questions",
    icon: AcademicCapIcon,
    workExperience: false,
  },
  {
    title: "Web Developer",
    company: "iWave | Part Time",
    date: "Sept 2019 - April 2020",
    description:
      "Played an integral role in building and fixing bugs on the Vue.js frontend, resulting in a seamless user experience",
    icon: CodeBracketIcon,
    workExperience: true,
    website: "https://iwave.com",
  },
  {
    title: "Data Science Specialist (Machine Learning)",
    company: "iWave | Fulltime (Co op)",
    date: "May 2019 - Aug 2019",
    description:
      "Utilized machine learning techniques and AWS to develop a document classification model, and successfully classified millions of documents by building a web scraper to extract data from specified websites",
    icon: CodeBracketIcon,
    workExperience: true,
    website: "https://iwave.com",
  },
  {
    title: "Bachelor of Science in Computer Science (Honours)",
    company: "University of Prince Edward Island",
    date: "2017 - 2021",
    description:
      "Double Major in Computer Science and Math, University of Prince Edward Island",
    icon: AcademicCapIcon,
    workExperience: false,
  },
];

const WorkHistory = () => {
  return (
    <Layout preview={false} title="Work History">
      <div className="max-w-prose mx-auto">
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {HISTORY.map((item, _index) => {
            const Icon = item.icon;
            return (
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <Icon className="w-3 h-3 text-blue-800 dark:text-blue-300" />
                </span>
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  {item.company} | {item.date}
                </time>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
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
