import * as React from "react";
import Head from "next/head";

import Navbar from "./Navbar";
import AppFooter from './Footer';

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title,
}) => (
  <div>
    <Head>
      <title>{`${title} | Logan's Blog`}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="bg-body text-body font-body container mx-auto px-4">
      <header>
        <Navbar />
      </header>
      {children}
      <AppFooter/>
    </div>
  </div>
);

export default Layout;
