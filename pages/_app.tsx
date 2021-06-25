import Head from "next/head";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";

import "../styles/index.css";
import { useGoogleTagManager } from "../hooks/useGoogleTagManager";
import { EditProvider, useEditState } from "tina-graphql-gateway";

function InnerApp({ Component, pageProps }: AppProps) {
  const { edit } = useEditState();
  if (edit) {
    // lazy load Tina on the client (this never happens on the server)
    const TinaWrapper = (dynamic(
      () => import("../components/TinaWrapper")
    ) as unknown) as React.FC;
    return (
      <TinaWrapper {...pageProps}>
        {(props: any) => <Component {...props} />}
      </TinaWrapper>
    );
  }
  return <Component {...pageProps} />;
}
const App = (props: AppProps) => {
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
          href="https://logana.dev/feed.xml"
        />
      </Head>
      <EditProvider>
        <InnerApp {...props} />
      </EditProvider>
    </>
  );
};

export default App;
