import { CodeBracketIcon, AcademicCapIcon } from "@heroicons/react/24/solid";

import Layout from "../components/layout/Layout";

const HISTORY: {
  title: string;
  company: string;
  date: string;
  description: string;
  icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
}[] = [
  {
    title: "Software Engineer",
    company: "Forestry.io / Tina CMS | Fulltime",
    date: "April 2020 - Present",
    description:
      "As an open source maintainer of TinaCMS, I built and maintained tools that enhance the developer experience by generating GraphQL schema and client from user configurations. Additionally, I actively supported and ensured the success of the community through Discord while working on implementing and maintaining features in a React Frontend, as well as backend features utilizing AWS services like DynamoDB, S3, and Serverless Stack (SST) for data caching, validation, and business logic.",
    icon: CodeBracketIcon,
  },
  {
    title: "Lab / Tutorial Instructor",
    company: "University of Prince Edward Island | Part Time",
    date: "Sept 2020-April 2021",
    description:
      "I created engaging and informative Python practice problems, delivered them to students, and provided thoughtful and thorough explanations in response to their questions",
    icon: AcademicCapIcon,
  },
  {
    title: "Web Developer / Machine Learning Engineer",
    company: "Part Time",
    date: "Sept 2019 - April 2020",
    description:
      "Played an integral role in building and fixing bugs on the Vue.js frontend, resulting in a seamless user experience",
    icon: CodeBracketIcon,
  },
  {
    title: "Data Science Specialist (Machine Learning)",
    company: "iWave | Fulltime (Co op)",
    date: "May 2019 - Aug 2019",
    description:
      "Utilized machine learning techniques and AWS to develop a document classification model, and successfully classified millions of documents by building a web scraper to extract data from specified websites",
    icon: CodeBracketIcon,
  },
  {
    title: "Bachelor of Science in Computer Science (Honours)",
    company: "University of Prince Edward Island",
    date: "2017 - 2021",
    description:
      "Double Major in Computer Science and Math, University of Prince Edward Island",
    icon: AcademicCapIcon,
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
              </li>
            );
          })}
        </ol>
      </div>
    </Layout>
  );
};

export default WorkHistory;
