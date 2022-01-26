import Head from "next/head";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";

import "../styles/index.css";
import { useGoogleTagManager } from "../hooks/useGoogleTagManager";

import { TinaEditProvider } from "tinacms/dist/edit-state";
const TinaCMS = dynamic(() => import("tinacms"), { ssr: false });

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
          href="https://logana.dev/feed.xml"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

const NEXT_PUBLIC_TINA_CLIENT_ID = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
const NEXT_PUBLIC_USE_LOCAL_CLIENT =
  process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT || 0;
const NEXT_PUBLIC_EDIT_BRACH = process.env.NEXT_PUBLIC_EDIT_BRACH;

const App = (props: AppProps) => {
  return (
    <>
      <TinaEditProvider
        showEditButton={false}
        editMode={
          <TinaCMS
            branch={NEXT_PUBLIC_EDIT_BRACH}
            clientId={NEXT_PUBLIC_TINA_CLIENT_ID}
            isLocalClient={Boolean(Number(NEXT_PUBLIC_USE_LOCAL_CLIENT))}
            cmsCallback={(cms) => {
              cms.flags.set("tina-admin", true);
              import("react-tinacms-editor").then(({ MarkdownFieldPlugin }) => {
                cms.plugins.add(MarkdownFieldPlugin);
              });
              import("next-tinacms-cloudinary").then((pack) => {
                cms.media.store = new pack.TinaCloudCloudinaryMediaStore(
                  cms.api.tina
                );
              });
            }}
            documentCreatorCallback={{
              /**
               * After a new document is created, redirect to its location
               */
              onNewDocument: (doc) => {
                if (doc.collection.slug === "docs") {
                  return (window.location.href = `/docs/${doc.breadcrumbs.join(
                    "/"
                  )}`);
                }
                return;
              },
              /**
               * Only allows documents to be created to the `Blog Posts` Collection
               */
              filterCollections: (options) => {
                return options.filter(
                  (option) =>
                    option.label === "Blog Posts" ||
                    option.label === "Page Content"
                );
              },
            }}
            {...props.pageProps}
          >
            {(livePageProps: any) => (
              <CustomApp {...props} pageProps={livePageProps} />
            )}
          </TinaCMS>
        }
      >
        <CustomApp {...props} />
      </TinaEditProvider>
    </>
  );
};

export default App;
