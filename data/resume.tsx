import {
  AcademicCapIcon,
  EnvelopeIcon,
  MapPinIcon,
  CodeBracketIcon,
  CalculatorIcon,
} from "@heroicons/react/24/solid";

import { Bold, ExternalLink } from "./components";

interface Contact {
  label: string;
  url: string;
  icon?: JSX.Element;
  isExternal?: boolean;
}
interface Bullet {
  label?: string;
  content: string | JSX.Element;
}

interface Profile {
  summary: string;
  bullets: Bullet[];
}

interface Experience {
  url: string;
  title: string;
  dates: string;
  bullets: Bullet[];
  moreInfoLink?: string;
  hideFromResume?: boolean;
  Icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
}
export interface WorkExperience extends Experience {
  company: string;
  img?: string;
}
export interface Education extends Experience {
  degree: string;
}

const CONTACT_INFO: Contact[] = [
  {
    label: "loganderson55@gmail.com",
    url: "mailto:loganderson55@gmail.com",
    icon: <EnvelopeIcon className="inline-block mr-1.5 text-blue-900 w-5" />,
    isExternal: false,
  },
  {
    label: "logan.codes",
    url: "https://logan.codes",
    icon: (
      <svg
        aria-hidden="true"
        focusable="false"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="inline-block mr-1.5 text-blue-900 w-5"
        data-v-957e193a=""
      >
        <title data-v-957e193a="">Personal website</title>{" "}
        <path
          fill="currentColor"
          d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"
          data-v-957e193a=""
        ></path>
      </svg>
    ),
    isExternal: true,
  },
  {
    label: "Kitchener, ON",
    url: "https://goo.gl/maps/qsQ6uWFASdr5S8h57",
    icon: <MapPinIcon className="inline-block mr-1.5 text-blue-900 w-5" />,
    isExternal: false,
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/logan-anderson-tech/?originalSubdomain=ca",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="inline-block mr-1.5 fill-blue-900 w-5"
      >
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    isExternal: true,
  },
  {
    label: "logan-anderson",
    url: "https://www.github.com/logan-anderson",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="inline-block mr-1.5 fill-blue-900 w-5"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    isExternal: true,
  },
];

const PROFILE: Profile = {
  summary: `Software engineer with 4+ years of experience, specializing
    in machine learning, TypeScript, React, and Python. Core
    Contributor of TinaCMS, driving its growth and enterprise
    adoption.`,
  bullets: [
    {
      label: "Machine Learning:",
      content:
        "Executed year-long Honours Project using TensorFlow, reducing CNN parameters by 20% for image classification.",
    },
    {
      label: "Technical Versatility:",
      content:
        "Proficient in TypeScript, Java, and Python. Developed backend features on AWS for high-traffic applications.",
    },
    {
      label: "Leadership:",
      content:
        "Led teams, designed editorial workflow for enterprise customers, and developed document classification model.",
    },
  ],
};

const EXPERIENCE: WorkExperience[] = [
  {
    company: "Stripe",
    url: "https://stripe.com",
    title: "Software Engineer",
    dates: `Jan 2024 - Present · ${new Date().getFullYear() - 2024} yrs ${
      new Date().getMonth() - 1
    } mos`,
    moreInfoLink: "/experience/stripe",
    img: "/img/stripe.png",
    Icon: CodeBracketIcon,
    bullets: [
      {
        content:
          "Rebuilt Connect Platform Onboarding to enhance UX and improve unified accounts integration, resulting in 30% higher conversion rates and reduced onboarding time",
      },
      {
        content:
          "Implemented comprehensive observability for Stripe's high-traffic accounts APIs (3000+ requests/hour), enabling rapid identification and resolution of critical Connect integration issues",
      },
      {
        content:
          "Refactored the Connect dashboard UI to integrate with V2 Accounts architecture, successfully leading cross-functional collaboration across multiple teams to deliver this critical initiative ahead of schedule, improving system cohesion and user experience",
      },
      {
        content:
          "Redesigned and rebuilt high-traffic account creation dashboard (3000+ daily users) to integrate with Unified Accounts system, improving user experience and system consistency",
      },
    ],
  },
  {
    company: "TinaCMS",
    url: "https://tina.io",
    title: "Software Engineer",
    dates: "Apr 2020 - Dec 2023 · 3 yrs 9 mos",
    moreInfoLink: "/experience/tinacms",
    Icon: CodeBracketIcon,
    img: "/img/tina.jpeg",
    bullets: [
      {
        content: ` Lead Developer and maintainer of TinaCMS, an open source headless CMS that commits content directly to Git.`,
      },
      {
        content: (
          <>
            Developed Tina's core Typescript{" "}
            <ExternalLink href="https://tina.io/docs/data-fetching/overview/">
              client{" "}
            </ExternalLink>
            that is generated based on a user's schema which increased usage of
            TinaCMS by over 300% in the following months
          </>
        ),
      },
      {
        content: (
          <>
            Designed and implemented an{" "}
            <ExternalLink href="https://github.com/tinacms/tinacms/pull/3953">
              editorial workflow
            </ExternalLink>{" "}
            which was crucial to the procurement of many enterprise customers
            such as{" "}
            <ExternalLink href="https://www.smashingmagazine.com/">
              Smashing Magazine
            </ExternalLink>
          </>
        ),
      },
      {
        content:
          "Implemented backend features such as data caching, validation, and business logic on AWS using DynamoDB, S3, and Serverless Stack (SST) on a high traffic application with an uptime of over 99.99%",
      },
      {
        content:
          "Created a migration tool that transformed a Forestry schema into a Tina config, successfully migrating thousands of users and increased MRR",
      },
    ],
  },
  {
    company: "iWave",
    url: "https://www.iwave.com/",
    title: "Machine Learning Engineer",
    dates: "May 2019 - April 2020 · 1 yr",
    Icon: CalculatorIcon,
    img: "/img/iwave.png",
    bullets: [
      {
        content: (
          <>
            Engineered and deployed a learning pipeline that{" "}
            <Bold>scraped and classified millions of PDF documents</Bold> with
            95%+ accuracy, significantly improving donor identification
            efficiency and data quality for fundraising intelligence
          </>
        ),
      },
    ],
  },
  {
    title: "Lab / Tutorial Instructor",
    company: "University of Prince Edward Island",
    dates: "Sept 2020 - April 2021 · 8 months.",
    bullets: [
      {
        content:
          "I created engaging and informative Python practice problems, delivered them to students, and provided thoughtful and thorough explanations in response to their questions",
      },
    ],
    hideFromResume: true,
    url: "https://www.upei.ca",
    Icon: AcademicCapIcon,
  },
];

const EDUCATION: Education[] = [
  {
    title: "University of Prince Edward Island",
    degree:
      "Bachelor of Science, Double Major, Computer Science and Mathematics (Honours)",
    url: "https://www.upei.ca",
    dates: "2015 - 2019",
    Icon: AcademicCapIcon,
    bullets: [
      {
        content: (
          <>
            Recipient of UPEI Faculty Association Silver Medal (
            <Bold>Second highest mark</Bold> in all of UPEI for third year)
          </>
        ),
      },
      {
        content: (
          <>
            Graduated with a <Bold>4.23/4.3 GPA</Bold>
          </>
        ),
      },
      {
        content: "First Class Standing",
      },
      {
        content: "Dean's List (2018-2021)",
      },
    ],
  },
];

export const RESUME_INFO = {
  name: "Logan Anderson",
  title: "Software Engineer",
  contact: CONTACT_INFO,
  profile: PROFILE,
  experience: EXPERIENCE,
  education: EDUCATION,
};
