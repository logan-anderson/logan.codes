import * as React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useGithubToolbarPlugins } from "react-tinacms-github";
import styled from "styled-components";
import { DefaultSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";

import Navbar from "./Navbar";
import AppFooter from "./Footer";

type Props = {
  preview: boolean;
  title?: string;
  description?: string;
  navDisable?: boolean;
};

const StyledBody = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;
const Main = styled.main`
  flex: 1;
  margin-top: 20px;
`;

const Layout: React.FunctionComponent<Props> = ({
  children,
  title,
  preview,
  description,
  navDisable,
}) => {
  useGithubToolbarPlugins();
  const router = useRouter();
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Whenever the user explicitly chooses light mode
    // localStorage.theme = "light";

    // Whenever the user explicitly chooses dark mode
    // localStorage.theme = "dark";

    // Whenever the user explicitly chooses to respect the OS preference
    // localStorage.removeItem("theme");
  });

  return (
    <html>
      <DefaultSeo
        openGraph={{
          url: "https://logana.dev" + router.asPath,
        }}
        title={`${title} | Logan`}
        description={
          description ||
          "A simple blog about coding, technology, and coffee by Logan Anderson. Read about the latest in web development, machine learning and other tech topics."
        }
      />
      <StyledBody className="bg-white dark:bg-gray-900 ">
        <div className="bg-body text-body font-body container mx-auto px-3 sm:px-4">
          {!navDisable && (
            <header>
              <Navbar />
            </header>
          )}
          <Main>
            <Fade cascade duration={700} damping={0.1} triggerOnce>
              {children}
            </Fade>
          </Main>
          <AppFooter preview={preview} />
        </div>
      </StyledBody>
    </html>
  );
};

export default Layout;
