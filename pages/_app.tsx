import Head from "next/head";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

import "../styles/index.css";

if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
  // checks that we are client-side
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.debug(); // debug mode in development
    },
  });
}

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="theme-color" content="#667eea" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS for blog posts"
          href="https://logan.codes/feed.xml"
        />
      </Head>
      <PostHogProvider client={posthog}>
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </PostHogProvider>
    </>
  );
};

const App = (props: AppProps) => {
  return <CustomApp {...props} />;
};

export default App;
