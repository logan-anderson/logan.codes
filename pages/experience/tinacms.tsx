import { BreadCrumb } from "../../components/BreadCrumb";
import Layout from "../../components/layout/Layout";

const TinaCMSExperience = () => {
  return (
    <Layout preview={false} title="Experience at TinaCMS">
      <div className="max-w-screen-lg mx-auto">
        <BreadCrumb
          links={[
            { label: "Experience", href: "/experience" },
            { label: "TinaCMS" },
          ]}
        />

        <main className="prose prose-blue prose-lg text-lg max-w-prose mx-auto mb-6 dark:prose-dark">
          <h1>My Contributions to TinaCMS</h1>
          <p>
            I have been working full-time at TinaCMS since May 2020. The
            majority of my work has been on the{" "}
            <a href="https://github.com/tinacms/tinacms">
              TinaCMS open source repo
            </a>{" "}
            which is a monorepo that holds a majority of the source code of
            TinaCMS. I have over{" "}
            <a href="https://github.com/tinacms/tinacms/commits?author=logan-anderson">
              1200 commits
            </a>{" "}
            and I am one of the{" "}
            <a href="https://github.com/tinacms/tinacms/graphs/contributors">
              top contributors to the repo
            </a>
            .
          </p>
          <ul>
            <li>
              <a href="https://github.com/tinacms/tinacms/pulls?q=is%3Apr+author%3Alogan-anderson">
                All pull requests opened by me
              </a>
            </li>
            <li>
              <a href="https://github.com/tinacms/tinacms/issues?q=is%3Aissue+author%3Alogan-anderson">
                All issues opened by me
              </a>
            </li>
          </ul>
          <p>
            Below, I will outline in detail some of the major
            contributions/projects I have worked on.
          </p>
          <h2>Editorial workflow</h2>
          <p>
            The editorial workflow feature allows a user to define protected
            branches. When an editor is on a protected branch, instead of saving
            their content directly to that branch, they are able to create a new
            branch and a draft pull request will automatically be opened for
            them.
          </p>
          <p>
            You can find some of this work in{" "}
            <a href="https://github.com/tinacms/tinacms/pull/3953">
              this pull request
            </a>{" "}
            on the TinaCMS repo.
          </p>
          <p>
            This feature was a major undertaking and required changes to both
            the open source and closed source portions of TinaCMS. Here is a
            list of the technical challenges I faced:
          </p>
          <ul>
            <li>
              Working with the Github API to create branches and pull requests
            </li>
            <li>
              Adding User inputs and async validation to ensure the branch has
              not already been created
            </li>
            <li>Async Polling to wait for indexing to be completed </li>
          </ul>
          <h2>Self-Hosting TinaCMS</h2>
          <p>
            One of the major features that was added to TinaCMS was the ability
            to self host our "Data layer". Initially added in{" "}
            <a href="https://github.com/tinacms/tinacms/pull/3432">this PR</a>,
            the self hosted feature allows a user to host the data layer in a
            serverless function and store the data in mongoDB. I worked on the
            CLI aspect of this as well as integrating all of the pieces
            together. See this{" "}
            <a href="https://github.com/tinacms/tinacms/discussions/3589">
              Github discussion
            </a>{" "}
            for an in depth explanation and a video demo. You can also see the{" "}
            <a href="https://tina.io/blog/self-hosted-datalayer/">blog post</a>{" "}
            announcing this feature.
          </p>
          <p>Here is an outline of the tech used to build this feature:</p>
          <ul>
            <li>Level DB for storing data</li>
            <li>
              Many-Level for storing data in memory locally and communicating
              over a local server
            </li>
            <li>esbuild for building the users Data Layer config file.</li>
          </ul>
          <h2>CLI that Builds a SPA</h2>
          <p>
            Instead of adding TinaCMS UI directly to your site you install a CLI
            that builds a SPA that goes into your public folder. This allows
            TinaCMS to work with any framework. I worked on the CLI that builds
            this SPA. You can see the{" "}
            <a href="https://tina.io/blog/upgrading-to-iframe/">
              {" "}
              blog post announcing this features{" "}
            </a>{" "}
            as well as the{" "}
            <a href="https://github.com/tinacms/tinacms/pull/3086">
              PR that added this feature
            </a>{" "}
          </p>
          <p>
            Here is a list of the tech uses and technical challenges I faced:
          </p>

          <ul>
            <li>
              The CLI uses <a href="https://vitejs.dev/">vite</a> for the local
              dev server and the production build of the SPA.
            </li>
            <li>Uses vite plugins to transform TypeScript and React JSX</li>
            <li>
              Uses vite plugins to load svg, css, image files so that we could
              achieve a seamless user experience
            </li>
            <li>
              Automatically re-indexes the content and re-builds the page when a
              user changes their config file
            </li>
          </ul>
        </main>
      </div>
    </Layout>
  );
};

export default TinaCMSExperience;
