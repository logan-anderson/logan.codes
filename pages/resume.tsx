import {
  Bold,
  BulletListItem,
  ExternalLink,
  Heading,
  LinkHeading,
  SectionHeader,
  SkillList,
} from "~/data/components";
import { SEO } from "../components/layout/Layout";
import { RESUME_INFO } from "~/data/resume";

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
              {RESUME_INFO.name}
            </h1>
            <h2 className="print:text-2xl text-blue-700 font-sans self-center md:text-3xl text-2xl font-hairline pb-px">
              {RESUME_INFO.title}
            </h2>
          </header>
          <section className="mb-3 print:mb-1 first:mt-0">
            {/* Contact Items */}
            <ul className="print:flex-row flex flex-wrap flex-col sm:flex-row justify-between gap-1 list-inside pr-7">
              {RESUME_INFO.contact.map((contact) => (
                <li className="mt-1 leading-normal text-gray-700 text-sm">
                  <a
                    href={contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-900 hover:underline group"
                  >
                    {contact.icon}
                    {contact.label}
                    {contact.isExternal && (
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
                    )}
                  </a>
                </li>
              ))}
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
                <section className="mb-0 text-sm">
                  <p className="text-base">{RESUME_INFO.profile.summary}</p>
                  <ul className="text-sm text-gray-700 leading-normal">
                    {RESUME_INFO.profile.bullets.map((bullet) => (
                      <BulletListItem key={bullet.label}>
                        {bullet.label && <Bold>{bullet.label} </Bold>}
                        {bullet.content}
                      </BulletListItem>
                    ))}
                  </ul>
                </section>
              </section>
              {/* End Profile */}
              {/* Experience Section */}
              <section className="col-span-3 mt-3 first:mt-0">
                <SectionHeader>EXPERIENCE</SectionHeader>
                {RESUME_INFO.experience
                  .filter((experience) => !experience.hideFromResume)
                  .map((experience) => (
                    <div key={experience.company}>
                      <section className="mb-4 print:mb-1">
                        <header>
                          <LinkHeading href={experience.url}>
                            {experience.company}
                          </LinkHeading>
                          <p className="leading-normal text-sm text-gray-700 mt-1">
                            {experience.dates} | {experience.title}
                          </p>
                        </header>
                        <ul>
                          {experience.bullets.map((bullet) => (
                            <BulletListItem key={bullet.label}>
                              {bullet.label && <Bold>{bullet.label} </Bold>}
                              {bullet.content}
                            </BulletListItem>
                          ))}
                        </ul>
                      </section>
                    </div>
                  ))}
              </section>
              {/* End Experience Section */}
            </section>
            {/* End Grid Items Span 2 Larger */}
            {/* Column 2 (Right Side) Smaller */}
            <section className="print:col-span-4 col-span-6 md:col-span-4">
              {/* Education Section */}
              <section className="col-span-3 mt-8 print:mt-1 first:mt-0">
                <SectionHeader>EDUCATION</SectionHeader>
                {/* Education 1 */}
                {RESUME_INFO.education
                  .filter((education) => !education.hideFromResume)
                  .map((education) => (
                    <section className="mb-4 print:mb-1">
                      <header>
                        <LinkHeading href={education.url}>
                          {education.title}
                        </LinkHeading>
                      </header>
                      <div className="mt-2.1 text-sm text-gray-800 leading-normal">
                        <Bold>{education.degree}</Bold>
                        <div>
                          <ul>
                            {education.bullets.map((bullet) => (
                              <BulletListItem key={bullet.label}>
                                {bullet.label && <Bold>{bullet.label} </Bold>}
                                {bullet.content}
                              </BulletListItem>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>
                  ))}
              </section>
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
                      <li>Full Stack Design</li>
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
