import App from "next/app";
import { TinaCMS, TinaProvider } from "tinacms";
import { GithubClient, TinacmsGithubProvider } from "react-tinacms-github";
import Head from "next/head";
import "../styles/index.css";
import "../styles/prism.css";
export default class Site extends App {
  cms: TinaCMS;
  constructor(props: any) {
    super(props);
    /**
     * 1. Create the TinaCMS instance
     */
    this.cms = new TinaCMS({
      enabled: props.pageProps.preview,
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
      sidebar: props.pageProps.preview,
      toolbar: props.pageProps.preview,
    });
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      /**
       * 4. Wrap the page Component with the Tina and Github providers
       */
      <TinaProvider cms={this.cms}>
        <TinacmsGithubProvider
          onLogin={onLogin}
          onLogout={onLogout}
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
  }
}

const onLogin = () => {
  const token = localStorage.getItem("tinacms-github-token") || null;
  const headers = new Headers();

  if (token) {
    headers.append("Authorization", "Bearer " + token);
  }

  return fetch(`/api/preview`, { headers: headers }).then(() => {
    window.location.href = window.location.pathname;
  });
};

const onLogout = () => {
  return fetch(`/api/reset-preview`).then(() => {
    window.location.reload();
  });
};
