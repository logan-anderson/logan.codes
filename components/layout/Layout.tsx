import * as React from "react";
import { useRouter } from "next/router";
import { useGithubToolbarPlugins } from "react-tinacms-github";
import styled from "styled-components";
import { DefaultSeo } from "next-seo";

import Navbar from "./Navbar";
import AppFooter from "./Footer";

type Props = {
  preview: boolean;
  title?: string;
  description?: string;
};

const StyledBody = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;
const Main = styled.main`
  flex: 1;
`;

const Layout: React.FunctionComponent<Props> = ({
  children,
  title,
  preview,
  description,
}) => {
  useGithubToolbarPlugins();
  const router = useRouter();

  return (
    <>
      <DefaultSeo
        openGraph={{
          url: "https://logana.dev" + router.asPath,
        }}
        title={`${title} | Logan's Blog`}
        description={
          description ||
          "A simple blog about coding, technology, and coffee by Logan Anderson. Read about the latest in web development, machine learning and other tech topics."
        }
      />
      <StyledBody className="bg-body text-body font-body container mx-auto px-3 sm:px-4">
        {/* <div className="bg-body text-body font-body container mx-auto px-4"> */}
        <header>
          <Navbar />
        </header>
        <Main>{children}</Main>
        <AppFooter preview={preview} />
        {/* </div> */}
      </StyledBody>
    </>
  );
};

export default Layout;
