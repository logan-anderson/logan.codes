import * as React from "react";
import Link from "next/link";
import Head from "next/head";

import Navbar from "./Navbar";

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "This is the default title",
}) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="bg-body text-body font-body container mx-auto px-4">
      <header>
        <Navbar />
      </header>
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  </div>
);

export default Layout;
