import {
  CodeBracketIcon,
  AcademicCapIcon,
  ArrowRightIcon,
  CalculatorIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

import Layout from "../../components/layout/Layout";

export const HISTORY: {
  title: string;
  company: string;
  date: string;
  workExperience: boolean;
  description: React.FC;
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
    company: "Stripe",
    date: "Jan 2024 - Present",
    description: () => (
      <ul>
        <li>
          Rebuild "Connect Platform Onboarding" to enhance user experience (UX)
          and improve integration with unified accounts
          <ul>
            <li>Increased the conversion rate by 30%</li>
            <li>Decreased time to complete onboarding</li>
          </ul>
        </li>
      </ul>
    ),
    icon: CodeBracketIcon,
    workExperience: true,
    website: "https://stripe.com",
    moreInfoLink: "/experience/stripe",
  },
  {
    title: "Full Stack Software Engineer",
    company: "TinaCMS",
    date: "Apr 2020 - Dec 2023 · 3 yrs 9 mos",
    description: () => (
      <ul>
        <li>
          Led the development of TinaCMS, contributing over 50% of the codebase.
        </li>
        <li>
          Built and maintained tools that enhance developer experience by
          generating GraphQL schema and client from user configurations.
        </li>
        <li>
          Actively supported and ensured the success of the community through
          Discord.
        </li>
        <li>Implemented and maintained key features in a React Frontend.</li>
        <li>
          Developed robust backend features utilizing AWS services such as
          DynamoDB, S3, and Serverless Stack (SST) for data caching, validation,
          and business logic.
        </li>
      </ul>
    ),
    icon: CodeBracketIcon,
    workExperience: true,
    website: "https://tina.io/",
    moreInfoLink: "/experience/tinacms",
  },
  {
    title: "Machine Learning Specialist (Co-op)",
    company: "iWave",
    date: "Apr 2019 - Apr 2020 · 1 yr 1 mo",
    description: () => (
      <ul>
        <li>
          Built a machine learning model and pipeline that predicts weather a
          document would contain a donation or not.
          <ul>
            <li>
              Classified
              <strong> millions of documents </strong>
              with an accuracy of over 95%.
            </li>
          </ul>
        </li>
        <li>
          Built a web scraper to extract data from specified websites that fed
          data into the modal
        </li>
      </ul>
    ),
    icon: CalculatorIcon,
    workExperience: true,
    website: "https://iwave.com",
  },
  {
    title: "Lab / Tutorial Instructor",
    company: "University of Prince Edward Island | Part Time",
    date: "Sept 2020 - April 2021 · 8 months.",
    description: () =>
      "I created engaging and informative Python practice problems, delivered them to students, and provided thoughtful and thorough explanations in response to their questions",
    icon: AcademicCapIcon,
    workExperience: false,
  },
  {
    title: "Bachelor of Science in Computer Science (Honours)",
    company: "University of Prince Edward Island",
    date: "2017 - 2021",
    description: () =>
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
          {HISTORY.map((item, index) => {
            const Icon = item.icon;
            const Description = item.description;
            return (
              // Key being index is ok here because the list is static and will not be reordered
              <li className="ml-6" key={index}>
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <Icon className="w-3 h-3 text-blue-800 dark:text-blue-300" />
                </span>
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {item.title}{" "}
                  {item.website ? (
                    <a
                      href={item.website}
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      @ {item.company}
                    </a>
                  ) : (
                    <>@ {item.company}</>
                  )}
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  {item.company} | {item.date}
                </time>
                <div className="text-base font-normal text-gray-500 dark:text-gray-400 prose dark:prose-dark">
                  <Description />
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
