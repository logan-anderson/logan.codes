import { useEffect, useState, FC } from "react";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import dynamic from "next/dynamic";
const Fade = dynamic(() => import("../Fade"));

// const { Fade } = dynamic(() => import("react-awesome-reveal"));
import Navbar from "./Navbar";
import AppFooter from "./Footer";
import { DarkModeToggleButton } from "../Buttons/DarkModeToggle";

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
  // useGithubToolbarPlugins();
  const router = useRouter();
  const [theme, setTheme] = useState<"dark" | "light">(
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
      <body
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
            {/* <Fade cascade duration={700} damping={0.1} triggerOnce> */}
            <Inner>{children}</Inner>
            {/* </Fade> */}
          </main>
          <AppFooter />
        </div>
      </body>
      <DarkModeToggleButton onClick={onClick} checked={theme === "dark"} />
    </html>
  );
};

const Inner: FC = ({ children }) => {
  const [firstLoad, setFirstLoad] = useState(true);

  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setFirstLoad(false);
    });
  }, []);

  if (firstLoad) {
    return <>{children}</>;
  }
  return <Fade>{children}</Fade>;
};

export default Layout;
