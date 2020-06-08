import * as React from "react";
import Head from "next/head";
import { useGithubToolbarPlugins } from "react-tinacms-github";
import styled from "styled-components";

import Navbar from "./Navbar";
import AppFooter from "./Footer";

type Props = {
  title?: string;
  preview: boolean;
};

const StyledBody = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;
const Main = styled.main`
  flex: 1;
`;

const Layout: React.FunctionComponent<Props> = ({ children, title, preview }) => {
  useGithubToolbarPlugins();

  require('../../styles/prism');
  return (
    <>
      <Head>
        <title>{`${title} | Logan's Blog`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <StyledBody className="bg-body text-body font-body container mx-auto px-3 sm:px-4">
        {/* <div className="bg-body text-body font-body container mx-auto px-4"> */}
        <header>
          <Navbar />
        </header>
        <Main>{children}</Main>
        <AppFooter preview={preview}/>
        {/* </div> */}
      </StyledBody>
    </>
  );
};

export default Layout;
