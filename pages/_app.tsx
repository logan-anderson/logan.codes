import Head from "next/head";
import type { AppProps } from "next/app";

import "../styles/index.css";
import { useGoogleTagManager } from "../hooks/useGoogleTagManager";

const CustomApp = ({ Component, pageProps }: AppProps) => {
  useGoogleTagManager();
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
      {/* @ts-ignore */}
      <Component {...pageProps} />
    </>
  );
};

const App = (props: AppProps) => {
  return <CustomApp {...props} />;
};

export default App;
