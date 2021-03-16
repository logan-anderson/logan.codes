import { TinaCMS, TinaProvider } from "tinacms";
import { GithubClient, TinacmsGithubProvider } from "react-tinacms-github";
import Head from "next/head";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

import * as gtag from "../utils/gtag";
import "../styles/index.css";

const App = (props: AppProps) => {
  const cms = new TinaCMS({
    apis: {
      /**
       * 2. Register the GithubClient
       */
      github: new GithubClient({
        proxy: "/api/proxy-github",
        authCallbackRoute: "/api/create-github-access-token",
        clientId: process.env.GITHUB_CLIENT_ID || "err",
        baseRepoFullName: process.env.REPO_FULL_NAME || "err", // e.g: tinacms/tinacms.org,
        baseBranch: process.env.BASE_BRANCH || "err",
      }),
    },
    /**
     * 3. Hide the Sidebar & Toolbar
     *    unless we're in Preview/Edit Mode
     */
    sidebar: {
      hidden: !props.pageProps.preview,
    },
    toolbar: {
      hidden: !props.pageProps.preview,
    },
  });
  const { Component, pageProps } = props;
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      if (process.env.NODE_ENV === "production") {
        gtag.pageview(url);
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    /**
     * 4. Wrap the page Component with the Tina and Github providers
     */
    <TinaProvider cms={cms}>
      <TinacmsGithubProvider
        editMode={pageProps.preview}
        enterEditMode={enterEditMode}
        exitEditMode={exitEditMode}
        error={pageProps.error}
      >
        <Head>
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <meta name="theme-color" content="#667eea" />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS for blog posts"
            href="https://logana.dev/feed.xml"
          />
        </Head>
        <Component {...pageProps} />
      </TinacmsGithubProvider>
    </TinaProvider>
  );
};

const enterEditMode = () => {
  const token = localStorage.getItem("tinacms-github-token") || null;

  const headers = new Headers();

  if (token) {
    headers.append("Authorization", "Bearer " + token);
  }

  return fetch(`/api/preview`, { headers: headers }).then(() => {
    window.location.href = window.location.pathname;
  });
};

const exitEditMode = () => {
  return fetch(`/api/reset-preview`).then(() => {
    window.location.reload();
  });
};

export default App;
