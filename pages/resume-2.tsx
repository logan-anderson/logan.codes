import {
  EnvelopeIcon,
  CheckCircleIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

import Layout from "../components/layout/Layout";
import Link from "next/link";

const Bullet = () => {
  return (
    <CheckCircleIcon className="select-none text-gray-600 w-5 inline mr-2 mb-auto" />
  );
};

const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: string | JSX.Element | JSX.Element[] | string[];
}) => {
  return (
    <a href={href} target="_blank" className="text-blue-600 hover:underline">
      {children}
    </a>
  );
};
const LinkHeading = ({
  href,
  children,
}: {
  href: string;
  children: string | JSX.Element | JSX.Element[] | string[];
}) => {
  return (
    <a href={href} target="_blank" className="text-blue-500 hover:underline">
      <h3 className="text-xl font-semibold leading-8">{children}</h3>
    </a>
  );
};

const Bold = ({
  children,
}: {
  children: string | JSX.Element | JSX.Element[] | string[];
}) => {
  return <strong className="font-semibold text-blue-950">{children}</strong>;
};

const Resume = () => {
  return (
    <Layout preview={false} navDisable={true}>
      <main>
        {/* Page */}
        <div
          className="
      p-6
      mx-auto
      page
      print:max-w-letter
      md:max-w-letter md:h-letter
      xsm:p-8
      sm:p-9
      md:p-16
      bg-white
    "
        >
          {/* Header */}
          <header
            className="
        flex
        row-gap-5
        flex-row flex-wrap
        items-center
        mb-5
        md:mb-2
        border-b-2 border-opacity-50 border-gray-400
      "
          >
            <h1 className="print:text-6xl lg:text-6xl md:text-5xl mr-auto text-3xl font-semibold text-gray-750 pb-4">
              Logan Anderson
            </h1>
            <h2 className="print:text-3xl text-blue-700 font-sans self-center md:text-3xl text-2xl font-hairline pb-px">
              Software engineer
            </h2>
          </header>
          <section className="mb-10 first:mt-0" id="contact">
            {/* Contact Items */}
            <ul className="print:flex-row flex flex-wrap flex-col sm:flex-row justify-between gap-2 list-inside pr-7">
              {/* Email */}
              <li className="mt-1.5 leading-normal text-gray-700 text-md">
                <a
                  href="mailto:loganderson55@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-900 hover:underline group"
                >
                  <span>
                    <EnvelopeIcon className="inline-block mr-1.5 text-blue-900 w-5" />
                    loganderson55@gmail.com
                  </span>
                </a>
              </li>
              {/* End Email */}
              <li className="mt-1.5 leading-normal text-gray-700 text-md">
                <a
                  href="https://goo.gl/maps/qsQ6uWFASdr5S8h57"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-900 hover:underline group"
                >
                  <span>
                    <MapPinIcon className="inline-block mr-1.5 text-blue-900 w-5" />
                    Kitchener, Ontario. Canada
                  </span>
                </a>
              </li>
              {/* LinkedIn */}
              <li className="mt-1.5 leading-normal text-gray-700 text-md">
                <a
                  href="https://www.linkedin.com/in/logan-anderson-tech/?originalSubdomain=ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-900 hover:underline group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="inline-block mr-1.5 fill-blue-900 w-5"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  logan-anderson-tech
                  <span
                    className="
                inline-block
                text-gray-550
                print:text-black
                font-normal
                group-hover:text-gray-700
                transition
                duration-100
                ease-in
              "
                  >
                    ↗
                  </span>
                </a>
              </li>
              {/* End LinkedIn */}
              {/* Github */}
              <li className="mt-1.5 leading-normal text-gray-700 text-md">
                <a
                  href="https://www.github.com/logan-anderson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-900 hover:underline group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="inline-block mr-1.5 fill-blue-900 w-5"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  github.com/logan-anderson
                  <span
                    className="
                inline-block
                text-gray-550
                print:text-black
                font-normal
                group-hover:text-gray-700
                transition
                duration-100
                ease-in
              "
                  >
                    ↗
                  </span>
                </a>
              </li>
              {/* End Github */}
            </ul>
          </section>
          {/* End Contact / Links */}
          {/* Grid 2 1 */}
          <div className="grid grid-cols-3 gap-10">
            {/* Grid Items Span 2 Larger */}
            <section className="print:col-span-2 col-span-3 md:col-span-2 mt-8 first:mt-0">
              {/* Profile */}
              <section className="mt-8 first:mt-0" id="profile">
                <h2 className="mb-0 font-bold tracking-widest text-sm text-blue-700 ">
                  PROFILE
                </h2>
                <section className="mb-0 grid grid-cols-2 ">
                  <p className="text-sm text-gray-700 leading-normal flex flex-row">
                    <Bullet />
                    <span>4+ years of experience in software development.</span>
                  </p>
                </section>
              </section>
              {/* End Profile */}
              {/* Experience Section */}
              <section className="col-span-3 mt-6 first:mt-0" id="experience">
                <h2 className="mb-4 font-bold tracking-widest text-sm text-gray-800">
                  EXPERIENCE
                </h2>
                <div>
                  <section className="mb-4">
                    <header>
                      <LinkHeading href="https://tina.io">
                        TinaCMS (Formally Forestry.io)
                      </LinkHeading>

                      <p className="leading-normal text-sm text-gray-700 mt-1">
                        April 2020 - Present | Full Stack Software Engineer
                      </p>
                    </header>
                    <ul>
                      <li className="mt-2.1 ml-1.5 text-md text-gray-700 leading-normal">
                        <Bullet />
                        Created a{" "}
                        <ExternalLink href="https://tina.io/docs/data-fetching/overview/">
                          GraphQL client{" "}
                        </ExternalLink>
                        that queries a user's content
                      </li>
                      <li className="mt-2.1 ml-1.5 text-md text-gray-700 leading-normal">
                        <Bullet />
                        Implemented{" "}
                        <ExternalLink href="https://github.com/tinacms/tinacms/pull/3953">
                          editorial workflow
                        </ExternalLink>{" "}
                        allowing users to save changes to a new branch and
                        create draft pull requests
                      </li>
                      <li className="mt-2.1 ml-1.5 text-md text-gray-700 leading-normal">
                        <Bullet />
                        Collaborated closely with customers to provide
                        troubleshooting support, gain a deep understanding of
                        their issues, and successfully resolve them
                      </li>
                      <li className="mt-2.1 ml-1.5 text-md text-gray-700 leading-normal">
                        <Bullet />
                        Worked on maintaining and implementing features in a
                        complex React Frontend
                      </li>
                      <li className="mt-2.1 ml-1.5 text-md text-gray-700 leading-normal">
                        <Bullet />
                        Implemented and maintained backend features, including
                        data caching, validation, and business logic on AWS
                        using DynamoDB, S3, and Serverless Stack (SST)
                      </li>
                    </ul>
                  </section>
                </div>
                {/* End Work at TinaCMS */}

                {/* Work at IWave */}
                <div>
                  <section className="mb-4">
                    <header>
                      <LinkHeading href="https://www.iwave.com/">
                        iWave
                      </LinkHeading>
                      <p className="leading-normal text-sm text-gray-700 mt-1">
                        May 2019 - April 2020 | Data Science Specialist (Machine
                        Learning)
                      </p>
                    </header>
                    <ul>
                      <li className="mt-2.1 ml-1.5 text-md text-gray-700 leading-normal">
                        <Bullet />
                        Utilized <Bold>machine learning techniques</Bold> and
                        AWS to develop a document classification model, that
                        successfully{" "}
                        <Bold>classified millions of documents</Bold>
                      </li>
                      <li className="mt-2.1 ml-1.5 text-md text-gray-700 leading-normal">
                        <Bullet />
                        Built a web scraper to extract PDF's from websites using
                        the{" "}
                        <ExternalLink href="https://scrapy.org/">
                          Python library Scrapy
                        </ExternalLink>
                      </li>
                      <li className="mt-2.1 ml-1.5 text-md text-gray-700 leading-normal">
                        <Bullet />
                        Played an integral role in building and fixing bugs on
                        the Vue.js frontend, resulting in a seamless user
                        experience
                      </li>
                    </ul>
                  </section>
                </div>
                {/* End work at iWave */}
              </section>
              {/* End Experience Section */}
              {/* Volunteer Experience Section */}
              <section className="col-span-3 mt-6 first:mt-0" id="education">
                <h2 className="mb-4 font-bold tracking-widest text-sm text-blue-700">
                  Volunteer &amp; Professional Development
                </h2>
                {/* Codecademy Chapter Co-Lead */}
                <section className="mb-4.5">
                  <header>
                    <h3
                      id="job-title"
                      className="text-lg font-semibold text-gray-700 leading-snugish"
                    >
                      Chapter Co-Lead
                      <span
                        id="company-name"
                        className="text-gray-550 font-semibold"
                      >
                        @ Codecademy
                      </span>
                    </h3>
                    <p
                      id="work-date-location"
                      className="leading-normal text-sm text-gray-700 mt-1"
                    >
                      September 2021 – Present // United States
                    </p>
                  </header>
                  <ul>
                    <li className="mt-2.1 ml-1.5 text-sm text-gray-700 leading-normal">
                      <span className="-ml-2 select-nofne text-gray-600">
                        ›
                      </span>
                      Provide live demos, workshops, tutoring, and mentoring for
                      engineers and students learning JavaScript, React,
                      Next.js, Node, and AWS, Serverless architecture.
                    </li>
                  </ul>
                </section>
                {/* Codecademy Chapter Co-Lead */}
                {/* Roar Coders */}
                <section className="mb-4.5">
                  <header>
                    <h3
                      id="job-title"
                      className="text-lg font-semibold text-gray-700 leading-snugish"
                    >
                      Full-Time Contributor &amp; Co-Host
                      <a
                        href="https://streamblog.roarcoder.dev/"
                        className="group"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span
                          id="company-name"
                          className="text-gray-550 font-semibold"
                        >
                          @ Roar Coders
                        </span>
                        <span
                          className="
                    inline-block
                    text-gray-550
                    print:text-black
                    font-normal
                    group-hover:text-gray-700
                    transition
                    duration-100
                    ease-in
                  "
                        >
                          ↗
                        </span>
                      </a>
                    </h3>
                    <p
                      id="work-date-location"
                      className="leading-normal text-sm text-gray-700 mt-1"
                    >
                      August 2021 – Present // Melbourne, Australia
                    </p>
                  </header>
                  <ul>
                    <li className="mt-2.1 ml-1.5 text-sm text-gray-700 leading-normal">
                      <span className="-ml-2 select-none text-gray-600">›</span>
                      Devs from Melbourne, Australia hosting a live software
                      development show: Twitch &amp; YouTube
                    </li>
                    <li className="mt-2.1 ml-1.5 text-sm text-gray-700 leading-normal">
                      <span className="-ml-2 select-none text-gray-600">›</span>
                      Full-time contributor and co-host building in public and
                      developing open-source.
                    </li>
                  </ul>
                </section>
                {/* End Roar Coders */}
              </section>
              {/* Volunteer Experience Section */}
              {/* Experience Section */}
              <section className="col-span-3 mt-6 first:mt-0" id="experience">
                <h2 className="mb-4 font-bold tracking-widest text-sm text-gray-900">
                  Professional Certification &amp; Achievements
                </h2>
                {/* Work 1 */}
                <section className="mb-4.5">
                  <ul>
                    <li className="mt-2.1 ml-1.5 text-sm text-gray-700 leading-normal">
                      <a
                        href="https://www.credly.com/badges/f55dc12c-5cc5-4466-b7d4-856e4d4ec857/public_url"
                        className="group"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="-ml-2 select-none text-gray-600">
                          ›
                        </span>
                        AWS Solutions Architect Associate Certification
                        <span
                          className="
                      inline-block
                      text-gray-550
                      print:text-black
                      font-normal
                      group-hover:text-gray-700
                      transition
                      duration-100
                      ease-in
                    "
                        >
                          ↗
                        </span>
                      </a>
                    </li>
                    <li className="mt-2.1 ml-1.5 text-sm text-gray-700 leading-normal">
                      <a
                        href="https://www.credly.com/badges/cf58de7c-d52f-4fc0-b31d-3135edd50b79/public_url"
                        className="group"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="-ml-2 select-none text-gray-600">
                          ›
                        </span>
                        AWS Developer Associate Certification
                        <span
                          className="
                      inline-block
                      text-gray-550
                      print:text-black
                      font-normal
                      group-hover:text-gray-700
                      transition
                      duration-100
                      ease-in
                    "
                        >
                          ↗
                        </span>
                      </a>
                    </li>
                    <li className="mt-2.1 ml-1.5 text-sm text-gray-700 leading-normal">
                      <a
                        href="https://bryantdesigns.github.io/hackathon/about.html"
                        className="group"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="-ml-2 select-none text-gray-600">
                          ›
                        </span>
                        Codecademy Hackathon Runner Up - Team Xcessibility
                        <span
                          className="
                      inline-block
                      text-gray-550
                      print:text-black
                      font-normal
                      group-hover:text-gray-700
                      transition
                      duration-100
                      ease-in
                    "
                        >
                          ↗
                        </span>
                      </a>
                    </li>
                  </ul>
                </section>
                {/* End Work 1 */}
              </section>
              {/* End Experience Section */}
            </section>
            {/* End Grid Items Span 2 Larger */}
            {/* Column 2 (Right Side) Smaller */}
            <section className="print:col-span-1 col-span-3 md:col-span-1">
              {/* Skills Section */}
              <section className="col-span-1 mt-8 first:mt-0" id="skills">
                <h2 className="mb-4 font-bold tracking-widest text-sm text-blue-700">
                  SKILLS
                </h2>
                {/* Programming Languages */}
                <section className="mb-1.5" id="programming-languages">
                  <header>
                    <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                      Programming &amp; Languages
                    </h3>
                  </header>
                  <div className="my-2.5 last:pb-1.5">
                    <ul className="flex flex-wrap text-md leading-relaxed -mr-1.6 -mb-1.6">
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        TypeScript
                      </li>
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        JavaScript (ES6+)
                      </li>
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        Node
                      </li>
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        GraphQL
                      </li>
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        SQL
                      </li>
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        HTML
                      </li>
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        CSS/Sass
                      </li>
                      {/* <li
                  class="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200"
                >
                  Liquid (Shopify)
                </li> */}
                    </ul>
                  </div>
                </section>
                {/* End Programming Languages */}
                {/* Libraries & Frameworks */}
                <section className="mb-1.5" id="libraries-frameworks">
                  <header>
                    <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                      Libraries &amp; Frameworks
                    </h3>
                  </header>
                  <div className="my-2.5 last:pb-1.5">
                    <ul className="flex flex-wrap text-md leading-relaxed -mr-1.6 -mb-1.6">
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        React
                      </li>
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        Next.js
                      </li>
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        Redux
                      </li>
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        GSAP
                      </li>
                      {/* <li
                  class="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200"
                >
                  Styled Components (CSS-in-JS)
                </li> */}
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        Express
                      </li>
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        Apollo
                      </li>
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        AWS Serverless
                      </li>
                      {/* <li
                  class="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200"
                >
                  AWS Serverless Application Model (SAM)
                </li> */}
                    </ul>
                  </div>
                </section>
                {/* End Libraries & Frameworks */}
                {/* Test Runners */}
                <section className="mb-1.5" id="test-runners-libraries">
                  <header>
                    <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                      Test Runners &amp; Libraries
                    </h3>
                  </header>
                  <div className="my-2.5 last:pb-1.5">
                    <ul className="flex flex-wrap text-md leading-relaxed -mr-1.6 -mb-1.6">
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        Jest
                      </li>
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        React-Scripts
                      </li>
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        Puppeteer
                      </li>
                    </ul>
                  </div>
                </section>
                {/* End Test Runners */}
                {/* Tools | Platforms | Services */}
                <section className="mb-1.5" id="tools-services">
                  <header>
                    <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                      Tools | Services | Database
                    </h3>
                  </header>
                  <div className="my-2.5 last:pb-1.5">
                    <ul className="flex flex-wrap text-md leading-relaxed -mr-1.6 -mb-1.6">
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        Git / Bash / Shells
                      </li>
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        Eslint
                      </li>
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        CI / CD
                      </li>
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        GitLab
                      </li>
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        Husky - Git Hooks
                      </li>
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        Docker
                      </li>
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        AWS
                      </li>
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        PostgreSQL
                      </li>
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        DynamoDB
                      </li>
                    </ul>
                  </div>
                </section>
                {/* End Tools | Platforms | Services */}
                {/* Related Skills */}
                <section className="mb-1.5" id="related-skills">
                  <header>
                    <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                      Related Skills
                    </h3>
                  </header>
                  <div className="my-2.5 last:pb-1.5">
                    <ul className="flex flex-wrap text-md leading-relaxed -mr-1.6 -mb-1.6">
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        Agile (Scrum)
                      </li>
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        SEO / Meta
                      </li>
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        Accessbility (CWAG)
                      </li>
                      <li className="px-2.5 mr-1.6 mb-1.6 text-xs text-gray-750 print:bg-white print:border-inset bg-gray-200">
                        Jira / Atlassian
                      </li>
                    </ul>
                  </div>
                </section>
                {/* End Related Skills */}
              </section>
              {/* End Skills Section */}
              {/* Projects Section */}
              <section className="mt-8 first:mt-0" id="projects">
                <h2 className="mb-4 font-bold tracking-widest text-sm text-blue-700">
                  TECHNICAL PROJECTS
                </h2>
                {/* Project 1 */}
                <section className="mb-4.5">
                  <header>
                    <h3 className="text-sm font-semibold tex t-gray-700 leading-snugish">
                      <a
                        href="https://www.t-mobile.com/support/new-to-tmobile"
                        className="group"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        T-Mobile New Customer Onboarding
                        <span
                          className="
                      inline-block
                      text-gray-550
                      print:text-black
                      font-normal
                      group-hover:text-gray-700
                      transition
                      duration-100
                      ease-in
                    "
                        >
                          ↗
                        </span>
                      </a>
                    </h3>
                    <p className="leading-normal text-sm text-gray-650">
                      Stack: Javascript, Vue.js, Laravel
                    </p>
                    <p className="leading-normal text-sm text-gray-650">
                      <i>Finished</i>
                    </p>
                  </header>
                  <div className="mt-2.1 text-xs text-gray-700 leading-normal">
                    <p>
                      <span className="font-semibold">Description:</span>
                      T-Mobile onboarding experience for new customers and
                      Sprint customers after merger.
                    </p>
                    <p>
                      <span className="font-semibold">Market Need:</span>
                      Large churn from Sprint customers migrating to T-Mobile.
                    </p>
                    <p>
                      <span className="font-semibold">Solves:</span>
                      Integrates the T-Mobile Un-Carrier campaign, showcases
                      benefits, and educates customers
                    </p>
                    <span className="font-semibold">Features: </span>
                    <br />
                    <ul className="list-inside">
                      <li className="ml-1.5">
                        <span className="-ml-1.5 select-none text-gray-600">
                          ›
                        </span>
                        Users can set up online account to manage T-Mobile
                        account &amp; see of the benefits they recieve with
                        T-Mobile service.
                      </li>
                      <li className="ml-1.5">
                        <span className="-ml-1.5 select-none text-gray-600">
                          ›
                        </span>
                        Helps transition customers migrating from Sprint.
                      </li>
                    </ul>
                  </div>
                </section>
                {/* End Project 1 */}
              </section>
              {/* End Projects Section */}
              {/* Education Section */}
              <section className="col-span-3 mt-8 first:mt-0" id="education">
                <h2 className="mb-4 font-bold tracking-widest text-sm text-blue-700">
                  EDUCATION
                </h2>
                {/* Education 1 */}
                <section className="mb-4.5">
                  <header>
                    <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                      University Of Massachusetts
                    </h3>
                    <p className="leading-normal text-sm text-gray-650">
                      Amherst, MA
                    </p>
                  </header>
                  <p className="mt-2.1 text-sm text-gray-800 leading-normal">
                    Pursued Bachelor’s of Science in Mathematics | Commonwealth
                    Honors
                  </p>
                  <p className="mt-0.5 text-xs text-gray-600 leading-normal">
                    <i>*Incomplete senior year: medical leave of absence</i>.
                    <br />
                    Topics in advanced multivariate &amp; vector calculus,
                    linear algebra, statistics, set theory, physics, MATLAB
                  </p>
                </section>
                {/* End Education 1 */}
                {/* Education 2 */}
                {/* <section class="mb-4.5">
          <header>
            <h3 class="text-lg font-semibold text-gray-700 leading-snugish">Greenfield Community College</h3>
            <p class="leading-normal text-sm text-gray-650">Greenfield, MA</p>
          </header>
          <p class="mt-2.1 text-sm text-gray-800 leading-normal">Associate's of Liberal Arts | Cum Laude</p>
          <p class="mt-0.5 text-xs text-gray-600 leading-normal">
            Academic tutor of mathematics and sciences Honorary Phi Theta Kappa Honor Society member
            Honors-to-Honors Scholarship
          </p>
        </section> */}
                {/* End Education 2 */}
              </section>
              {/* End Education Section */}
            </section>
            {/* End Column 2 Smaller */}
          </div>
          {/* end Grid 2 1 */}
          {/* Footer Build Info */}
          <footer className="print:pb-0 pb-5">
            <section
              id="resume-info"
              className="flex flex-row mt-16 print:mt-0"
            >
              <h2 className="text-xs font-hairline text-gray-550">
                For fun this resume was built with HTML and Tailwind CSS
              </h2>
              <a
                href="https://github.com/toreylittlefield/my-custom-tailwind-resume"
                className="group hover:text-gray-700 border-l border-gray-500 ml-3 pl-3 text-gray-550 text-xs font-hairline"
              >
                See the GitHub Repo
                <span
                  className="
              inline-block
              text-gray-550
              print:text-black
              font-normal
              group-hover:text-gray-700
              transition
              duration-100
              ease-in
            "
                >
                  ↗
                </span>
              </a>
            </section>
          </footer>
          {/* End Footer Build Info */}
        </div>
        {/* end Page */}
      </main>
    </Layout>
  );
};

export default Resume;
