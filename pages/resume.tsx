import {
  EnvelopeIcon,
  CheckCircleIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { SEO } from "../components/layout/Layout";

const SectionHeader = ({
  children,
}: {
  children: string | JSX.Element | JSX.Element[] | string[];
}) => {
  return (
    <h2 className="font-bold tracking-widest text-sm text-gray-800 print:tracking-normal">
      {children}
    </h2>
  );
};

const BulletListItem = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <li className="mt-2.1 ml-4 text-base text-gray-700 leading-normal list-disc">
      {/* <Bullet /> */}
      {children}
    </li>
  );
};

const SkillLink = (props: { label: string; url: string }) => {
  return (
    <a
      href={props.url}
      target="_blank"
      className="cursor-pointer active:bg-[#cacfd1] hover:underline"
    >
      {props.label}
    </a>
  );
};

const SkillList = ({
  skills,
}: {
  skills: { label: string; url?: string }[];
}) => {
  return (
    <ul className="flex flex-wrap text-base leading-relaxed -mr-1.6 -mb-1.6">
      {skills.map((skill) => {
        return (
          <li className="[word-wrap: break-word] my-1 mr-1 flex h-6 items-center justify-between rounded-[16px] bg-gray-200 px-2 py-0 text-sm font-normal normal-case leading-loose text-gray-800 shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none  print:text-xs print:h-4 print:my-[2px] print:mr-[2px] ">
            {skill.url ? (
              <SkillLink label={skill.label} url={skill.url} />
            ) : (
              skill.label
            )}
          </li>
        );
      })}
    </ul>
  );
};
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
    <a href={href} target="_blank" className="hover:underline text-blue-500">
      <Heading>{children}</Heading>
    </a>
  );
};
const Heading = ({
  children,
}: {
  children: string | JSX.Element | JSX.Element[] | string[];
}) => {
  return (
    <h3 className="text-lg font-semibold leading-5 my-2 print:my-05 text-blue-500 print:text-lg/5">
      {children}
    </h3>
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
    <>
      <SEO title="Resume" description="Logan anderson's resume" />
      <main className="bg-body text-base text-gray-700 font-body max-w-5xl mx-auto px-3 sm:px-4">
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
            <h1 className="print:text-4xl lg:text-6xl md:text-5xl mr-auto text-3xl font-semibold text-gray-750 pb-4">
              Logan Anderson
            </h1>
            <h2 className="print:text-2xl text-blue-700 font-sans self-center md:text-3xl text-2xl font-hairline pb-px">
              Software Engineer
            </h2>
          </header>
          <section className="mb-3 print:mb-1 first:mt-0">
            {/* Contact Items */}
            <ul className="print:flex-row flex flex-wrap flex-col sm:flex-row justify-between gap-1 list-inside pr-7">
              {/* Email */}
              <li className="mt-1 leading-normal text-gray-700 text-sm">
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
              {/* Website */}
              <li className="mt-1 leading-normal text-gray-700 text-sm">
                <a
                  href="https://logan.codes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-900 hover:underline group"
                >
                  <span>
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
                    logan.codes
                  </span>
                </a>
              </li>
              {/* End Website */}
              <li className="mt-1 leading-normal text-gray-700 text-sm">
                <a
                  href="https://goo.gl/maps/qsQ6uWFASdr5S8h57"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-900 hover:underline group"
                >
                  <span>
                    <MapPinIcon className="inline-block mr-1 text-blue-900 w-5" />
                    Kitchener, ON
                  </span>
                </a>
              </li>
              {/* LinkedIn */}
              <li className="mt-1 leading-normal text-gray-700 text-sm">
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
              <li className="mt-1 leading-normal text-gray-700 text-sm">
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
                  logan-anderson
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
          <div className="grid grid-cols-10 gap-10">
            {/* Grid Items Span 2 Larger */}
            <section className="print:col-span-6 col-span-10 md:col-span-6 mt-8  print:mt-1 first:mt-0">
              {/* Profile */}
              <section className="mt-8  print:mt-1 first:mt-0">
                <SectionHeader>PROFILE</SectionHeader>
                <section className="mb-0 ">
                  <ul className="text-sm text-gray-700 leading-normal">
                    <BulletListItem>
                      4+ years of experience in software development
                    </BulletListItem>
                    <BulletListItem>
                      Achieved excellence in Machine Learning with Tensorflow,
                      executing{" "}
                      <ExternalLink href="https://logan.codes/projects/machine-learning-honours">
                        {" "}
                        a year-long Honours Research Project
                      </ExternalLink>{" "}
                      showcasing exceptional analytical and problem-solving
                      skills.
                    </BulletListItem>
                    <BulletListItem>
                      Developed strong skills in TypeScript, Java, and Python
                      through working at TinaCMS, post-secondary coursework and{" "}
                      <ExternalLink href="https://logan.codes/projects">
                        personal projects
                      </ExternalLink>
                    </BulletListItem>
                  </ul>
                </section>
              </section>
              {/* End Profile */}
              {/* Experience Section */}
              <section className="col-span-3 mt-3 first:mt-0">
                <SectionHeader>EXPERIENCE</SectionHeader>
                <div>
                  <section className="mb-4 print:mb-1">
                    <header>
                      <LinkHeading href="https://tina.io">TinaCMS</LinkHeading>
                      <p className="leading-normal text-sm text-gray-700 mt-1">
                        April 2020 - Present | Full Stack Software Engineer
                      </p>
                    </header>
                    <ul>
                      <BulletListItem>
                        Lead Developer and maintainer of TinaCMS, an open source
                        headless CMS that commits content directly to Git.
                      </BulletListItem>
                      <BulletListItem>
                        Developed Tina's core Typescript{" "}
                        <ExternalLink href="https://tina.io/docs/data-fetching/overview/">
                          client{" "}
                        </ExternalLink>
                        that is generated based on a user's schema which
                        increased usage of TinaCMS by over 300% in the following
                        months
                      </BulletListItem>
                      <BulletListItem>
                        Designed and implemented an{" "}
                        <ExternalLink href="https://github.com/tinacms/tinacms/pull/3953">
                          editorial workflow
                        </ExternalLink>{" "}
                        which was crucial to the procurement of many enterprise
                        customers such as{" "}
                        <ExternalLink href="https://www.smashingmagazine.com/">
                          Smashing Magazine
                        </ExternalLink>
                      </BulletListItem>
                      <BulletListItem>
                        Implemented backend features such as data caching,
                        validation, and business logic on AWS using DynamoDB,
                        S3, and Serverless Stack (SST) on a high traffic
                        application with an uptime of over 99.99%
                      </BulletListItem>
                    </ul>
                    <p className="text-xs">
                      For a more detailed list of contributions, please{" "}
                      <ExternalLink href="https://logan.codes/experience/tinacms">
                        check the website
                      </ExternalLink>
                      .
                    </p>
                  </section>
                </div>
                {/* End Work at TinaCMS */}

                {/* Work at IWave */}
                <div>
                  <section className="mb-4 print:mb-1">
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
                      <BulletListItem>
                        Applied machine learning methods such as XGBoost and
                        leveraged AWS infrastructure to create a document
                        classification model that effectively categorized
                        millions of documents.
                      </BulletListItem>
                      <BulletListItem>
                        Used the{" "}
                        <ExternalLink href="https://scrapy.org/">
                          Python library Scrapy
                        </ExternalLink>{" "}
                        to construct a web scraping tool that systematically
                        processed tens of millions of web pages, extracting PDF
                        files.
                      </BulletListItem>
                      <BulletListItem>
                        Played an integral role in building and fixing bugs on
                        the Vue.js frontend, resulting in a seamless user
                        experience on both mobile and desktop
                      </BulletListItem>
                    </ul>
                  </section>
                </div>
                {/* End work at iWave */}
              </section>
              {/* End Experience Section */}
              {/* Volunteer Experience Section */}
              {/* <section className="col-span-3 mt-6 first:mt-0">
              <SectionHeader>
                Volunteer &amp; Professional Development
              </SectionHeader> */}
              {/* Codecademy Chapter Co-Lead */}
              {/* <section className="mb-4.5">
                <header>
                  <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                    TODO:
                    <span className="text-gray-550 font-semibold">COMPANY</span>
                  </h3>
                  <p className="leading-normal text-sm text-gray-700 mt-1">
                    Date Range
                  </p>
                </header>
                <ul>
                  <li className="mt-2.1 ml-1.5 text-sm text-gray-700 leading-normal">
                    lorem
                  </li>
                </ul>
              </section> */}
              {/* Codecademy Chapter Co-Lead */}
              {/* </section> */}
              {/* End of Volunteer Experience Section */}

              {/* Experience Section */}
              {/* <section className="col-span-3 mt-6 first:mt-0">
              <SectionHeader>
                Professional Certification &amp; Achievements
              </SectionHeader>
              <h2 className="mb-4 font-bold tracking-widest text-sm text-gray-900"></h2> */}
              {/* Work 1 */}
              {/* <section className="mb-4">
                <ul>
                  <li className="mt-2.1 ml-1.5 text-sm text-gray-700 leading-normal">
                    FOO
                  </li>
                  <li className="mt-2.1 ml-1.5 text-sm text-gray-700 leading-normal">
                    FOO
                  </li>
                  <li className="mt-2.1 ml-1.5 text-sm text-gray-700 leading-normal">
                    FOO
                  </li>
                </ul>
              </section> */}
              {/* End Work 1 */}
              {/* </section> */}
              {/* End Experience Section */}
            </section>
            {/* End Grid Items Span 2 Larger */}
            {/* Column 2 (Right Side) Smaller */}
            <section className="print:col-span-4 col-span-6 md:col-span-4">
              {/* Education Section */}
              <section className="col-span-3 mt-8 print:mt-1 first:mt-0">
                <SectionHeader>EDUCATION</SectionHeader>
                {/* Education 1 */}
                <section className="mb-4 print:mb-1">
                  <header>
                    <LinkHeading href="https://www.upei.ca">
                      University of Prince Edward Island
                    </LinkHeading>
                    {/* <p className="leading-normal text-sm text-gray-650">
                      Charlottetown, PEI
                    </p> */}
                  </header>
                  <div className="mt-2.1 text-sm text-gray-800 leading-normal">
                    <Bold>
                      Bachelor of Science, Double Major, Computer Science and
                      Mathematics (Honours)
                    </Bold>

                    <div>
                      <ul>
                        <BulletListItem>
                          Recipient of UPEI Faculty Association Silver Medal (
                          <Bold>Second highest mark</Bold> in all of UPEI for
                          third year)
                        </BulletListItem>
                        <BulletListItem>
                          Graduated with a <Bold>4.23/4.3 GPA</Bold>
                        </BulletListItem>
                        <BulletListItem>First Class Standing</BulletListItem>
                        <BulletListItem>Dean’s List (2018-2021)</BulletListItem>
                      </ul>
                    </div>

                    {/* | */}
                    {/* Dean’s List */}
                  </div>
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
              {/* Skills Section */}
              <section className="col-span-1">
                <SectionHeader>SKILLS</SectionHeader>
                <section className="mb-1.5 print:mb-0.5">
                  <header>
                    <Heading>Core Skills</Heading>
                    <ol className="grid grid-cols-2 gap-x-5 ml-4 list-disc">
                      <li>Machine Learning</li>
                      <li>Serverless Tech</li>
                      <li>React SSR</li>
                      <li>Full Stack design</li>
                      <li>Technical Writing</li>
                      <li>Public Speaking</li>
                    </ol>
                  </header>
                </section>

                {/* Programming Languages */}
                <section className="mb-1.5 print:mb-0.5">
                  <header>
                    <Heading>Programming &amp; Languages</Heading>
                  </header>
                  <div className="my-2.5 print:my-0.5 last:pb-1.5">
                    <SkillList
                      skills={[
                        {
                          label: "Typescript",
                          url: "https://www.typescriptlang.org/",
                        },
                        {
                          label: "Node.js",
                          url: "https://nodejs.org/",
                        },
                        {
                          label: "Python",
                          url: "https://www.python.org/",
                        },
                        {
                          label: "Java",
                          url: "https://www.java.com/",
                        },
                        {
                          label: "Go",
                          url: "https://golang.org/",
                        },
                        {
                          label: "HTML/CSS",
                        },
                      ]}
                    />
                  </div>
                </section>
                {/* End Programming Languages */}
                {/* Libraries & Frameworks */}
                <section className="mb-1.5 print:mb-0.5">
                  <header>
                    <Heading>Libraries &amp; Frameworks</Heading>
                  </header>
                  <div className="my-2 last:pb-1">
                    <SkillList
                      skills={[
                        { label: "React", url: "https://reactjs.org/" },
                        { label: "Next.js", url: "https://nextjs.org/" },
                        {
                          label: "Tensorflow",
                          url: "https://www.tensorflow.org/",
                        },
                        { label: "Express/Koa", url: "https://expressjs.com/" },
                        {
                          label: "AWS serverless / SST",
                          url: "https://sst.dev/",
                        },
                        {
                          label: "Vue.js",
                          url: "https://vuejs.org/",
                        },
                        {
                          label: "Tailwind CSS",
                          url: "https://tailwindcss.com/",
                        },
                        {
                          label: "Cypress",
                          url: "https://www.cypress.io/",
                        },
                        {
                          label: "Jest",
                          url: "https://jestjs.io/",
                        },
                        {
                          label: "Vite",
                          url: "https://vitejs.dev/",
                        },
                        {
                          label: "Django",
                          url: "https://www.djangoproject.com/",
                        },
                      ]}
                    />
                  </div>
                </section>
                {/* End Libraries & Frameworks */}
                {/* Tools | Platforms | Services */}
                {/* <section className="mb-1.5 print:mb-0.5"> */}
                {/* <header>
                    <Heading>Tools</Heading>
                  </header> */}
                {/* <div className="my-2.5 print:my-0.5 last:pb-1.5">
                    <SkillList
                      skills={[
                        {
                          label: "AWS",
                          url: "https://aws.amazon.com/",
                        },
                        {
                          label: "Git / Github",
                          url: "https://github.com",
                        },
                        {
                          label: "Firebase",
                          url: "https://firebase.google.com/",
                        },
                        {
                          label: "DynamoDB",
                          url: "https://aws.amazon.com/dynamodb/",
                        },
                        {
                          label: "PostgreSQL",
                          url: "https://www.postgresql.org/",
                        },
                        {
                          label: "Vercel",
                          url: "https://vercel.com/",
                        },
                        {
                          label: "Docker",
                          url: "https://www.docker.com/",
                        },
                        {
                          label: "Linux",
                          url: "https://www.linux.org/",
                        },
                      ]}
                    />
                  </div> */}
                {/* </section> */}
                {/* End Tools | Platforms | Services */}
                {/* Personal Projects */}
                <section className="mb-1.5">
                  <header>
                    <SectionHeader>PROJECTS</SectionHeader>
                  </header>
                  <section className="mb-4 my-2.5 print:mb-1 last:pb-1.5 print:last:pb-0.5">
                    <header>
                      <LinkHeading href="https://logan.codes/projects/machine-learning-honours">
                        Machine Learning Honours Project
                      </LinkHeading>
                    </header>
                    {/* <ul> */}
                    {/* <BulletListItem> */}
                    Used VPNN to reduce the number of parameters in CNN by 20%
                    for image classification gaining a foundational
                    understanding of machine learning, neural networks and{" "}
                    <ExternalLink href="https://www.tensorflow.org/">
                      Tensorflow
                    </ExternalLink>{" "}
                    {/* </BulletListItem> */}
                    {/* </ul> */}
                  </section>
                  <section className="mb-4 my-2.5 print:my-0 last:pb-1.5">
                    <header>
                      <LinkHeading href="https://logan.codes/projects/dg-rating-app">
                        Disc Golf Online Rating System
                      </LinkHeading>
                    </header>
                    {/* <ul> */}
                    {/* <BulletListItem> */}
                    Create and deployed an{" "}
                    <ExternalLink href="https://dgscore.live">
                      online rating system
                    </ExternalLink>
                    , used by to clubs, that{" "}
                    <ExternalLink href="https://en.wikipedia.org/wiki/Approximate_Bayesian_computation#:~:text=Approximate%20Bayesian%20computation%20(ABC)%20constitutes,posterior%20distributions%20of%20model%20parameters.">
                      Bayesian approximation
                    </ExternalLink>{" "}
                    to generate leader-boards for recorded disc golf rounds.
                    {/* </BulletListItem> */}
                    {/* </ul> */}
                  </section>
                  <p className="text-xs">
                    A complete list of projects can be found on{" "}
                    <ExternalLink href="https://logan.codes/projects">
                      logan.codes
                    </ExternalLink>{" "}
                  </p>
                </section>
                {/* End of Personal Projects */}
                {/* Related Skills */}
                {/* <section className="mb-1.5">
                <header>
                  <h3 className="text-lg font-semibold text-gray-700 leading-snugish">
                    Related Skills
                  </h3>
                </header>
                <div className="my-2.5 last:pb-1.5"></div>
              </section> */}
                {/* End Related Skills */}
              </section>
              {/* End Skills Section */}
              {/* Projects Section */}
              {/* <section className="mt-8 first:mt-0"> */}
              {/* <SectionHeader>TECHNICAL PROJECTS</SectionHeader> */}
              {/* Project 1 */}
              {/* <section className="mb-4.5">
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
                    T-Mobile onboarding experience for new customers and Sprint
                    customers after merger.
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
                      Users can set up online account to manage T-Mobile account
                      &amp; see of the benefits they recieve with T-Mobile
                      service.
                    </li>
                    <li className="ml-1.5">
                      <span className="-ml-1.5 select-none text-gray-600">
                        ›
                      </span>
                      Helps transition customers migrating from Sprint.
                    </li>
                  </ul>
                </div>
              </section> */}
              {/* End Project 1 */}
              {/* </section> */}
              {/* End Projects Section */}
            </section>
            {/* End Column 2 Smaller */}
          </div>
          {/* end Grid 2 1 */}
          {/* Footer Build Info */}
          <footer className="print:pb-0 pb-5">
            <section className="flex flex-row mt-16 print:mt-0"></section>
          </footer>
          {/* End Footer Build Info */}
        </div>
        {/* end Page */}
      </main>
    </>
  );
};

export default Resume;
