import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";

import Navbar from "./Navbar";
import AppFooter from "./Footer";
import { DarkModeToggleButton } from "../Buttons/DarkModeToggle";
import { useTheme } from "./ThemeProvider";

type Props = {
  preview: boolean;
  title?: string;
  description?: string;
  navDisable?: boolean;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title,
  description,
  navDisable,
}) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const onClick = () => {
    if (theme === "dark") {
      setTheme("light");
      localStorage.theme = "light";
    } else {
      setTheme("dark");
      localStorage.theme = "dark";
    }
  };

  return (
    <>
      <DefaultSeo
        openGraph={{
          url: "https://logana.dev" + router.asPath,
          images: [
            {
              width: 754,
              alt: "Logan Anderson",
              url:
                "https://res.cloudinary.com/dvy3mawsb/image/upload/c_scale,f_auto,o_100,q_58,r_0,w_754/v1620171151/IMG_3988_iqa2nf.jpg",
            },
          ],
        }}
        title={`${title} | Logan`}
        description={
          description ||
          "A simple blog about coding, technology, and coffee by Logan Anderson. Read about the latest in web development, machine learning and other tech topics."
        }
      />
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
        }}
        className="bg-white dark:bg-gray-900 "
      >
        <div className="bg-body text-body font-body container mx-auto px-3 sm:px-4">
          {!navDisable && (
            <header>
              <Navbar />
            </header>
          )}
          <main
            style={{
              flex: 1,
              marginTop: "20px",
            }}
          >
            {children}
          </main>
          <AppFooter />
        </div>
      </div>
      <DarkModeToggleButton onClick={onClick} checked={theme === "dark"} />
    </>
  );
};

export default Layout;
