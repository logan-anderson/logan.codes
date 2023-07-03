import { css } from "../utils/resumeCss";

const data = {
  email: "loganderson55@gmail.com",
  github: "https://github.com/logan-anderson",
  website: "https://logana.dev",
};
import { HISTORY } from "./experience";
const Resume = () => {
  return (
    <>
      <style jsx>{css}</style>
      <main className="bg-white text-gray-800 min-h-screen">
        <div className="py-20 lg:py-24 px-6 mx-auto max-w-7xl">
          <div className="relative">
            <h1>Logan Anderson</h1>
            <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-10 xl:gap-24 z-10">
              <h2>Full Stack Software Engineer</h2>
              <div className="lg:flex lg:justify-between grid-3 xl:grid-3 lg:col-span-3 gap-4 mt-5 pt-4 border-t-2 border-gray-300">
                <div className="flex items-center">
                  {/* Contact 1 Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  {/* Contact 1 */}
                  <div className="ml-3">
                    <p className="mb-0 font-semibold text-sm">Email</p>
                    <p className="mb-0">
                      <a
                        href={`mailto:${data.email}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {data.email}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {/* Contact 2 Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  {/* Contact 2 */}
                  <div className="ml-3">
                    <p className="mb-0 font-semibold text-sm">GitHub</p>
                    <p className="mb-0">
                      <a href={data.github} target="_blank" rel="noreferrer">
                        {data.github.replace("https://", "")}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {/* Contact 3 Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"
                    />
                  </svg>
                  {/* Contact 3 */}
                  <div className="ml-3">
                    <p className="mb-0 font-semibold text-sm">Website</p>
                    <p className="mb-0">
                      <a href={data.website} target="_blank" rel="noreferrer">
                        {data.website.replace("https://", "")}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-[-3rem] lg:top-[-3.5rem] -left-12  lg:w-[13rem] w-40 h-40 lg:h-[13rem] bg-blue-400 rounded-full" />
          </div>
          <div className="grid-3 gap-10 lg:gap-24 items-start mt-12 lg:mt-24">
            {/* Work Experience */}
            <div className="lg:col-span-2">
              <h3>Work Experience</h3>
              {HISTORY.filter((x) => x.workExperience).map((item, index) => {
                return (
                  <div className="grid-3 gap-x-6">
                    {/* Work Experience 1 */}
                    <div>
                      {/* Company 1 */}
                      <h4 className="mb-1 lg:mb-4">{item.company}</h4>
                      <p className="text-sm mb-1">
                        <a href={item.website} target="_blank" rel="noreferrer">
                          {item.website?.replace("https://", "") || "Website"}
                        </a>
                      </p>
                      <p className="text-sm">{item.date}</p>
                    </div>
                    <div className="lg:col-span-2">
                      {/* Job Title 1 */}
                      <h4 className="mb-4">{item.title}</h4>
                      {/* TODO: maybe description should be rich text */}
                      {item.description}
                      {/* <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer a imperdiet urna. Praesent eu posuere magna, in
                        suscipit quam. Here is an example of an
                        <a
                          href="https://resumewind.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          external link
                        </a>
                        .
                      </p>
                      <p>
                        Mauris ullamcorper neque in ultrices mollis. Sed justo
                        eros, mollis sed odio id, finibus gravida enim. Aenean
                        pharetra ante elit, sit amet accumsan felis suscipit
                        vitae. Vestibulum ante ipsum primis.
                      </p>
                      <ul>
                        <li>
                          Cras in erat bibendum, rhoncus nisl ac, luctus tortor
                        </li>
                        <li>Vivamus volutpat nunc non quam dapibus</li>
                        <li>Nulla molestie odio odio, ut congue dui</li>
                      </ul> */}
                      {item.moreInfoLink && (
                        <div>
                          <a href={`https://logana.dev/${item.moreInfoLink}`}>
                            Check out my website for more detail
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              {/* Profile */}
              <h3>Profile</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                semper sapien ligula, vestibulum eleifend erat pellentesque
                quis. Suspendisse potenti. Mauris et malesuada nisl, eu tempus
                nisi.
              </p>
              {/* Skills */}
              <h3 className="mt-12 lg:mt-16">Skills</h3>
              {/* Skills 1 */}
              <h4>Programming Languages</h4>
              <ul>
                <li>JavaScript</li>
                <li>TypeScript</li>
                <li>Python</li>
                <li>PHP</li>
              </ul>
              {/* Skills 2 */}
              <h4 className="mt-8">Libraries &amp; Frameworks</h4>
              <ul>
                <li>React.js</li>
                <li>Vue.js</li>
                <li>Next.js</li>
                <li>Gatsby.js</li>
              </ul>
              {/* Education */}
              <h3 className="mt-12 lg:mt-16">Education</h3>
              <h4 className="mb-1">University of Prince Edward Island</h4>
              <p className="mb-1">
                Bachelor of Science in Computer Science and Math (Honours)
              </p>
              {/* References */}
              {/* <h3 className="mt-12 lg:mt-16">References</h3> */}
              {/* Reference 1 */}
              {/* <h4 className="mb-1">Reference Name 1</h4> */}
              {/* <p>Reference Title 1</p> */}
              {/* Reference 2 */}
              {/* <h4 className="mt-8 mb-1">Reference Name 2</h4> */}
              {/* <p className="mb-1">Reference Title 2</p> */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Resume;
