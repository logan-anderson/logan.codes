import React from "react";
import Layout from "../components/layout/Layout";

const AboutPage: React.FC = () => {
  return (
    <Layout title="About" preview={false}>
      <div className="relative">
        <div className="lg:absolute lg:inset-0">
          <div className="lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2">
            <img
              className="h-56 w-full object-cover lg:absolute lg:h-full"
              src="/logan_katie.jpg"
              alt=""
              style={{
                objectPosition: "50% 20%",
              }}
            />
          </div>
        </div>
        <div className="relative pt-12 pb-16 px-4 sm:pt-16 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2">
          <div className="lg:col-start-2 lg:pl-8">
            <div className="text-base max-w-prose mx-auto lg:max-w-lg lg:ml-auto lg:mr-0">
              <h2 className="leading-6 text-blue-600 font-semibold tracking-wide uppercase">
                About me
              </h2>
              {/* <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Programming Languages and technologies
              </h3> */}
              {/* <p className="mt-8 text-lg text-gray-500">
                Sagittis scelerisque nulla cursus in enim consectetur quam.
                Dictum urna sed consectetur neque tristique pellentesque.
                Blandit amet, sed aenean erat arcu morbi.
              </p> */}
              <div className="mt-5 prose prose-blue dark:prose-dark text-gray-500">
                <h3>Programming Languages and Technologies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul>
                    <li>Java</li>
                    <li>Javascript</li>
                    <li>Nodejs</li>
                    <li>Express</li>
                    <li>Python</li>
                    <li>django</li>
                  </ul>
                  <ul>
                    <li>c / c++</li>
                    <li>Shell Scripting</li>
                    <li>AWS</li>
                    <li>git (github and gitlab)</li>
                    <li>DynamoDB</li>
                    <li>SQL</li>
                  </ul>
                </div>
                <h3 className="py-2">Courses Completed</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul>
                    <li>Data Structure and Algorithms</li>
                    <li>Web Development</li>
                    <li>Android Development</li>
                  </ul>
                  <ul>
                    <li>
                      <a href="https://www.udemy.com/course/the-web-developer-bootcamp/">
                        The Web Developer Bootcamp
                      </a>
                    </li>
                    <li>
                      <a href="https://www.udemy.com/course/python-django-dev-to-deployment">
                        Python django Dev to Deployment
                      </a>
                    </li>
                    <li>
                      <a href="https://www.udemy.com/course/aws-machine-learning-a-complete-guide-with-python">
                        AWS Machine Learning a Complete Guide with python
                      </a>
                    </li>
                  </ul>
                </div>
                <h3>I Like to code! Here are some of github stats</h3>
                <div>
                  <img
                    src="https://github-readme-stats.vercel.app/api?username=logan-anderson&count_private=true&show_icons=true&hide=stars"
                    alt="Github stats"
                    className="w-full"
                  />
                </div>
                <div>
                  <img
                    src="https://github-readme-stats.vercel.app/api/top-langs/?username=logan-anderson&layout=compact"
                    alt="Github language stats"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
