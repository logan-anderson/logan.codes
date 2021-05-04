import * as React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { DefaultSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";

import Navbar from "./Navbar";
import AppFooter from "./Footer";
import { DarkModeToggleButton } from "../Buttons/DarkModeToggle";

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
  description,
  navDisable,
}) => {
  // useGithubToolbarPlugins();
  const router = useRouter();
  const [theme, setTheme] = React.useState<"dark" | "light">(
    typeof localStorage === "undefined" ? "light" : localStorage?.theme
  );
  const onClick = () => {
    if (theme === "dark") {
      setTheme("light");
      localStorage.theme = "light";
    } else {
      setTheme("dark");
      localStorage.theme = "dark";
    }
  };
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
  }, [theme]);

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
          <AppFooter />
        </div>
      </StyledBody>
      <DarkModeToggleButton onClick={onClick} checked={theme === "dark"} />
    </html>
  );
};

export default Layout;
