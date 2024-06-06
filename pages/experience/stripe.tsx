import { BreadCrumb } from "../../components/BreadCrumb";
import Layout from "../../components/layout/Layout";

const TinaCMSExperience = () => {
  return (
    <Layout preview={false} title="Experience at TinaCMS">
      <div className="max-w-screen-lg mx-auto">
        <BreadCrumb
          links={[
            { label: "Experience", href: "/experience" },
            { label: "Stripe" },
          ]}
        />

        <main className="prose prose-blue prose-lg text-lg max-w-prose mx-auto mb-6 dark:prose-dark">
          <h1>My Contributions to Stripe</h1>
          <p>
            I have been working full-time at stripe since January 2024. I work
            on the{" "}
            <a
              href="https://stripe.com/connect"
              target="_blank"
              rel="noreferrer"
            >
              Connect
            </a>{" "}
            product which is responsible for a majority of strips revenue
          </p>

          <li>
            Rebuild "Connect Platform Onboarding" to enhance user experience
            (UX) and improve integration with unified accounts
            <ul>
              <li>Increased the conversion rate by 30%</li>
              <li>Decreased time to complete onboarding</li>
            </ul>
          </li>
        </main>
      </div>
    </Layout>
  );
};

export default TinaCMSExperience;
